import { FailReturn, failure, success } from '../../helpers/Result';
import { SuccessReturn } from '../../helpers/Result';
import { Collection, Sort } from 'mongodb';
import {
    IFuseSort,
    ExtendedResource,
    TranslatedVersion,
    UpdatedResource,
} from './Resource';
import { IPaginatedResource } from './PaginatedResource';
import Fuse from 'fuse.js';
import { SearchBarFilters } from './Resource';
import { exportData } from '../../db/util/fromDBtoCSV';
import { Resource } from '../../db/util/types/Resource';
import { exec } from '../../db/util/brokenLinksFinder';

export interface GroupedFilterCount {
    [key: string]: number;
}

export interface AllFiltersCount {
    resourceTypes: GroupedFilterCount;
    ageGroups: GroupedFilterCount;
    languages: GroupedFilterCount;
    categories: GroupedFilterCount;
    subcategories: GroupedFilterCount;
    audiences: GroupedFilterCount;
    cultures: GroupedFilterCount;
}

interface query {
    [key: string]:
        | { $all: string[] }
        | { $in: RegExp[] }
        | { $in: string[] }
        | boolean;
}

export interface CategoryFilter {
    category: string;
    subcategories: string[];
}
export interface LanguageFilter {
    language: string;
    languageDisplay: string;
}

export interface IResourceRepository {
    getResourcesByProperties(
        tags: string[],
        page: number,
        sortingCriteria: Sort,
        pageLimit?: number,
        filters?: SearchBarFilters
    ): Promise<SuccessReturn<IPaginatedResource> | FailReturn>;
    getFilterValues(
        filter: string
    ): Promise<
        | SuccessReturn<string[]>
        | SuccessReturn<CategoryFilter[]>
        | SuccessReturn<LanguageFilter[]>
        | FailReturn
    >;
    getAllResourcesTags(): Promise<SuccessReturn<string[]> | FailReturn>;
    getGGTResources(): Promise<SuccessReturn<Resource[]> | FailReturn>;
    getUpdatedFilters(
        tags: string[],
        filtersAll: SearchBarFilters,
        fuzzySearch: boolean
    ): Promise<SuccessReturn<AllFiltersCount> | FailReturn>;
    getResourcesByFuzzy(
        tags: string[],
        page: number,
        limit: number,
        filters?: SearchBarFilters,
        sortingCriteria?: IFuseSort,
        fetchHidden?: boolean,
        state?: string
    ): Promise<SuccessReturn<IPaginatedResource> | FailReturn>;
    exportResources(): Promise<SuccessReturn<void> | FailReturn>;
    getExistingResources(): Promise<SuccessReturn<Resource[]> | FailReturn>;
    applyUpdateRequest(
        updatedResources: UpdatedResource[]
    ): Promise<SuccessReturn<string[]> | FailReturn>;
    updateResourceUserScore(
        resourceId: number,
        caseNumber: number
    ): Promise<SuccessReturn<void> | FailReturn>;
    findBrokenLinks(): Promise<SuccessReturn<void> | FailReturn>;
}

/**
 * This function inserts tags and filters into query object
 * @param tags - List of tags that were entered in search bar or URL
 * @param filters - Object of filters that were applied through filter menu or URL
 * @returns query
 */
function assembleQuery(
    tags: string[],
    filters?: SearchBarFilters,
    hiddenOnly?: boolean,
    state?: string
): query {
    const query: query = {
        hidden: hiddenOnly ? hiddenOnly : false,
    };

    if (state) query['state'] = { $in: [state, 'national'] };

    if (!filters) return query;

    if (tags.length > 0) {
        tags = tags.map((tag) => tag.toLowerCase());
        query['tags'] = { $all: tags };
    }

    if (filters?.resourceTypes.length > 0) {
        const reg: RegExp[] = filters.resourceTypes.map(
            (opt) => new RegExp(opt, 'i')
        );
        query['resourceType'] = { $in: reg };
    }
    if (filters?.ageGroups.length > 0) {
        const reg: RegExp[] = filters.ageGroups.map(
            (opt) => new RegExp(opt, 'i')
        );
        query['ageGroup'] = { $in: reg };
    }
    if (filters?.languages.length > 0) {
        const reg: RegExp[] = filters.languages.map(
            (opt) => new RegExp(opt, 'i')
        );
        query['language'] = { $in: reg };
    } else {
        query['original'] = true;
    }
    if (filters?.categories.length > 0) {
        const reg: RegExp[] = filters.categories.map(
            (opt) => new RegExp(opt, 'i')
        );
        query['category'] = { $in: reg };
    }
    if (filters?.subcategories.length > 0) {
        const reg: RegExp[] = filters.subcategories.map(
            (opt) => new RegExp(opt, 'i')
        );
        query['subcategory'] = { $in: reg };
    }
    if (filters?.audiences.length > 0) {
        const reg: RegExp[] = filters.audiences.map(
            (opt) => new RegExp(opt, 'i')
        );
        query['audience'] = { $in: reg };
    }
    if (filters?.cultures.length > 0) {
        const reg: RegExp[] = filters.cultures.map(
            (opt) => new RegExp(opt, 'i')
        );
        query['culture'] = { $in: reg };
    }

    return query;
}

export default (resourceCollection: Collection): IResourceRepository => {
    /**
     * Runs Fuse JS to search over database results to return items
     * @param query The mongoDB query
     * @param tags list of tags to search
     * @param sortingCriteria sorting criteria used to sort resources
     * @returns Paginated resources with Fuse JS sorting applied
     */
    const fuseSearch = async (
        query: query,
        tags?: string[],
        sortingCriteria?: IFuseSort
    ) => {
        const allResources = await resourceCollection
            .find(query, { projection: { _id: 0 } })
            .sort({ ...sortingCriteria, userScore: -1 } as Sort)
            .toArray();

        // If there are no tags, we return the all resources matching the query do not perform fuzzy searches
        if (!tags || tags.filter((tag) => tag !== '').length === 0) {
            return allResources;
        }

        // If the tag is just a number, we return the associated resourceId
        if (tags && tags.length === 1 && !isNaN(Number(tags[0]))) {
            const result = [
                await resourceCollection.findOne(
                    { resourceId: Number(tags[0]) },
                    { projection: { _id: 0 } }
                ),
            ];
            if (result && result[0]) return result;
        }

        const options = {
            keys: [
                { name: 'tags', weight: 10 },
                'title',
                'language',
                'description',
            ],
            includeScore: true,
            threshold: 0.3,
        };

        const fuse = new Fuse(allResources, options);

        const results = sortingCriteria
            ? tags
                  .flatMap((tag) => fuse.search(tag))
                  .map((fuseResult) => fuseResult.item)
                  .filter(
                      (obj, index, array) =>
                          index ===
                          array.findIndex(
                              (o) => o.resourceId === obj.resourceId
                          )
                  )
            : tags
                  .flatMap((tag) => fuse.search(tag))
                  .map((fuseResult) => fuseResult.item)
                  .filter(
                      (obj, index, array) =>
                          index ===
                          array.findIndex(
                              (o) => o.resourceId === obj.resourceId
                          )
                  );

        return results;
    };

    /**
     * This function capitalizes the first letter of every word in a string
     * @param text The string to capitalize
     * @returns a capitalized string
     */
    const capitalizeString = (text: string) => {
        return text
            .trim()
            .split(' ')
            .map((w: string) => w[0].toUpperCase() + w.substring(1))
            .join(' ');
    };

    return {
        getResourcesByProperties: async (
            tags: string[],
            page: number,
            sortingCriteria: Sort,
            pageLimit?: number,
            filters?: SearchBarFilters
        ) => {
            const numberOfResourcesDisplayed = pageLimit ? pageLimit : 12;
            const skipped = (page - 1) * numberOfResourcesDisplayed;
            const first = skipped + 1;

            const query = assembleQuery(tags, filters);

            const count = await resourceCollection.countDocuments(query);
            const queryMatch = count > 0;

            const resources = await resourceCollection
                .find(queryMatch ? query : {}, { projection: { _id: 0 } })
                .sort(sortingCriteria)
                .skip(skipped)
                .limit(numberOfResourcesDisplayed)
                .toArray();

            const totalCount = queryMatch
                ? count
                : await resourceCollection.countDocuments({});

            for (const resource of resources) {
                resource.translatedVersions =
                    resource.translatedId === 0
                        ? []
                        : ((await resourceCollection
                              .find(
                                  { translatedId: resource.translatedId },
                                  {
                                      projection: {
                                          resourceLink: 1,
                                          resourceDescription: 1,
                                          language: 1,
                                          _id: 0,
                                      },
                                  }
                              )
                              .toArray()) as unknown[] as TranslatedVersion[]);
            }

            const resp: IPaginatedResource = {
                resources: resources as unknown as ExtendedResource[],
                totalCount: totalCount,
                first: first,
                limit: numberOfResourcesDisplayed,
                queryMatch: queryMatch,
            };

            if (!resources) return failure('Cannot find resource');
            return success(resp);
        },
        getFilterValues: async (filter: string) => {
            const filterValues = (
                await resourceCollection.distinct(filter, { hidden: false })
            ).sort();

            if (!filterValues)
                return failure('Cannot find unique values for field ' + filter);

            const uniqueFilterValues = [...new Set(filterValues)].filter(
                (n) => n
            );

            switch (filter) {
                case 'category': {
                    const categories: CategoryFilter[] = [];
                    for (const category of uniqueFilterValues) {
                        const subcategories = await resourceCollection.distinct(
                            'subcategory',
                            { category: category, subcategory: { $ne: '' } }
                        );
                        const categoryCapitalized = capitalizeString(category);
                        const subcategoriesCapitalized = subcategories.map(
                            (subcategory) => {
                                return capitalizeString(subcategory);
                            }
                        );
                        categories.push({
                            category: categoryCapitalized,
                            subcategories: subcategoriesCapitalized,
                        });
                    }
                    return success(categories);
                }
                case 'language': {
                    const languages: LanguageFilter[] = [];
                    for (const language of uniqueFilterValues) {
                        const languageDisplay = (
                            await resourceCollection.distinct(
                                'languageDisplay',
                                {
                                    language: language,
                                    languageDisplay: { $ne: '' },
                                }
                            )
                        )[0];
                        const languageCapitalized = capitalizeString(language);
                        languages.push({
                            language: languageCapitalized,
                            languageDisplay: languageDisplay,
                        });
                    }
                    return success(languages);
                }
                default: {
                    const capitalizedFilterValues = uniqueFilterValues.map(
                        (filterValue) => {
                            return capitalizeString(filterValue);
                        }
                    );
                    return success(capitalizedFilterValues);
                }
            }
        },
        getAllResourcesTags: async () => {
            const tags = await resourceCollection
                .find({}, { projection: { tags: 1, _id: 0 } })
                .toArray();

            if (!tags) return failure('Cannot find tags');

            const multipleTags: string[] = []
                .concat(...tags.map((obj) => obj['tags']).filter((e) => e))
                .map((tag) => {
                    return capitalizeString(tag);
                });

            const uniqueTags = [...new Set(multipleTags)];
            return success(uniqueTags.sort());
        },
        getGGTResources: async () => {
            const ggtResources = (
                await resourceCollection
                    .find(
                        { hidden: false, publisher: 'Grow&Go Toolbox' },
                        { projection: { _id: 0 } }
                    )
                    .toArray()
            ).reverse() as unknown[] as Resource[];

            if (!ggtResources) return failure('Cannot find GGT resources');
            return success(ggtResources);
        },
        getUpdatedFilters: async (
            tags: string[],
            filtersAll: SearchBarFilters,
            fuzzySearch: boolean
        ) => {
            const resp: AllFiltersCount = {
                resourceTypes: {},
                ageGroups: {},
                languages: {},
                categories: {},
                subcategories: {},
                audiences: {},
                cultures: {},
            };

            for (const [k, v] of Object.entries(filtersAll)) {
                for (const filter of v) {
                    const adaptedFilter: SearchBarFilters = {
                        resourceTypes: [],
                        ageGroups: [],
                        languages: [],
                        categories: [],
                        subcategories: [],
                        audiences: [],
                        cultures: [],
                    };

                    adaptedFilter[k as keyof SearchBarFilters].push(filter);

                    const queryCopy = assembleQuery(
                        fuzzySearch ? [] : tags,
                        adaptedFilter
                    );

                    const results = fuzzySearch
                        ? await fuseSearch(queryCopy, tags)
                        : [];
                    const count = fuzzySearch
                        ? results.length
                        : await resourceCollection.countDocuments(queryCopy);

                    resp[k as keyof AllFiltersCount][filter] = count;
                }
            }

            return success(resp);
        },
        getResourcesByFuzzy: async (
            terms: string[],
            page: number,
            limit: number,
            filters?: SearchBarFilters,
            sortingCriteria?: IFuseSort,
            fetchHidden?: boolean,
            state?: string
        ) => {
            const suggestedResourcesLimit = 6;
            const query = assembleQuery([], filters, fetchHidden, state);
            const results = await fuseSearch(query, terms, sortingCriteria);
            const queryMatch = results.length > 0;

            const numberOfResourcesDisplayed = queryMatch
                ? limit
                : suggestedResourcesLimit;

            const first = (page - 1) * numberOfResourcesDisplayed;
            const end =
                results.length < first + numberOfResourcesDisplayed
                    ? results.length
                    : first + numberOfResourcesDisplayed;

            const resources = queryMatch
                ? results
                      .map((result) => result as unknown as ExtendedResource)
                      .slice(first, end)
                : ((await resourceCollection
                      .find(
                          { original: true, hidden: false },
                          { projection: { _id: 0 } }
                      )
                      .sort({ ...sortingCriteria, userScore: -1 } as Sort)
                      .skip(first)
                      .limit(numberOfResourcesDisplayed)
                      .toArray()) as unknown[] as ExtendedResource[]);

            for (const resource of resources) {
                resource.translatedVersions =
                    resource.translatedId === 0
                        ? []
                        : ((await resourceCollection
                              .find(
                                  { translatedId: resource.translatedId },
                                  {
                                      projection: {
                                          resourceLink: 1,
                                          resourceDescription: 1,
                                          language: 1,
                                          _id: 0,
                                      },
                                  }
                              )
                              .toArray()) as unknown[] as TranslatedVersion[]);
            }

            const totalSuggestedResources =
                await resourceCollection.countDocuments({
                    original: true,
                    hidden: false,
                });

            const resp: IPaginatedResource = {
                resources: resources,
                totalCount: queryMatch
                    ? results.length
                    : totalSuggestedResources,
                first: first,
                limit: numberOfResourcesDisplayed,
                queryMatch: queryMatch,
            };

            return success(resp);
        },
        exportResources: async () => {
            try {
                await exportData('resources');
            } catch (error) {
                return failure(error.message);
            }
            return success();
        },
        getExistingResources: async () => {
            try {
                const allResources = (await resourceCollection
                    .find(
                        {},
                        {
                            projection: {
                                _id: 0,
                            },
                        }
                    )
                    .toArray()) as unknown as Resource[];
                return success(allResources);
            } catch (error) {
                return failure(error.message);
            }
        },
        applyUpdateRequest: async (updatedResources: UpdatedResource[]) => {
            const addCases = ['a', 'b', 'c'];
            const deleteCases = ['d', 'e'];
            const summary: string[] = [];

            const removeCase = (updatedResource: UpdatedResource) =>
                delete updatedResource.case;

            try {
                await exportData('resources', true);
                for (const resource of updatedResources) {
                    try {
                        if (addCases.includes(resource.case.caseId)) {
                            removeCase(resource);
                            await resourceCollection.insertOne(resource);
                            summary.push(
                                `Resource ${resource.resourceId} was successfully added.`
                            );
                            continue;
                        }
                        if (deleteCases.includes(resource.case.caseId)) {
                            removeCase(resource);
                            await resourceCollection.deleteOne(resource);
                            summary.push(
                                `Resource ${resource.resourceId} was successfully deleted.`
                            );
                            continue;
                        }
                    } catch (error) {
                        summary.push(
                            `Something went wrong while processing resource ${resource.resourceId}: ${error.message}`
                        );
                    }
                }
                return success(summary);
            } catch (error) {
                return failure(error.message);
            }
        },
        updateResourceUserScore: async (
            resourceId: number,
            caseNum: number
        ) => {
            /**
             * Case 0: From neutral to like: +1 userScore & +1 likesCount
             * Case 1: From neutral to dislike: -1 userScore & +1 dislikesCount
             * Case 2: From like to neutral: -1 userScore & -1 likesCount
             * Case 3: From like to dislike: -2 userScore, -1 likesCount & +1 dislikesCount
             * Case 4: From dislike to neutral: +1 userScore, -1 dislikesCount
             * Case 5: From dislike to like: +2 userScore, -1 dislikesCount & +1 likesCount
             */

            const isValidCase = (num: number) => num >= 0 && num <= 5;

            try {
                const incrementValues = [
                    // Case 0
                    { userScore: 1, likesCount: 1, dislikesCount: 0 },
                    // Case 1
                    { userScore: -1, likesCount: 0, dislikesCount: 1 },
                    // Case 2
                    { userScore: -1, likesCount: -1, dislikesCount: 0 },
                    // Case 3
                    { userScore: -2, likesCount: -1, dislikesCount: 1 },
                    // Case 4
                    { userScore: 1, likesCount: 0, dislikesCount: -1 },
                    // Case 5
                    { userScore: 2, likesCount: 1, dislikesCount: -1 },
                ];

                if (isValidCase(caseNum)) {
                    resourceCollection.updateOne(
                        { resourceId: resourceId },
                        {
                            $inc: {
                                userScore: incrementValues[caseNum].userScore,
                                likesCount: incrementValues[caseNum].likesCount,
                                dislikesCount:
                                    incrementValues[caseNum].dislikesCount,
                            },
                        }
                    );
                } else {
                    throw new Error('Invalid score option.');
                }

                return success();
            } catch (error) {
                return failure(error.message);
            }
        },
        findBrokenLinks: async () => {
            exec(true, 'resources');
            return success();
        },
    };
};
