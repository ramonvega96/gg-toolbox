/*
 * This component is used to display the filter search bar on small screens
 * It is used in the SearchBarContainer component
 */
import { useState, useRef, useEffect } from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterSearch, { AllFiltersCount } from './FilterSearch';
import { CategoryFilter, LanguageFilter } from './types/Filter';
import { useIntl } from 'react-intl';
import SelectedFilters from './SelectedFilters';
import { useSearchParams } from 'react-router-dom';
import { filterCategories } from './SearchBar';

export interface FilterProps {
    resourceTypes: string[];
    ageGroups: string[];
    languages: LanguageFilter[];
    categories: CategoryFilter[];
    audiences: string[];
    cultures: string[];
    filtersCount: AllFiltersCount;
}

interface FilterDropdownProps extends FilterProps {
    applyFilters: () => void;
}

function FilterDropdown({
    resourceTypes,
    ageGroups,
    languages,
    categories,
    audiences,
    cultures,
    filtersCount,
    applyFilters,
}: FilterDropdownProps) {
    const messages = useIntl();
    const [searchParams] = useSearchParams();
    const [toggleAccordion, setToggleAccordion] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const nodeId = (event.target as HTMLElement).getAttribute('id');

            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node) &&
                !nodeId?.includes('filter-tag-remove-')
            ) {
                setToggleAccordion(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const selectedFiltersCount = () => {
        return filterCategories
            .map((filterField) => {
                if (searchParams.get(filterField)) {
                    return searchParams
                        .get(filterField)
                        ?.split(';') as string[];
                }
                return undefined;
            })
            .flat()
            .filter((value) => value !== undefined).length;
    };

    return (
        <div
            ref={containerRef}
            id="filters-dropdown"
        >
            <button
                className={`w-full shadow-none text-gray-800 text-left bg-white ${
                    toggleAccordion ? 'show' : 'collapsed'
                }`}
            >
                <h2
                    className="font-normal text-xl border-b border-black pb-1 mb-0 flex items-center"
                    onClick={() => {
                        setToggleAccordion(!toggleAccordion);
                    }}
                >
                    Filters
                    <div className="inline-block rounded-full bg-checkerGrey px-2.5 ml-4">
                        <span className="text-black text-sm">
                            {selectedFiltersCount()}
                        </span>
                    </div>
                    <div className="flex center-items ml-auto pl-2">
                        <FontAwesomeIcon
                            icon={toggleAccordion ? faChevronUp : faChevronDown}
                            className="text-black pr-2"
                        />
                    </div>
                </h2>
            </button>
            <div className="absolute left-0 z-10 w-full xl:px-36 md:px-20 xs:px-8">
                <div
                    className={`rounded-md bg-white shadow-md 
                        border-0 ${
                            toggleAccordion ? 'show' : 'collapse'
                        } flex justify-center max-md:w-full md:w-1/2`}
                >
                    <div className="w-full rounded-md">
                        <SelectedFilters dropDown={true} />
                        <FilterSearch
                            resourceTypes={resourceTypes}
                            ageGroups={ageGroups}
                            languages={languages}
                            categories={categories}
                            audiences={audiences}
                            cultures={cultures}
                            filtersCount={filtersCount}
                            dropdownToggle={toggleAccordion}
                        />
                        <button
                            type="button"
                            className="bg-checkerGrey w-full h-10 text-sm border-t"
                            onClick={() => {
                                setToggleAccordion(false);
                                applyFilters();
                            }}
                            id="apply-filters-button"
                        >
                            {messages.formatMessage({
                                id: 'applyFilters',
                            })}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterDropdown;
