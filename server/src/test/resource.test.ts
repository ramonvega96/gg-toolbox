import { Db, Collection, Sort } from 'mongodb';
import { client, testUserGG } from '../../test/setupFile';
import { getCSVContents } from '../db/generateCSVContent';
import { Resource } from '../db/util/types/Resource';
import { IPaginatedResource } from '../modules/Resource/PaginatedResource';
import {
    ExtendedResource,
    IFuseSort,
    TranslatedVersion,
} from '../modules/Resource/Resource';
import ResourceRepository, {
    IResourceRepository,
    CategoryFilter,
    LanguageFilter,
} from '../modules/Resource/ResourceRepository';
import ResourceService, {
    IResourceService,
} from '../modules/Resource/ResourceService';
import ResourceController, {
    IResourceController,
} from '../modules/Resource/ResourceController';
import { SearchBarFilters } from '../modules/Resource/Resource';
import config from '../../config.json';
import express from 'express';
import UserRepository, {
    IUserRepository,
} from '../modules/User/UserRepository';
import UserService, { IUserService } from '../modules/User/UserService';
import UserController, {
    IUserController,
} from '../modules/User/UserController';
import { exportData } from '../db/util/fromDBtoCSV';
import { rawResourceKeys } from '../db/util/types/RawResource';
import * as fs from 'fs';

const getResourcesByPropertiesMock = (
    resources: Resource[],
    tags: string[],
    filters: SearchBarFilters
): ExtendedResource[] => {
    const resp = resources.filter((resource) => {
        if (arraysIntersect(resource.tags, tags, true)) {
            return (
                arraysIntersect(
                    [resource.resourceType],
                    filters.resourceTypes,
                    false
                ) &&
                arraysIntersect(
                    [resource.ageGroup],
                    filters.ageGroups,
                    false
                ) &&
                (filters.languages.length > 0
                    ? arraysIntersect(
                          [resource.language],
                          filters.languages,
                          false
                      )
                    : resource.original) &&
                arraysIntersect(
                    [resource.category],
                    filters.categories,
                    false
                ) &&
                arraysIntersect(
                    [resource.subcategory],
                    filters.subcategories,
                    false
                ) &&
                arraysIntersect(
                    [resource.audience],
                    filters.audiences,
                    false
                ) &&
                !resource.hidden
            );
        }
        return false;
    }) as ExtendedResource[];

    const mockResponse = (
        resp.length > 0 ? resp : resources
    ) as ExtendedResource[];

    for (const resource of mockResponse) {
        const translatedVersions = resources
            .filter((res) => {
                return (
                    resource.translatedId !== 0 &&
                    resource.translatedId === res.translatedId
                );
            })
            .map((res) => {
                return {
                    resourceLink: res.resourceLink,
                    resourceDescription: res.resourceDescription,
                    language: res.language,
                } as TranslatedVersion;
            });

        resource.translatedVersions = translatedVersions;
    }

    return mockResponse;
};

const arraysIntersect = (
    array1: string[],
    array2: string[],
    allElements: boolean
) => {
    if (allElements)
        return (
            array1.filter((value) => array2.includes(value)).length ==
            array2.length
        );

    if (array2.length === 0) return true;

    return array1.filter((value) => array2.includes(value)).length > 0;
};

const sameObjectsInArrays = (
    resp: ExtendedResource[],
    actual: ExtendedResource[]
) => {
    for (const resource of resp) {
        const simil = actual.filter(
            (r1) => r1.resourceId === resource.resourceId
        );
        if (simil.length !== 1) {
            return false;
        }
        if (JSON.stringify(simil[0]) !== JSON.stringify(resource)) {
            return false;
        }
    }
    return true;
};

const capitalizeString = (text: string) => {
    return text
        .trim()
        .split(' ')
        .map((w: string) => w[0].toUpperCase() + w.substring(1))
        .join(' ');
};

const getFilterValuesMock = (
    resources: Resource[],
    filter: string
): string[] | CategoryFilter[] | LanguageFilter[] => {
    const rawFilters: string[] = resources.map((resource) =>
        resource.hidden ? '' : (resource[filter as keyof Resource] as string)
    );
    const uniqueFilterValues = [...new Set(rawFilters)].filter((n) => n);

    switch (filter) {
        case 'category': {
            const categories: CategoryFilter[] = [];
            for (const category of uniqueFilterValues) {
                const subcategories: string[] = [];
                for (const resource of resources) {
                    if (resource.category === category && resource.subcategory)
                        subcategories.push(resource.subcategory);
                }
                const categoryCapitalized = capitalizeString(category);
                const subcategoriesCapitalized = [
                    ...new Set(subcategories),
                ].map((subcategory) => {
                    return capitalizeString(subcategory);
                });
                categories.push({
                    category: categoryCapitalized,
                    subcategories: subcategoriesCapitalized,
                });
            }
            return categories;
        }

        case 'language': {
            const languages: LanguageFilter[] = [];
            for (const language of uniqueFilterValues) {
                for (const resource of resources) {
                    if (
                        resource.language === language &&
                        resource.languageDisplay
                    ) {
                        const languageDisplay = resource.languageDisplay;
                        const languageCapitalized = capitalizeString(language);
                        languages.push({
                            language: languageCapitalized,
                            languageDisplay: languageDisplay,
                        });
                        break;
                    }
                }
            }
            return languages;
        }

        default: {
            const capitalizedFilterValues = uniqueFilterValues.map(
                (filterValue) => {
                    return capitalizeString(filterValue);
                }
            );
            return capitalizedFilterValues;
        }
    }
};

const getAllResourcesTagsMock = (resources: Resource[]): string[] => {
    const uniqueTags = [
        ...new Set(resources.flatMap((resource) => resource.tags)),
    ]
        .filter((tag) => tag)
        .map((tag) => capitalizeString(tag));
    return uniqueTags;
};

const arraysAreTheSame = (arr1: string[], arr2: string[]): boolean => {
    let sameElements = true;
    if (arr1.length !== arr2.length) return false;
    for (const element of arr1) {
        if (!arr2.includes(element)) {
            sameElements = false;
            break;
        }
    }
    return sameElements;
};

const hasUniqueResourceIds = (resources: Resource[]) => {
    const uniqueResourceIds = new Set();
    for (const obj of resources) {
        if (uniqueResourceIds.has(obj.resourceId)) {
            return false;
        }
        uniqueResourceIds.add(obj.resourceId);
    }
    return true;
};

const reqBody: {
    tags: string[];
    page: number;
    sortingCriteria: Sort;
    pageLimit: number;
    filters: SearchBarFilters;
} = {
    tags: [],
    page: 1,
    sortingCriteria: {},
    pageLimit: 12,
    filters: {
        resourceTypes: [],
        ageGroups: [],
        languages: [],
        categories: [],
        subcategories: [],
        audiences: [],
        cultures: [],
    },
};

const fuzzyReqBody: {
    terms: string[];
    page: number;
    limit: number;
    filters: SearchBarFilters;
    sortingCriteria?: IFuseSort;
} = {
    terms: [],
    page: 1,
    limit: 12,
    filters: {
        resourceTypes: [],
        ageGroups: [],
        languages: [],
        categories: [],
        subcategories: [],
        audiences: [],
        cultures: [],
    },
};

const exportResourcesMock = async (
    resourceCollection: Collection
): Promise<string> => {
    const docs = await resourceCollection
        .find(
            {},
            {
                projection: {
                    _id: 0,
                },
            }
        )
        .toArray();

    if (docs.length === 0) return;
    const docKeys = Object.keys(docs[0]);
    const csvKeys = rawResourceKeys;

    // Stores csv content. Each field and row is appended here
    let csvContent = `${'\ufeff' + csvKeys.join(',')}\n`;

    // Convert each resource into a valid csv record
    for (const doc of docs) {
        for (const key of docKeys) {
            if (key === '_id') {
                csvContent += `${doc[key].toString()},`;
            } else if (key === 'tags') {
                csvContent += `"${doc[key].join(', ')}",`;
            } else if (key === 'scoreCriteria') {
                csvContent += `${doc[key].join(',')}\n`;
            } else if (csvKeys.includes(key)) {
                switch (typeof doc[key]) {
                    case 'string':
                        csvContent += `"${doc[key].replace(/"/g, '""')}",`;
                        break;
                    case 'number':
                        csvContent += `${doc[key]},`;
                        break;
                    case 'boolean':
                        csvContent += `${doc[key]},`;
                        break;
                }
            }
        }
    }

    return csvContent.slice(0, -1);
};

const getCSVContent = (filePath: string): string => {
    const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
    return data;
};

describe('resources test suite', () => {
    let db: Db;
    let insertedResources: Resource[];

    let resourceCollection: Collection;
    let resourceRepository: IResourceRepository;
    let resourceService: IResourceService;
    let resourceController: IResourceController;

    let userCollection: Collection;
    let userRepository: IUserRepository;
    let userService: IUserService;
    let userController: IUserController;

    beforeAll(async () => {
        db = client.db(config.DATABASE_TEST_NAME);

        resourceCollection = db.collection('resources');
        resourceRepository = ResourceRepository(resourceCollection);
        resourceService = ResourceService(resourceRepository);
        resourceController = ResourceController(resourceService);

        const csvContents = await getCSVContents();
        insertedResources = JSON.parse(
            JSON.stringify(csvContents.resourceCollection)
        );
        await resourceCollection.insertMany(csvContents.resourceCollection);
        reqBody.pageLimit = insertedResources.length;

        userCollection = db.collection('user');
        userRepository = UserRepository(userCollection);
        userService = UserService(userRepository);
        userController = UserController(userService);
    });

    it('should retrieve all resources associated with one or more given tags', async () => {
        // Verify retrieved resource matches "Family foods" search
        reqBody.tags = ['family foods'];
        let result = await resourceRepository.getResourcesByProperties(
            reqBody.tags,
            reqBody.page,
            reqBody.sortingCriteria,
            reqBody.pageLimit,
            reqBody.filters
        );
        expect(result.success).toBeTruthy();
        expect(result.payload).toBeTruthy();
        let actual = getResourcesByPropertiesMock(
            insertedResources,
            reqBody.tags,
            reqBody.filters
        );
        expect((<IPaginatedResource>result.payload).resources.length).toBe(
            actual.length
        );
        expect(
            sameObjectsInArrays(
                (<IPaginatedResource>result.payload).resources,
                actual
            )
        ).toBeTruthy();

        // Verify retrieved resource matches "Breastfeeding" search
        reqBody.tags = ['breastfeeding'];
        result = await resourceRepository.getResourcesByProperties(
            reqBody.tags,
            reqBody.page,
            reqBody.sortingCriteria,
            reqBody.pageLimit,
            reqBody.filters
        );
        expect(result.success).toBeTruthy();
        expect(result.payload).toBeTruthy();
        actual = getResourcesByPropertiesMock(
            insertedResources,
            reqBody.tags,
            reqBody.filters
        );
        expect((<IPaginatedResource>result.payload).resources.length).toBe(
            actual.length
        );
        expect(
            sameObjectsInArrays(
                (<IPaginatedResource>result.payload).resources,
                actual
            )
        ).toBeTruthy();

        // Verify retrieved resource matches "Breastfeeding" + "Family foods" search
        reqBody.tags = ['breastfeeding', 'family foods'];
        result = await resourceRepository.getResourcesByProperties(
            reqBody.tags,
            reqBody.page,
            reqBody.sortingCriteria,
            reqBody.pageLimit,
            reqBody.filters
        );
        expect(result.success).toBeTruthy();
        expect(result.payload).toBeTruthy();
        actual = getResourcesByPropertiesMock(
            insertedResources,
            reqBody.tags,
            reqBody.filters
        );
        expect((<IPaginatedResource>result.payload).resources.length).toBe(
            actual.length
        );
        expect(
            sameObjectsInArrays(
                (<IPaginatedResource>result.payload).resources,
                actual
            )
        ).toBeTruthy();

        // Verify there is no match over a non-existing tag.
        reqBody.tags = ['Not a real tag sfdcvfd'];
        result = await resourceRepository.getResourcesByProperties(
            reqBody.tags,
            reqBody.page,
            reqBody.sortingCriteria,
            reqBody.pageLimit,
            reqBody.filters
        );
        expect(result.success).toBeTruthy();
        expect(result.payload).toBeTruthy();
        actual = getResourcesByPropertiesMock(
            insertedResources,
            reqBody.tags,
            reqBody.filters
        );
        expect((<IPaginatedResource>result.payload).resources.length).toBe(
            actual.length
        );
        expect(
            sameObjectsInArrays(
                (<IPaginatedResource>result.payload).resources,
                actual
            )
        ).toBeTruthy();
    });

    it('should retrieve resources applying resource types filter', async () => {
        // Verify retrieved resources matches "Breastfeeding" tag and
        // "Booklet" resourceType filter
        reqBody.tags = ['breastfeeding'];
        reqBody.filters.resourceTypes = ['booklet'];
        let result = await resourceRepository.getResourcesByProperties(
            reqBody.tags,
            reqBody.page,
            reqBody.sortingCriteria,
            reqBody.pageLimit,
            reqBody.filters
        );
        expect(result.success).toBeTruthy();
        expect(result.payload).toBeTruthy();
        let actual = getResourcesByPropertiesMock(
            insertedResources,
            reqBody.tags,
            reqBody.filters
        );
        expect((<IPaginatedResource>result.payload).resources.length).toBe(
            actual.length
        );
        expect(
            sameObjectsInArrays(
                (<IPaginatedResource>result.payload).resources,
                actual
            )
        ).toBeTruthy();

        // Verify retrieved resource matches "Breastfeeding" tag and
        // "Booklet" + "Brochure" resourceType filters
        reqBody.filters.resourceTypes = ['booklet', 'brochure'];
        result = await resourceRepository.getResourcesByProperties(
            reqBody.tags,
            reqBody.page,
            reqBody.sortingCriteria,
            reqBody.pageLimit,
            reqBody.filters
        );
        expect(result.success).toBeTruthy();
        expect(result.payload).toBeTruthy();
        actual = getResourcesByPropertiesMock(
            insertedResources,
            reqBody.tags,
            reqBody.filters
        );
        expect((<IPaginatedResource>result.payload).resources.length).toBe(
            actual.length
        );
        expect(
            sameObjectsInArrays(
                (<IPaginatedResource>result.payload).resources,
                actual
            )
        ).toBeTruthy();

        // Verify there is no match over a non-existing resource type.
        reqBody.filters.resourceTypes = ['Not a real resource type asdf'];
        result = await resourceRepository.getResourcesByProperties(
            reqBody.tags,
            reqBody.page,
            reqBody.sortingCriteria,
            reqBody.pageLimit,
            reqBody.filters
        );
        expect(result.success).toBeTruthy();
        expect(result.payload).toBeTruthy();
        actual = getResourcesByPropertiesMock(
            insertedResources,
            reqBody.tags,
            reqBody.filters
        );
        expect((<IPaginatedResource>result.payload).resources.length).toBe(
            actual.length
        );
        expect(
            sameObjectsInArrays(
                (<IPaginatedResource>result.payload).resources,
                actual
            )
        ).toBeTruthy();
    });

    it('should retrieve resources applying resource types and age groups filter', async () => {
        // Verify retrieved resource matches "Breastfeeding" tag, "Booklet"
        // resourceType and "Birth-5 years" age group filters
        reqBody.tags = ['breastfeeding'];
        reqBody.filters.resourceTypes = ['booklet'];
        reqBody.filters.ageGroups = ['birth-5 years'];
        let result = await resourceRepository.getResourcesByProperties(
            reqBody.tags,
            reqBody.page,
            reqBody.sortingCriteria,
            reqBody.pageLimit,
            reqBody.filters
        );
        expect(result.success).toBeTruthy();
        expect(result.payload).toBeTruthy();
        let actual = getResourcesByPropertiesMock(
            insertedResources,
            reqBody.tags,
            reqBody.filters
        );
        expect((<IPaginatedResource>result.payload).resources.length).toBe(
            actual.length
        );
        expect(
            sameObjectsInArrays(
                (<IPaginatedResource>result.payload).resources,
                actual
            )
        ).toBeTruthy();

        // Verify retrieved resource matches "Breastfeeding" tag, "Booklet" +
        // "Brochure" resourceType and "Birth-5 years" + "0-12 months" age group filters
        reqBody.filters.resourceTypes = ['booklet', 'brochure'];
        reqBody.filters.ageGroups = ['birth-5 years', '0-12 months'];
        result = await resourceRepository.getResourcesByProperties(
            reqBody.tags,
            reqBody.page,
            reqBody.sortingCriteria,
            reqBody.pageLimit,
            reqBody.filters
        );
        expect(result.success).toBeTruthy();
        expect(result.payload).toBeTruthy();
        actual = getResourcesByPropertiesMock(
            insertedResources,
            reqBody.tags,
            reqBody.filters
        );
        expect((<IPaginatedResource>result.payload).resources.length).toBe(
            actual.length
        );
        expect(
            sameObjectsInArrays(
                (<IPaginatedResource>result.payload).resources,
                actual
            )
        ).toBeTruthy();

        // Verify there is no match over a non-existing age group.
        reqBody.filters.ageGroups = ['Not a real age group asdf'];
        result = await resourceRepository.getResourcesByProperties(
            reqBody.tags,
            reqBody.page,
            reqBody.sortingCriteria,
            reqBody.pageLimit,
            reqBody.filters
        );
        expect(result.success).toBeTruthy();
        expect(result.payload).toBeTruthy();
        actual = getResourcesByPropertiesMock(
            insertedResources,
            reqBody.tags,
            reqBody.filters
        );
        expect((<IPaginatedResource>result.payload).resources.length).toBe(
            actual.length
        );
        expect(
            sameObjectsInArrays(
                (<IPaginatedResource>result.payload).resources,
                actual
            )
        ).toBeTruthy();
    });

    it(
        'should retrieve resources applying resource types, age groups' +
            ' and languages filter',
        async () => {
            // Verify retrieved resource matches "Breastfeeding" tag, "Booklet" resourceType,
            // "Birth-5 years" age group, and "korean" language filters
            reqBody.tags = ['breastfeeding'];
            reqBody.filters.resourceTypes = ['booklet'];
            reqBody.filters.ageGroups = ['birth-5 years'];
            reqBody.filters.languages = ['korean'];
            let result = await resourceRepository.getResourcesByProperties(
                reqBody.tags,
                reqBody.page,
                reqBody.sortingCriteria,
                reqBody.pageLimit,
                reqBody.filters
            );
            expect(result.success).toBeTruthy();
            expect(result.payload).toBeTruthy();
            let actual = getResourcesByPropertiesMock(
                insertedResources,
                reqBody.tags,
                reqBody.filters
            );
            expect((<IPaginatedResource>result.payload).resources.length).toBe(
                actual.length
            );
            expect(
                sameObjectsInArrays(
                    (<IPaginatedResource>result.payload).resources,
                    actual
                )
            ).toBeTruthy();

            // Verify retrieved resource matches "Breastfeeding" tag, "Booklet" +
            // "Brochure" resourceType, "Birth-5 years" + "0-12 months" age group,
            // and "korean" + "chinese" language filters
            reqBody.filters.resourceTypes = ['booklet', 'brochure'];
            reqBody.filters.ageGroups = ['birth-5 years', '0-12 months'];
            reqBody.filters.languages = ['korean', 'chinese'];
            result = await resourceRepository.getResourcesByProperties(
                reqBody.tags,
                reqBody.page,
                reqBody.sortingCriteria,
                reqBody.pageLimit,
                reqBody.filters
            );
            expect(result.success).toBeTruthy();
            expect(result.payload).toBeTruthy();
            actual = getResourcesByPropertiesMock(
                insertedResources,
                reqBody.tags,
                reqBody.filters
            );
            expect((<IPaginatedResource>result.payload).resources.length).toBe(
                actual.length
            );
            expect(
                sameObjectsInArrays(
                    (<IPaginatedResource>result.payload).resources,
                    actual
                )
            ).toBeTruthy();

            // Verify there is no match over a non-existing language.
            reqBody.filters.languages = ['Not a real language asdf'];
            result = await resourceRepository.getResourcesByProperties(
                reqBody.tags,
                reqBody.page,
                reqBody.sortingCriteria,
                reqBody.pageLimit,
                reqBody.filters
            );
            expect(result.success).toBeTruthy();
            expect(result.payload).toBeTruthy();
            actual = getResourcesByPropertiesMock(
                insertedResources,
                reqBody.tags,
                reqBody.filters
            );
            expect((<IPaginatedResource>result.payload).resources.length).toBe(
                actual.length
            );
            expect(
                sameObjectsInArrays(
                    (<IPaginatedResource>result.payload).resources,
                    actual
                )
            ).toBeTruthy();
        }
    );

    it(
        'should retrieve resources applying resource types, age groups,' +
            ' languages and categories filter',
        async () => {
            // Verify retrieved resource matches "Breastfeeding" tag, "Booklet" resourceType,
            // "Birth-5 years" age group, "korean" language and "healthy lifestyles" category
            // filters
            reqBody.tags = ['breastfeeding'];
            reqBody.filters.resourceTypes = ['booklet'];
            reqBody.filters.ageGroups = ['birth-5 years'];
            reqBody.filters.languages = ['korean'];
            reqBody.filters.categories = ['healthy lifestyles'];
            let result = await resourceRepository.getResourcesByProperties(
                reqBody.tags,
                reqBody.page,
                reqBody.sortingCriteria,
                reqBody.pageLimit,
                reqBody.filters
            );
            expect(result.success).toBeTruthy();
            expect(result.payload).toBeTruthy();
            let actual = getResourcesByPropertiesMock(
                insertedResources,
                reqBody.tags,
                reqBody.filters
            );
            expect((<IPaginatedResource>result.payload).resources.length).toBe(
                actual.length
            );
            expect(
                sameObjectsInArrays(
                    (<IPaginatedResource>result.payload).resources,
                    actual
                )
            ).toBeTruthy();

            // Verify retrieved resource matches "Breastfeeding" tag, "Booklet" +
            // "Brochure" resourceType, "Birth-5 years" + "0-12 months" age group,
            // "korean" + "chinese" language and "healthy lifestyles" + "breast or formula feeding"
            // categories filters
            reqBody.tags = ['breastfeeding'];
            reqBody.filters.resourceTypes = ['booklet', 'brochure'];
            reqBody.filters.ageGroups = ['birth-5 years', '0-12 months'];
            reqBody.filters.languages = ['korean', 'chinese'];
            reqBody.filters.categories = [
                'healthy lifestyles',
                'breast or formula feeding',
            ];
            result = await resourceRepository.getResourcesByProperties(
                reqBody.tags,
                reqBody.page,
                reqBody.sortingCriteria,
                reqBody.pageLimit,
                reqBody.filters
            );
            expect(result.success).toBeTruthy();
            expect(result.payload).toBeTruthy();
            actual = getResourcesByPropertiesMock(
                insertedResources,
                reqBody.tags,
                reqBody.filters
            );
            expect((<IPaginatedResource>result.payload).resources.length).toBe(
                actual.length
            );
            expect(
                sameObjectsInArrays(
                    (<IPaginatedResource>result.payload).resources,
                    actual
                )
            ).toBeTruthy();

            // Verify there is no match over a non-existing category.
            reqBody.filters.categories = ['Not a real category asdf'];
            result = await resourceRepository.getResourcesByProperties(
                reqBody.tags,
                reqBody.page,
                reqBody.sortingCriteria,
                reqBody.pageLimit,
                reqBody.filters
            );
            expect(result.success).toBeTruthy();
            expect(result.payload).toBeTruthy();
            actual = getResourcesByPropertiesMock(
                insertedResources,
                reqBody.tags,
                reqBody.filters
            );
            expect((<IPaginatedResource>result.payload).resources.length).toBe(
                actual.length
            );
            expect(
                sameObjectsInArrays(
                    (<IPaginatedResource>result.payload).resources,
                    actual
                )
            ).toBeTruthy();
        }
    );

    it(
        'should retrieve resources applying resource types, age groups,' +
            ' languages, categories and audiences filter',
        async () => {
            // Verify retrieved resource matches "Breastfeeding" tag, "Booklet" resourceType,
            // "Birth-5 years" age group, "korean" language, "healthy lifestyles" category,
            // and "general public" audience filters
            reqBody.tags = ['breastfeeding'];
            reqBody.filters.resourceTypes = ['booklet'];
            reqBody.filters.ageGroups = ['birth-5 years'];
            reqBody.filters.languages = ['korean'];
            reqBody.filters.categories = ['healthy lifestyles'];
            reqBody.filters.audiences = ['general public'];
            let result = await resourceRepository.getResourcesByProperties(
                reqBody.tags,
                reqBody.page,
                reqBody.sortingCriteria,
                reqBody.pageLimit,
                reqBody.filters
            );
            expect(result.success).toBeTruthy();
            expect(result.payload).toBeTruthy();
            let actual = getResourcesByPropertiesMock(
                insertedResources,
                reqBody.tags,
                reqBody.filters
            );
            expect((<IPaginatedResource>result.payload).resources.length).toBe(
                actual.length
            );
            expect(
                sameObjectsInArrays(
                    (<IPaginatedResource>result.payload).resources,
                    actual
                )
            ).toBeTruthy();

            // Verify retrieved resource matches "Breastfeeding" tag, "Booklet" +
            // "Brochure" resourceType, "Birth-5 years" + "0-12 months" age group,
            // "korean" + "chinese" language, "healthy lifestyles" + "breast or formula feeding"
            // categories, and "general public" + "children" audiences filters
            reqBody.tags = ['breastfeeding'];
            reqBody.filters.resourceTypes = ['booklet', 'brochure'];
            reqBody.filters.ageGroups = ['birth-5 years', '0-12 months'];
            reqBody.filters.languages = ['korean', 'chinese'];
            reqBody.filters.categories = [
                'healthy lifestyles',
                'breast or formula feeding',
            ];
            reqBody.filters.audiences = ['general public', 'children'];
            result = await resourceRepository.getResourcesByProperties(
                reqBody.tags,
                reqBody.page,
                reqBody.sortingCriteria,
                reqBody.pageLimit,
                reqBody.filters
            );
            expect(result.success).toBeTruthy();
            expect(result.payload).toBeTruthy();
            actual = getResourcesByPropertiesMock(
                insertedResources,
                reqBody.tags,
                reqBody.filters
            );
            expect((<IPaginatedResource>result.payload).resources.length).toBe(
                actual.length
            );
            expect(
                sameObjectsInArrays(
                    (<IPaginatedResource>result.payload).resources,
                    actual
                )
            ).toBeTruthy();

            // Verify there is no match over a non-existing category.
            reqBody.filters.categories = ['Not a real category asdf'];
            result = await resourceRepository.getResourcesByProperties(
                reqBody.tags,
                reqBody.page,
                reqBody.sortingCriteria,
                reqBody.pageLimit,
                reqBody.filters
            );
            expect(result.success).toBeTruthy();
            expect(result.payload).toBeTruthy();
            actual = getResourcesByPropertiesMock(
                insertedResources,
                reqBody.tags,
                reqBody.filters
            );
            expect((<IPaginatedResource>result.payload).resources.length).toBe(
                actual.length
            );
            expect(
                sameObjectsInArrays(
                    (<IPaginatedResource>result.payload).resources,
                    actual
                )
            ).toBeTruthy();
        }
    );

    it(
        'should retrieve resources applying resource types, age groups,' +
            ' languages, categories, subcategories and audiences filter',
        async () => {
            reqBody.tags = ['breastfeeding'];
            reqBody.filters.resourceTypes = ['paper-based'];
            reqBody.filters.ageGroups = ['birth-12 months'];
            reqBody.filters.languages = ['thai'];
            reqBody.filters.categories = ['breast or formula feeding'];
            reqBody.filters.subcategories = ['breastfeeding'];
            reqBody.filters.audiences = ['parents and families'];
            let result = await resourceRepository.getResourcesByProperties(
                reqBody.tags,
                reqBody.page,
                reqBody.sortingCriteria,
                reqBody.pageLimit,
                reqBody.filters
            );
            expect(result.success).toBeTruthy();
            expect(result.payload).toBeTruthy();
            let actual = getResourcesByPropertiesMock(
                insertedResources,
                reqBody.tags,
                reqBody.filters
            );
            expect((<IPaginatedResource>result.payload).resources.length).toBe(
                actual.length
            );
            expect(
                sameObjectsInArrays(
                    (<IPaginatedResource>result.payload).resources,
                    actual
                )
            ).toBeTruthy();

            reqBody.tags = ['breastfeeding'];
            reqBody.filters.resourceTypes = ['paper-based'];
            reqBody.filters.ageGroups = ['birth-5 years', 'birth-12 months'];
            reqBody.filters.languages = [
                'dari',
                'hindi',
                'croatian',
                'arabic',
                'burmese',
            ];
            reqBody.filters.categories = [
                'breast or formula feeding',
                'healthy lifestyles',
            ];
            reqBody.filters.subcategories = ['breastfeeding'];
            reqBody.filters.audiences = ['parents and families'];
            result = await resourceRepository.getResourcesByProperties(
                reqBody.tags,
                reqBody.page,
                reqBody.sortingCriteria,
                reqBody.pageLimit,
                reqBody.filters
            );
            expect(result.success).toBeTruthy();
            expect(result.payload).toBeTruthy();
            actual = getResourcesByPropertiesMock(
                insertedResources,
                reqBody.tags,
                reqBody.filters
            );
            expect((<IPaginatedResource>result.payload).resources.length).toBe(
                actual.length
            );
            expect(
                sameObjectsInArrays(
                    (<IPaginatedResource>result.payload).resources,
                    actual
                )
            ).toBeTruthy();

            // Verify there is no match over a non-existing category.
            reqBody.filters.categories = ['Not a real category asdf'];
            result = await resourceRepository.getResourcesByProperties(
                reqBody.tags,
                reqBody.page,
                reqBody.sortingCriteria,
                reqBody.pageLimit,
                reqBody.filters
            );
            expect(result.success).toBeTruthy();
            expect(result.payload).toBeTruthy();
            actual = getResourcesByPropertiesMock(
                insertedResources,
                reqBody.tags,
                reqBody.filters
            );
            expect((<IPaginatedResource>result.payload).resources.length).toBe(
                actual.length
            );
            expect(
                sameObjectsInArrays(
                    (<IPaginatedResource>result.payload).resources,
                    actual
                )
            ).toBeTruthy();
        }
    );

    it('should retrieve unique resources applying filters', async () => {
        fuzzyReqBody.terms = ['formula', 'feeding'];
        fuzzyReqBody.filters.resourceTypes = ['paper-based'];
        fuzzyReqBody.filters.languages = ['arabic'];
        fuzzyReqBody.filters.audiences = ['parents and families'];
        const result = await resourceRepository.getResourcesByFuzzy(
            fuzzyReqBody.terms,
            fuzzyReqBody.page,
            fuzzyReqBody.limit,
            fuzzyReqBody.filters,
            fuzzyReqBody.sortingCriteria
        );
        expect(result.success).toBeTruthy();
        expect(result.payload).toBeTruthy();
        expect(result.payload).toBeTruthy();
        expect(
            hasUniqueResourceIds(
                (result.payload as IPaginatedResource).resources
            )
        ).toBe(true);
    });

    it('should retrieve all categories resourceType properly', async () => {
        const mockResult = getFilterValuesMock(
            insertedResources,
            'resourceType'
        );
        const result = await resourceRepository.getFilterValues('resourceType');

        expect(result.success).toBeTruthy();
        expect(result.payload).toBeTruthy();
        expect((<string[]>result.payload).length).toBe(mockResult.length);

        const sameArr = arraysAreTheSame(
            <string[]>result.payload,
            <string[]>mockResult
        );
        expect(sameArr).toBeTruthy();
    });

    it('should retrieve all ageGroup filters properly', async () => {
        const mockResult = getFilterValuesMock(insertedResources, 'ageGroup');
        const result = await resourceRepository.getFilterValues('ageGroup');

        expect(result.success).toBeTruthy();
        expect(result.payload).toBeTruthy();
        expect((<string[]>result.payload).length).toBe(mockResult.length);

        const sameArr = arraysAreTheSame(
            <string[]>result.payload,
            <string[]>mockResult
        );
        expect(sameArr).toBeTruthy();
    });

    it('should retrieve all language filters properly', async () => {
        const mockResult = <LanguageFilter[]>(
            getFilterValuesMock(insertedResources, 'language')
        );
        const result = <LanguageFilter[]>(
            (await resourceRepository.getFilterValues('language')).payload
        );

        expect(result.length).toBe(mockResult.length);

        for (const language of mockResult) {
            const foundLanguage = result.find(
                (lan) =>
                    lan.language === language.language &&
                    lan.languageDisplay === language.languageDisplay
            );
            expect(foundLanguage).toBeTruthy();
        }

        for (const language of result) {
            const foundLanguage = mockResult.find(
                (lan) =>
                    lan.language === language.language &&
                    lan.languageDisplay === language.languageDisplay
            );
            expect(foundLanguage).toBeTruthy();
        }
    });

    it('should retrieve all category filters properly', async () => {
        const mockResult = <CategoryFilter[]>(
            getFilterValuesMock(insertedResources, 'category')
        );
        const result = <CategoryFilter[]>(
            (await resourceRepository.getFilterValues('category')).payload
        );

        expect(result.length).toBe(mockResult.length);

        for (const category of mockResult) {
            const foundCategory = result.find(
                (cat) =>
                    cat.category === category.category &&
                    arraysAreTheSame(cat.subcategories, category.subcategories)
            );
            expect(foundCategory).toBeTruthy();
        }

        for (const category of result) {
            const foundCategory = mockResult.find(
                (cat) =>
                    cat.category === category.category &&
                    arraysAreTheSame(cat.subcategories, category.subcategories)
            );
            expect(foundCategory).toBeTruthy();
        }
    });

    it('should retrieve all audience filters properly', async () => {
        const mockResult = getFilterValuesMock(insertedResources, 'audience');
        const result = await resourceRepository.getFilterValues('audience');

        expect(result.success).toBeTruthy();
        expect(result.payload).toBeTruthy();
        expect((<string[]>result.payload).length).toBe(mockResult.length);

        const sameArr = arraysAreTheSame(
            <string[]>result.payload,
            <string[]>mockResult
        );
        expect(sameArr).toBeTruthy();
    });

    it('should retrieve all unique resource tags', async () => {
        const mockResult = getAllResourcesTagsMock(insertedResources);
        const result = await resourceRepository.getAllResourcesTags();

        expect(result.success).toBeTruthy();
        expect(result.payload).toBeTruthy();
        expect((<string[]>result.payload).length).toBe(mockResult.length);

        const sameArr = arraysAreTheSame(
            <string[]>result.payload,
            <string[]>mockResult
        );
        expect(sameArr).toBeTruthy();
    });

    it('should create a proper CSV file', async () => {
        await exportData('resources');
        const mockCsvContent = (
            await exportResourcesMock(resourceCollection)
        ).split('\n');
        const csvContent = getCSVContent(
            './src/db/data/dump-data-files/resources_data.csv'
        ).split('\n');
        expect(csvContent.length).toBe(mockCsvContent.length);
        expect(
            mockCsvContent.every(
                (value: string, index: number) => value === csvContent[index]
            )
        ).toBeTruthy();
    });

    it('should export resources data properly', async () => {
        const mockLoginRequest = {
            body: testUserGG,
        } as unknown as express.Request;

        const mockLoginResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            cookie: jest.fn(),
        } as unknown as express.Response;

        await userController.userLogin(mockLoginRequest, mockLoginResponse);
        const token = (mockLoginResponse.cookie as jest.Mock).mock.calls[0][1];

        const mockUserRequest = {
            cookies: {
                ADMIN_ACCESS: token,
            },
        } as unknown as express.Request;

        const mockUserResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            download: jest.fn(),
        } as unknown as express.Response;

        await resourceController.exportResources(
            mockUserRequest,
            mockUserResponse
        );
        expect(mockUserResponse.download).toHaveBeenCalledWith(
            './src/db/data/dump-data-files/resources_data.csv',
            expect.anything()
        );
    });

    it('should fail file download when jwt is not provided', async () => {
        const mockUserRequest = {
            cookies: {},
        } as unknown as express.Request;

        const mockUserResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as express.Response;

        await resourceController.exportResources(
            mockUserRequest,
            mockUserResponse
        );

        expect(mockUserResponse.status).toHaveBeenCalledWith(401);
        expect(mockUserResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Expired or inexistent admin session. Login required',
        });
    });

    it('should fail file download when jwt is a broken token', async () => {
        const mockUserRequest = {
            cookies: {
                ADMIN_ACCESS: 'notARealToken-djfghksjdgf',
            },
        } as unknown as express.Request;

        const mockUserResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as express.Response;

        await resourceController.exportResources(
            mockUserRequest,
            mockUserResponse
        );

        expect(mockUserResponse.status).toHaveBeenCalledWith(401);
        expect(mockUserResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Expired or inexistent admin session. Login required',
        });
    });

    it('should fail resources update when jwt is not provided', async () => {
        const mockUserRequest = {
            cookies: {},
        } as unknown as express.Request;

        const mockUserResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as express.Response;

        await resourceController.updateResources(
            mockUserRequest,
            mockUserResponse
        );

        expect(mockUserResponse.status).toHaveBeenCalledWith(401);
        expect(mockUserResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Expired or inexistent admin session. Login required',
        });
    });

    it('should fail resources update when jwt is a broken token', async () => {
        const mockUserRequest = {
            cookies: {
                ADMIN_ACCESS: 'notARealToken-djfghksjdgf',
            },
        } as unknown as express.Request;

        const mockUserResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as express.Response;

        await resourceController.updateResources(
            mockUserRequest,
            mockUserResponse
        );

        expect(mockUserResponse.status).toHaveBeenCalledWith(401);
        expect(mockUserResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Expired or inexistent admin session. Login required',
        });
    });

    it('should fail resources update when file is not provided', async () => {
        const mockLoginRequest = {
            body: testUserGG,
        } as unknown as express.Request;

        const mockLoginResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            cookie: jest.fn(),
        } as unknown as express.Response;

        await userController.userLogin(mockLoginRequest, mockLoginResponse);
        const token = (mockLoginResponse.cookie as jest.Mock).mock.calls[0][1];

        const mockUserRequest = {
            cookies: {
                ADMIN_ACCESS: token,
            },
        } as unknown as express.Request;

        const mockUserResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as express.Response;

        await resourceController.updateResources(
            mockUserRequest,
            mockUserResponse
        );

        expect(mockUserResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'File attachment not found',
        });
    });

    it('should fail resources confirm update when jwt is not provided', async () => {
        const mockUserRequest = {
            cookies: {},
        } as unknown as express.Request;

        const mockUserResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as express.Response;

        await resourceController.confirmResourcesUpdate(
            mockUserRequest,
            mockUserResponse
        );

        expect(mockUserResponse.status).toHaveBeenCalledWith(401);
        expect(mockUserResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Expired or inexistent admin session. Login required',
        });
    });

    it('should fail resources confirm update when jwt is a broken token', async () => {
        const mockUserRequest = {
            cookies: {
                ADMIN_ACCESS: 'notARealToken-djfghksjdgf',
            },
        } as unknown as express.Request;

        const mockUserResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as express.Response;

        await resourceController.confirmResourcesUpdate(
            mockUserRequest,
            mockUserResponse
        );

        expect(mockUserResponse.status).toHaveBeenCalledWith(401);
        expect(mockUserResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Expired or inexistent admin session. Login required',
        });
    });

    it('should fail resources confirm update when resources list is empty', async () => {
        const mockLoginRequest = {
            body: testUserGG,
        } as unknown as express.Request;

        const mockLoginResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            cookie: jest.fn(),
        } as unknown as express.Response;

        await userController.userLogin(mockLoginRequest, mockLoginResponse);
        const token = (mockLoginResponse.cookie as jest.Mock).mock.calls[0][1];

        const mockUserRequest = {
            cookies: {
                ADMIN_ACCESS: token,
            },
            body: {
                resources: [],
            },
        } as unknown as express.Request;

        const mockUserResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as express.Response;

        await resourceController.confirmResourcesUpdate(
            mockUserRequest,
            mockUserResponse
        );

        expect(mockUserResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Empty array - no resources provided',
        });
    });
});
