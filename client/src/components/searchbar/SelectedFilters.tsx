import { useIntl } from 'react-intl';
import { SearchBarFilterFields } from '../../utils/NetworkCalls';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { updateSelectedFilters } from './FilterSearch';
import { useState, useEffect } from 'react';
import { filterCategories } from './SearchBar';

interface SelectedFiltersProps {
    dropDown: boolean;
}

interface SelectedFilterTag {
    filter: string;
    filterField: SearchBarFilterFields;
}

const SelectedFilters = ({ dropDown }: SelectedFiltersProps) => {
    const messages = useIntl();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [appliedFilters, setAppliedFilters] = useState<SelectedFilterTag[]>(
        []
    );

    useEffect(() => {
        getSelectedFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const getSelectedFilters = () => {
        const filtersInUrl = filterCategories
            .map((filterField) => {
                if (searchParams.get(filterField))
                    return (
                        searchParams.get(filterField)?.split(';') as string[]
                    ).map((filter) => {
                        return {
                            filter,
                            filterField,
                        } as SelectedFilterTag;
                    });
                return undefined;
            })
            .flat()
            .filter((value) => value !== undefined) as SelectedFilterTag[];
        setAppliedFilters(filtersInUrl);
    };

    return (
        <div
            className={`py-2 pl-2 ${appliedFilters.length < 1 ? 'hidden' : ''}`}
        >
            <div className="text-xm text-primaryGrey">
                {messages.formatMessage({
                    id: 'selectedFilters',
                })}
            </div>
            <div className="flex flex-wrap">
                {appliedFilters.map((filter) => {
                    return (
                        <div
                            className="flex flex-row my-1 mr-2 relative"
                            key={filter.filter}
                            id={`filter-tag-${filter.filter}`}
                        >
                            <div className="bg-checkerGrey px-3 py-1">
                                {filter.filter}
                            </div>
                            <div
                                className={`${
                                    dropDown ? 'z-[11]' : 'z-[9]'
                                } rounded-md bg-checkerGrey px-1.5 absolute 
                                right-[0%] top-[-10%] text-black text-xs cursor-pointer`}
                                onClick={() =>
                                    updateSelectedFilters(
                                        filter.filter,
                                        false,
                                        filter.filterField,
                                        searchParams,
                                        navigate
                                    )
                                }
                                id={`filter-tag-remove-${filter.filter}`}
                            >
                                x
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SelectedFilters;
