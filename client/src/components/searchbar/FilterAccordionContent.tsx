/**
 * Component accordion for the search bar filters
 */
import {
    SearchBarFilterFields,
    SearchBarFilters,
} from '../../utils/NetworkCalls';
import { AllFiltersCount } from './FilterSearch';
import { CategoryFilter, LanguageFilter } from './types/Filter';

interface FilterAccordionContentProps {
    filtersCount: AllFiltersCount;
    selectedFilters: SearchBarFilters;
    intlName: SearchBarFilterFields;
    filters: string[] | LanguageFilter[] | CategoryFilter[];
    doubleCol: boolean;
    updateSelectedFilter: (
        filter: string,
        checked: boolean,
        filterType: SearchBarFilterFields
    ) => void;
}

const FilterAccordionContent = ({
    filtersCount,
    selectedFilters,
    intlName,
    filters,
    doubleCol,
    updateSelectedFilter,
}: FilterAccordionContentProps) => {
    /**
     * Checks whether various forms of a string appear in a list of strings
     * @param valueList The array of strings to be searched
     * @param lookUpValue the value we are looking for
     * @returns a boolean value whether the valueList contains the lookUpValue
     */
    const isChecked = (valueList: string[], lookUpValue: string): boolean => {
        return (
            valueList.includes(lookUpValue.toLowerCase()) ||
            valueList.includes(lookUpValue)
        );
    };

    const renderAccordionContent = (
        filter: string | LanguageFilter | CategoryFilter,
        index: number
    ) => {
        if (typeof filter === 'string')
            return (
                <div
                    onClick={() => {
                        updateSelectedFilter(
                            filter,
                            !isChecked(selectedFilters[intlName], filter),
                            intlName
                        );
                    }}
                    className="flex items-center mb-2"
                    key={`filter-${intlName}-${index}`}
                    id={`filter-${intlName}:${filter}`}
                >
                    <div
                        className={`border-2 border-gray-400 rounded-md w-6 h-6 flex 
                            justify-center items-center focus:outline-none p-1 bg-white`}
                    >
                        <div
                            className={`${
                                isChecked(selectedFilters[intlName], filter)
                                    ? 'bg-secondaryGreen'
                                    : 'bg-white'
                            } rounded-full w-3 h-3`}
                        />
                    </div>
                    <label
                        htmlFor={filter}
                        className="ml-2 text-md"
                    >
                        {filter}
                        <em>
                            {filtersCount[intlName][filter] !== undefined &&
                                ` (${filtersCount[intlName][filter]})`}
                        </em>
                    </label>
                </div>
            );
        if (typeof filter === 'object' && 'language' in filter)
            return (
                <div
                    onClick={() => {
                        updateSelectedFilter(
                            filter.language,
                            !isChecked(
                                selectedFilters[intlName],
                                filter.language
                            ),
                            intlName
                        );
                    }}
                    className="flex items-center mb-2"
                    key={`filter-${intlName}-${index}`}
                    id={`filter-${intlName}:${filter.language}`}
                >
                    <div
                        className={`border-2 border-gray-400 rounded-md w-6 h-6 flex 
                            justify-center items-center focus:outline-none p-1 bg-white`}
                    >
                        <div
                            className={`${
                                isChecked(
                                    selectedFilters[intlName],
                                    filter.language
                                )
                                    ? 'bg-secondaryGreen'
                                    : 'bg-white'
                            } rounded-full w-3 h-3`}
                        />
                    </div>
                    <label
                        htmlFor={filter.language}
                        className="ml-2 text-md"
                    >
                        {filter.languageDisplay}
                        <em>
                            {filtersCount[intlName][filter.language] !==
                                undefined &&
                                ` (${filtersCount[intlName][filter.language]})`}
                        </em>
                    </label>
                </div>
            );
        if (typeof filter === 'object' && 'category' in filter)
            return (
                <div>
                    <div
                        onClick={() => {
                            updateSelectedFilter(
                                filter.category,
                                !isChecked(
                                    selectedFilters[intlName],
                                    filter.category
                                ),
                                intlName
                            );
                        }}
                        className="flex items-center mb-2"
                        key={`filter-${intlName}-${index}`}
                        id={`filter-${intlName}:${filter.category}`}
                    >
                        <div
                            className={`border-2 border-gray-400 rounded-md w-6 h-6 flex 
                            justify-center items-center focus:outline-none p-1 bg-white`}
                        >
                            <div
                                className={`${
                                    isChecked(
                                        selectedFilters[intlName],
                                        filter.category
                                    )
                                        ? 'bg-secondaryGreen'
                                        : 'bg-white'
                                } rounded-full w-3 h-3`}
                            />
                        </div>
                        <label
                            htmlFor={filter.category}
                            className="ml-2 text-md"
                        >
                            {filter.category}
                            <em>
                                {filtersCount[intlName][filter.category] !==
                                    undefined &&
                                    ` (${
                                        filtersCount[intlName][filter.category]
                                    })`}
                            </em>
                        </label>
                    </div>
                    <div className="mx-8 py-3 border-t border-gray-400">
                        <FilterAccordionContent
                            filtersCount={filtersCount}
                            selectedFilters={selectedFilters}
                            intlName={'subcategories'}
                            filters={filter.subcategories}
                            doubleCol={true}
                            updateSelectedFilter={updateSelectedFilter}
                        />
                    </div>
                </div>
            );
    };

    return (
        <div className={`${doubleCol ? 'grid grid-cols-2 gap-1' : ''}`}>
            {filters.map(
                (filter: string | LanguageFilter | CategoryFilter, index) => {
                    return (
                        <div key={`filter-accordion-content-${index}`}>
                            {renderAccordionContent(filter, index)}
                        </div>
                    );
                }
            )}
        </div>
    );
};

export default FilterAccordionContent;
