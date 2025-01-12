/*
 * This component renders the accordion which is used to sort the search results.
 */
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';
import { SortingCriteria } from '../../utils/NetworkCalls';

interface SortingAccordionProps {
    currentSortCriteria: string;
    toggleAccordion: boolean;
    setSortingCriteria: (newSortCriteria: SortingCriteria) => void;
    setCurrentSortCriteria: (newSortCriteria: string) => void;
    setToggleAccordion: (toggleAccordion: boolean) => void;
}

const SortingAccordion = ({
    currentSortCriteria,
    toggleAccordion,
    setSortingCriteria,
    setCurrentSortCriteria,
    setToggleAccordion,
}: SortingAccordionProps) => {
    const messages = useIntl();

    const sortingCriteriaOptions = [
        'Relevance',
        'Newest',
        'Oldest',
        'Alphabetical (A-Z)',
        'Alphabetical (Z-A)',
    ];

    const handleSortingOptionClick = (sortingOption: string) => {
        switch (sortingOption) {
            case 'Relevance':
                setSortingCriteria({ score: -1 });
                break;
            case 'Newest':
                setSortingCriteria({ publicationDate: -1 });
                break;
            case 'Oldest':
                setSortingCriteria({ publicationDate: 1 });
                break;
            case 'Alphabetical (A-Z)':
                setSortingCriteria({ resourceTitle: 1 });
                break;
            case 'Alphabetical (Z-A)':
                setSortingCriteria({ resourceTitle: -1 });
                break;
        }

        setCurrentSortCriteria(sortingOption);
    };

    return (
        <div>
            <button
                className={`flex justify-end w-full shadow-none text-gray-800 text-left bg-white hover:cursor-default ${
                    toggleAccordion ? 'show' : 'collapsed'
                }`}
            >
                <h2
                    className="xl:w-2/3 md:w-2/3 sm:w-4/5 xs:w-[90%] font-normal text-xl border-b border-black pb-1 mb-0 flex items-center cursor-pointer"
                    onClick={() => {
                        setToggleAccordion(!toggleAccordion);
                    }}
                    id="sorting-accordion"
                    onBlur={() => {
                        setTimeout(() => {
                            setToggleAccordion(false);
                        }, 200);
                    }}
                    tabIndex={0}
                >
                    {messages.formatMessage({
                        id: 'sortBy',
                    })}
                    <div className="flex center-items ml-auto pl-2">
                        {currentSortCriteria && (
                            <span className="font-normal mdsm:hidden xl:block pr-2">
                                {currentSortCriteria}
                            </span>
                        )}
                        <FontAwesomeIcon
                            icon={toggleAccordion ? faChevronUp : faChevronDown}
                            className="text-black"
                        />
                    </div>
                </h2>
            </button>
            <div className="absolute left-0 z-10 w-full xl:px-36 md:px-20 xs:px-8 flex justify-end">
                <div
                    className={`rounded-md bg-white shadow-md border-t 
                    xl:w-1/3 md:w-1/3 max-md:w-full 
                    ${toggleAccordion ? 'show' : 'collapse'}`}
                    id="sorting-accordion-options"
                >
                    {sortingCriteriaOptions.map(
                        (criteria: string, index: number) => {
                            return (
                                <h2
                                    className={`py-2 px-4 mb-0 hover:bg-lightGrey cursor-pointer font-normal text-xl ${
                                        index !== 0 ? 'border-t' : ''
                                    }`}
                                    id={`sorting-accordion-option-${index}`}
                                    key={criteria}
                                    onClick={() =>
                                        handleSortingOptionClick(criteria)
                                    }
                                >
                                    {criteria}
                                </h2>
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    );
};

export default SortingAccordion;
