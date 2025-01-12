/*
 * This file renders the filter accordion for the search page.
 */

import { useState, useEffect } from 'react';
import { SearchBarFilterFields } from '../../utils/NetworkCalls';
import FilterAccordion from './FilterAccordion';
import { FilterProps } from './FilterDropdown';
import { useNavigate, useSearchParams } from 'react-router-dom';

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

/**
 * Props for the accordion filters
 */
interface FilterSearchProps extends FilterProps {
    dropdownToggle: boolean;
}

export const updateSelectedFilters = (
    filter: string,
    append: boolean,
    filterCategory: SearchBarFilterFields,
    searchParams: URLSearchParams,
    navigate: (path: string) => void
) => {
    const currentValue: string | null = searchParams.get(filterCategory);

    if (append)
        searchParams.set(
            filterCategory,
            currentValue ? currentValue + ';' + filter : filter
        );
    else if (currentValue) {
        const filterValues: string[] = currentValue.split(';');
        if (filterValues.length > 1) {
            const newFilterValues = filterValues.filter(
                (filterInCategory) => filterInCategory !== filter
            );
            searchParams.set(filterCategory, newFilterValues.join(';'));
        } else searchParams.delete(filterCategory);
    }

    navigate(`/search?${searchParams.toString()}`);
};

function FilterSearch({
    resourceTypes,
    ageGroups,
    languages,
    categories,
    audiences,
    cultures,
    filtersCount,
    dropdownToggle,
}: FilterSearchProps) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [categoryAccordion, toggleCategoryAccordion] = useState(false);
    const [resourceTypeAccordion, toggleResourceTypeAccordion] =
        useState(false);
    const [ageGroupAccordion, toggleAgeGroupAccordion] = useState(false);
    const [languageAccordion, toggleLanguageAccordion] = useState(false);
    const [audienceAccordion, toggleAudienceAccordion] = useState(false);
    const [cultureAccordion, toggleCultureAccordion] = useState(false);

    /**
     * This function takes appends or deletes resource types from the filter list
     * @param newFilter The filter to remove/append.
     * @param append True when we want to append the resource or false otherwise.
     * @param accordion The accordion the filter belongs to.
     * @returns resources
     */
    const updateSelectedFilter = (
        newFilter: string,
        append: boolean,
        accordion: SearchBarFilterFields
    ) => {
        updateSelectedFilters(
            newFilter,
            append,
            accordion,
            searchParams,
            navigate
        );
    };

    useEffect(() => {
        if (categoryAccordion) {
            toggleResourceTypeAccordion(false);
            toggleAgeGroupAccordion(false);
            toggleAudienceAccordion(false);
            toggleLanguageAccordion(false);
            toggleCultureAccordion(false);
        }
    }, [categoryAccordion]);
    useEffect(() => {
        if (resourceTypeAccordion) {
            toggleCategoryAccordion(false);
            toggleAgeGroupAccordion(false);
            toggleAudienceAccordion(false);
            toggleLanguageAccordion(false);
            toggleCultureAccordion(false);
        }
    }, [resourceTypeAccordion]);
    useEffect(() => {
        if (ageGroupAccordion) {
            toggleCategoryAccordion(false);
            toggleResourceTypeAccordion(false);
            toggleAudienceAccordion(false);
            toggleLanguageAccordion(false);
            toggleCultureAccordion(false);
        }
    }, [ageGroupAccordion]);
    useEffect(() => {
        if (audienceAccordion) {
            toggleCategoryAccordion(false);
            toggleResourceTypeAccordion(false);
            toggleAgeGroupAccordion(false);
            toggleLanguageAccordion(false);
            toggleCultureAccordion(false);
        }
    }, [audienceAccordion]);
    useEffect(() => {
        if (languageAccordion) {
            toggleCategoryAccordion(false);
            toggleResourceTypeAccordion(false);
            toggleAgeGroupAccordion(false);
            toggleAudienceAccordion(false);
            toggleCultureAccordion(false);
        }
    }, [languageAccordion]);
    useEffect(() => {
        if (cultureAccordion) {
            toggleCategoryAccordion(false);
            toggleResourceTypeAccordion(false);
            toggleAgeGroupAccordion(false);
            toggleLanguageAccordion(false);
            toggleAudienceAccordion(false);
        }
    }, [cultureAccordion]);
    useEffect(() => {
        if (!dropdownToggle) {
            toggleCategoryAccordion(false);
            toggleResourceTypeAccordion(false);
            toggleAgeGroupAccordion(false);
            toggleLanguageAccordion(false);
            toggleAudienceAccordion(false);
            toggleCultureAccordion(false);
        }
    }, [dropdownToggle]);

    return (
        <div>
            <FilterAccordion
                filtersCount={filtersCount}
                intlName="categories"
                filters={categories}
                toggleAccordion={categoryAccordion}
                setToggleAccordion={toggleCategoryAccordion}
                updateSelectedFilter={updateSelectedFilter}
            />
            <FilterAccordion
                filtersCount={filtersCount}
                intlName="resourceTypes"
                filters={resourceTypes}
                toggleAccordion={resourceTypeAccordion}
                setToggleAccordion={toggleResourceTypeAccordion}
                updateSelectedFilter={updateSelectedFilter}
            />
            <FilterAccordion
                filtersCount={filtersCount}
                intlName="ageGroups"
                filters={ageGroups}
                toggleAccordion={ageGroupAccordion}
                setToggleAccordion={toggleAgeGroupAccordion}
                updateSelectedFilter={updateSelectedFilter}
            />
            <FilterAccordion
                filtersCount={filtersCount}
                intlName="audiences"
                filters={audiences}
                toggleAccordion={audienceAccordion}
                setToggleAccordion={toggleAudienceAccordion}
                updateSelectedFilter={updateSelectedFilter}
            />
            <FilterAccordion
                filtersCount={filtersCount}
                intlName="cultures"
                filters={cultures}
                toggleAccordion={cultureAccordion}
                setToggleAccordion={toggleCultureAccordion}
                updateSelectedFilter={updateSelectedFilter}
            />
            <FilterAccordion
                filtersCount={filtersCount}
                intlName="languages"
                filters={languages}
                toggleAccordion={languageAccordion}
                doubleCol={true}
                setToggleAccordion={toggleLanguageAccordion}
                updateSelectedFilter={updateSelectedFilter}
            />
        </div>
    );
}

export default FilterSearch;
