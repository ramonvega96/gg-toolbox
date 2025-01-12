/**
 * This file handles the "See More" or "All Resources Shown" button which appears
 * at the end of resources displayed from a users search
 */
import { useIntl } from 'react-intl';

/**
 * Props for a "See More" or "All Resources"
 */
interface SeeMoreButtonInterface {
    allResultsShown: boolean;
    actualPage: number;
    setActualPage: (pageNum: number) => void;
    setReplaceResults: (replaceResults: boolean) => void;
}

/**
 * This component displays more resource cards based off two modes. If all
 * resource cards have been displayed then the button will switch from
 * "See More" to  "All Resources Shown"
 * Mode "searchBar":
 * - Displays more resources by "pages", given that there are results from a users search query.
 * - Requires resultsFound, actualPage and setActualPage props
 * Mode "searchResults":
 * - Displays resources from the "Here are some other resources you may find helpful" section
 * @param allResultsShown: if all resources have been displayed
 * @param actualPage: the current page of resources
 * @param setActualPage: setting the next page of resources
 * @returns "See More" or "All Resources Shown" button
 */
function SeeMoreButton({
    allResultsShown,
    actualPage,
    setActualPage,
    setReplaceResults,
}: SeeMoreButtonInterface) {
    const messages = useIntl();

    function renderSearchBarMode() {
        setReplaceResults(false);
        setActualPage(actualPage + 1);
    }

    return (
        <div
            className={`accordion flex justify-center w-full border-b-2 ${
                !allResultsShown && 'cursor-pointer'
            } mb-2`}
            onClick={() => {
                !allResultsShown && renderSearchBarMode();
            }}
            id="see-more-resources-button"
        >
            <div
                className={`flex justify-center !w-min ${
                    allResultsShown ? 'pb-3' : 'accordion-button'
                } shadow-none collapsed bg-white text`}
            >
                <h3 className="main-heading whitespace-nowrap mr-2 mb-0 align-bottom">
                    {messages.formatMessage({
                        id: allResultsShown ? 'allResultsShown' : 'seeMore',
                    })}
                </h3>
            </div>
        </div>
    );
}

export default SeeMoreButton;
