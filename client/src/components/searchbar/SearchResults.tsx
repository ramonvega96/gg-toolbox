import { Resource } from '../resourceCard/types/Resource';
import { useIntl } from 'react-intl';
import ResourceCardGroups from '../resourceCard/ResourceCardGroups';
import SeeMoreButton from './SeeMoreButton';

/**
 * Props for the SearchResults component
 */
interface SearchResultsParams {
    queryMatch: boolean;
    resources: Resource[];
    actualPage: number;
    setActualPage: (pageNum: number) => void;
    setReplaceResults: (replaceResults: boolean) => void;
    resourcesCount: number;
}

/**
 * This component renders the results (resources) from a users search query
 * @param queryMatch: if there are resources that match the users query
 * @param resources: resource cards
 * @returns a list of resource cards or no results found with suggested resources
 */
function SearchResults({
    queryMatch,
    resources,
    actualPage,
    setActualPage,
    setReplaceResults,
    resourcesCount,
}: SearchResultsParams) {
    const messages = useIntl();

    // true when all suggeted results shown
    const allSuggestedResultsShown =
        resources.length > 0 && resources.length < resourcesCount;

    if (queryMatch)
        return (
            <div className="flex flex-wrap pt-4">
                <ResourceCardGroups
                    resourcesDisplayed={resources.length}
                    contentParam={resources}
                />
            </div>
        );

    return (
        <div>
            <div
                className="py-40 text-center border-b-2"
                id="no-results-found"
            >
                <h4>{messages.formatMessage({ id: 'noResultsFound' })}</h4>
            </div>
            <div className="py-8 text-[#9F9F9F]">
                <h4>{messages.formatMessage({ id: 'otherResources' })}</h4>
            </div>
            <div className="flex flex-col md:flex-row flex-wrap">
                <ResourceCardGroups
                    resourcesDisplayed={resources.length}
                    contentParam={resources}
                />
            </div>
            <SeeMoreButton
                allResultsShown={!allSuggestedResultsShown}
                actualPage={actualPage}
                setActualPage={setActualPage}
                setReplaceResults={setReplaceResults}
            />
        </div>
    );
}

export default SearchResults;
