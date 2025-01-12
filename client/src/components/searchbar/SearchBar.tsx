/*
 * This file renders the search bar, search results, and filter search
 * It also handles the logic for the search bar and filter search
 * It is used on the search page
 */

import { useEffect, useState } from 'react';
import { Resource } from '../resourceCard/types/Resource';
import SearchResults from './SearchResults';
import {
    getFilterValues,
    SearchBarFilters,
    SortingCriteria,
    getUpdatedFilters,
    getResourcesByFuzzySearch,
} from '../../utils/NetworkCalls';
import { convertPayloadToResourceList } from '../../utils/GeneralFunctions';
import { AllFiltersCount } from './FilterSearch';
import { useSearchParams } from 'react-router-dom';
import IconKey from './IconKey';
import SortingAccordion from './SortingAccordion';
import FilterDropdown from './FilterDropdown';
import SelectedFilters from './SelectedFilters';
import SearchBarComponent from './SearchBarComponent';
import { CategoryFilter, LanguageFilter } from './types/Filter';
import { useIntl } from 'react-intl';
import PagingComponent from './PagingComponent';
import ResourcesPerPage from './ResourcesPerPage';
import { useNavigate, useLocation } from 'react-router-dom';

export const filterCategories = [
    'resourceTypes',
    'ageGroups',
    'languages',
    'categories',
    'subcategories',
    'audiences',
    'cultures',
];

export const convertSearchParamsToFilter = (
    searchParams: URLSearchParams
): SearchBarFilters => {
    const getSearchParamsArray = (paramName: string): string[] => {
        const paramValue = searchParams.get(paramName);
        if (paramValue) {
            return paramValue.split(';');
        }
        return [];
    };

    return {
        resourceTypes: getSearchParamsArray('resourceTypes'),
        ageGroups: getSearchParamsArray('ageGroups'),
        languages: getSearchParamsArray('languages'),
        categories: getSearchParamsArray('categories'),
        subcategories: getSearchParamsArray('subcategories'),
        audiences: getSearchParamsArray('audiences'),
        cultures: getSearchParamsArray('cultures'),
    };
};

function SearchBar() {
    const messages = useIntl();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    // User input on searchbar
    const [userInput, setUserInput] = useState<string>(
        searchParams.get('tagname') || ''
    );

    // A list of resources from the resource collection related to a tag
    const [tagResources, setTagResources] = useState<Resource[]>([]);
    // Current resources page
    const [actualPage, setActualPage] = useState<number>(0);
    // The amount of resources retrieved
    const [resourcesCount, setResourcesCount] = useState<number>(0);
    // Query match is true when there is a match for the search
    const [queryMatch, setQueryMatch] = useState<boolean>(true);
    // Pages count is the number of pages with results
    const [pagesCount, setPagesCount] = useState<number>(0);
    // Resources per page is the number of resource cards displayed per page (rpp)
    const [resourcesPerPage, setResourcesPerPage] = useState<number>(12);
    // Append or replace results
    const [replaceResults, setReplaceResults] = useState<boolean>(true);

    // The resources count of filters selection
    const [allFiltersCount, setAllFiltersCount] = useState<AllFiltersCount>({
        resourceTypes: {},
        ageGroups: {},
        languages: {},
        categories: {},
        subcategories: {},
        audiences: {},
        cultures: {},
    });

    // Resource Types list
    const [resourceTypes, setResourceTypes] = useState<string[]>([]);
    // Age Groups list
    const [ageGroups, setAgeGroups] = useState<string[]>([]);
    // Languages list
    const [languages, setLanguages] = useState<LanguageFilter[]>([]);
    // Categories list
    const [categories, setCategories] = useState<CategoryFilter[]>([]);
    // Audiences list
    const [audiences, setAudiences] = useState<string[]>([]);
    // Cultures list
    const [cultures, setCultures] = useState<string[]>([]);
    // Sorting Criteria
    const [sortingCriteria, setSortingCriteria] = useState<SortingCriteria>({
        score: -1,
    });
    // Selected sorting Criteria
    const [currentSortCriteria, setCurrentSortCriteria] =
        useState<string>('Relevance');
    // Sorting Criteria dropdown active/inactive
    const [sortByAccordionToggle, setSortByAccordionToggle] = useState(false);

    useEffect(() => {
        retrieveAllTagTypes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (actualPage !== 0) retrieveResources(userInput);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actualPage]);

    useEffect(() => {
        if (actualPage > Math.ceil(resourcesCount / resourcesPerPage))
            setActualPage(Math.ceil(resourcesCount / resourcesPerPage));
        else if (resourcesPerPage !== 12) retrieveResources(userInput);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resourcesPerPage]);

    useEffect(() => {
        applyFiltersDirectly();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortingCriteria, userInput]);

    useEffect(() => {
        if (userInput === (searchParams.get('tagname') || '')) {
            applyFiltersDirectly();
        } else {
            setUserInput(searchParams.get('tagname') || '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    /**
     * This function clears selected filters
     * @returns cleared resources filters
     */
    const clearFilters = () => {
        for (const filter of filterCategories) {
            searchParams.delete(filter);
        }
        navigate(`/search?${searchParams.toString()}`);
    };

    const retrieveAllTagTypes = async () => {
        await retrieveFilterValues(
            getFilterValues,
            setResourceTypes,
            'resourceType'
        );
        await retrieveFilterValues(getFilterValues, setAgeGroups, 'ageGroup');
        await retrieveFilterValues(getFilterValues, setLanguages, 'language');
        await retrieveFilterValues(getFilterValues, setCategories, 'category');
        await retrieveFilterValues(getFilterValues, setAudiences, 'audience');
        await retrieveFilterValues(getFilterValues, setCultures, 'culture');
    };

    const applyFiltersDirectly = () => {
        if (actualPage !== 1) setActualPage(1);
        else retrieveResources(userInput);
    };

    const applyFilters = () => {
        const targetUrl = `/search?${searchParams.toString()}`;
        const isDifferentUrl =
            location.pathname + location.search !== targetUrl;

        if (isDifferentUrl) {
            navigate(targetUrl);
        }
    };

    /**
     * This function retrieves the filter values using a network call to retrieve
     * the values and a setState to set the values
     * @param getFilter The network call to collect filter data from the database
     * @param setFilter the use state set action to set the filter
     * @param error the title of the field for the error message
     */
    async function retrieveFilterValues(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getFilter: (filter: string) => Promise<any>,
        setFilter:
            | ((value: string[]) => void)
            | ((value: LanguageFilter[]) => void)
            | ((value: CategoryFilter[]) => void),
        value: string
    ) {
        const res = await getFilter(value);
        if (res === undefined || !res.success) {
            console.error(
                `Error, unable to retrieve unique values for field ${value}`
            );
        } else setFilter(res.payload);
    }

    async function retrieveResources(tag: string) {
        setTagResources([...tagResources]);

        const resJSON = await getResourcesByFuzzySearch(
            tag,
            actualPage,
            sortingCriteria,
            convertSearchParamsToFilter(searchParams),
            resourcesPerPage,
            searchParams.get('h') === 'true',
            searchParams.get('state') === null
                ? undefined
                : (searchParams.get('state') as string)
        );

        if (resJSON.success && resJSON.payload.resources.length !== 0) {
            setQueryMatch(resJSON.payload.queryMatch);
            setPagesCount(
                Math.ceil(resJSON.payload.totalCount / resourcesPerPage)
            );
            const response = resJSON.payload.resources;

            if (response !== undefined && response !== '') {
                const tagDocuments: Resource[] =
                    convertPayloadToResourceList(response);
                setResourcesCount(resJSON.payload.totalCount);
                setTagResources(
                    actualPage === 1 || replaceResults
                        ? [...tagDocuments]
                        : [...tagResources, ...tagDocuments]
                );

                if (actualPage === 1) {
                    const [
                        resourceTypes,
                        ageGroups,
                        languages,
                        categories,
                        audiences,
                        cultures,
                    ] = await Promise.all([
                        getFilterValues('resourceType'),
                        getFilterValues('ageGroup'),
                        getFilterValues('language'),
                        getFilterValues('category'),
                        getFilterValues('audience'),
                        getFilterValues('culture'),
                    ]);

                    const filtersAll: SearchBarFilters = {
                        resourceTypes: resourceTypes.payload,
                        ageGroups: ageGroups.payload,
                        languages: languages.payload.map(
                            (lan: LanguageFilter) => {
                                return lan.language;
                            }
                        ),
                        categories: categories.payload.map(
                            (cat: CategoryFilter) => {
                                return cat.category;
                            }
                        ),
                        subcategories: categories.payload
                            .map((cat: CategoryFilter) => {
                                return cat.subcategories;
                            })
                            .flat(),
                        audiences: audiences.payload,
                        cultures: cultures.payload,
                    };

                    const updatedFilters = await getUpdatedFilters(
                        tag,
                        filtersAll,
                        true
                    );

                    setAllFiltersCount(updatedFilters.payload);
                }
            }
        } else {
            setAllFiltersCount({
                resourceTypes: {},
                ageGroups: {},
                languages: {},
                categories: {},
                subcategories: {},
                audiences: {},
                cultures: {},
            });
            setResourcesCount(0);
            setTagResources([]);
            setQueryMatch(false);
        }
    }

    return (
        <div>
            <div className="xl:flex xl:flex-row md:hidden sm:hidden mdsm:hidden xs:hidden">
                <div className="w-1/4">
                    <div className="flex flex-row">
                        <span className="w-full text-sm">
                            {`${
                                resourcesCount > 0 && queryMatch
                                    ? resourcesCount
                                    : 'No'
                            } results found`}
                        </span>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-3/4">
                            <button
                                type="button"
                                className="bg-checkerGrey w-full h-full text-sm"
                                onClick={() => {
                                    clearFilters();
                                }}
                                id="web-clear-filters-button"
                            >
                                {messages.formatMessage({
                                    id: 'clearFilters',
                                })}
                            </button>
                        </div>
                        <div className="w-1/4">
                            <IconKey />
                        </div>
                    </div>
                </div>
                <div className="w-3/4">
                    <SearchBarComponent withBorder={true} />
                </div>
            </div>

            <div className="xl:hidden md:flex sm:flex mdsm:flex xs:flex flex-row">
                <div
                    className="w-full"
                    id="mobile-searchbar-component"
                >
                    <SearchBarComponent withBorder={true} />
                </div>
            </div>

            <div className="xl:hidden md:flex sm:flex mdsm:flex xs:flex flex-row pt-6">
                <div
                    className="w-full"
                    id="mobile-clear-iconkey-component"
                >
                    <div className="flex flex-row">
                        <div className="w-[90%]">
                            <button
                                type="button"
                                className="bg-checkerGrey w-full h-full text-sm"
                                onClick={() => {
                                    clearFilters();
                                }}
                                id="mobile-clear-filters-button"
                            >
                                {messages.formatMessage({
                                    id: 'clearFilters',
                                })}
                            </button>
                        </div>
                        <div className="w-[10%] text-right">
                            <IconKey />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row w-full pt-10">
                <div className="w-1/2">
                    <FilterDropdown
                        resourceTypes={resourceTypes}
                        ageGroups={ageGroups}
                        languages={languages}
                        categories={categories}
                        audiences={audiences}
                        cultures={cultures}
                        filtersCount={allFiltersCount}
                        applyFilters={applyFilters}
                    />
                </div>
                <div className="w-1/2">
                    <SortingAccordion
                        currentSortCriteria={currentSortCriteria}
                        toggleAccordion={sortByAccordionToggle}
                        setSortingCriteria={setSortingCriteria}
                        setCurrentSortCriteria={setCurrentSortCriteria}
                        setToggleAccordion={setSortByAccordionToggle}
                    />
                </div>
            </div>

            <div className="xl:flex xl:flex-row w-full md:hidden sm:hidden mdsm:hidden xs:hidden">
                <div className="w-1/2">
                    <SelectedFilters dropDown={false} />
                </div>
            </div>

            <SearchResults
                resourcesCount={resourcesCount}
                queryMatch={queryMatch}
                resources={tagResources}
                actualPage={actualPage}
                setActualPage={setActualPage}
                setReplaceResults={setReplaceResults}
            />

            {queryMatch && resourcesCount > 0 && (
                <div className="flex flex-col items-center">
                    <PagingComponent
                        actualPage={actualPage}
                        pagesCount={pagesCount}
                        setActualPage={setActualPage}
                        setReplaceResults={setReplaceResults}
                    />
                    <ResourcesPerPage
                        resourcesTotalCount={resourcesCount}
                        resourcesPerPage={resourcesPerPage}
                        setResourcesPerPage={setResourcesPerPage}
                    />
                </div>
            )}
        </div>
    );
}

export default SearchBar;
