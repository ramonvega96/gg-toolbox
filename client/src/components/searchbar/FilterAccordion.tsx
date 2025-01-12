/**
 * Component accordion for the search bar filters
 */
import { useIntl } from 'react-intl';
import { AllFiltersCount } from './FilterSearch';
import { CategoryFilter, LanguageFilter } from './types/Filter';
import FilterAccordionContent from './FilterAccordionContent';
import {
    SearchBarFilterFields,
    SearchBarFilters,
} from '../../utils/NetworkCalls';
import { useEffect, useState } from 'react';
import { convertSearchParamsToFilter } from './SearchBar';
import { useSearchParams } from 'react-router-dom';

interface FilterAccordionProps {
    filtersCount: AllFiltersCount;
    intlName: SearchBarFilterFields;
    filters: string[] | CategoryFilter[] | LanguageFilter[];
    toggleAccordion: boolean;
    doubleCol?: boolean;
    setToggleAccordion: (toggleAccordion: boolean) => void;
    updateSelectedFilter: (
        filter: string,
        checked: boolean,
        filterType: SearchBarFilterFields
    ) => void;
}

const FilterAccordion = ({
    filtersCount,
    filters,
    intlName,
    toggleAccordion,
    doubleCol = false,
    setToggleAccordion,
    updateSelectedFilter,
}: FilterAccordionProps) => {
    const messages = useIntl();
    const [searchParams] = useSearchParams();
    const [selectedFilters, setSelectedFilters] = useState<SearchBarFilters>(
        convertSearchParamsToFilter(searchParams)
    );

    useEffect(() => {
        setSelectedFilters(convertSearchParamsToFilter(searchParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        <div
            id={`filter-accordion-${intlName}`}
            key={`filter-accordion-${intlName}`}
        >
            <button
                onClick={() => {
                    setToggleAccordion(!toggleAccordion);
                }}
                className="w-full shadow-none collapsed text-gray-800 text-left bg-white border-b border-t"
            >
                <h2 className="font-normal text-xl flex items-center mb-0 py-2 px-4">
                    {`${messages.formatMessage({
                        id: intlName,
                    })}`}
                    {!toggleAccordion &&
                        selectedFilters[intlName].length > 0 &&
                        intlName !== 'categories' && (
                            <div className="inline-block rounded-full bg-checkerGrey px-2.5 ml-auto">
                                <span className="text-black text-sm">
                                    {selectedFilters[intlName].length}
                                </span>
                            </div>
                        )}
                    {!toggleAccordion &&
                        selectedFilters[intlName].length +
                            selectedFilters['subcategories'].length >
                            0 &&
                        intlName === 'categories' && (
                            <div className="inline-block rounded-full bg-checkerGrey px-2.5 ml-auto">
                                <span className="text-black text-sm">
                                    {selectedFilters[intlName].length +
                                        selectedFilters['subcategories'].length}
                                </span>
                            </div>
                        )}
                </h2>
            </button>
            <div
                className={`bg-checkerGrey py-3 px-4 ${
                    toggleAccordion ? 'show' : 'collapse'
                }`}
            >
                <FilterAccordionContent
                    filtersCount={filtersCount}
                    selectedFilters={selectedFilters}
                    intlName={intlName}
                    filters={filters}
                    doubleCol={doubleCol}
                    updateSelectedFilter={updateSelectedFilter}
                />
            </div>
        </div>
    );
};

export default FilterAccordion;
