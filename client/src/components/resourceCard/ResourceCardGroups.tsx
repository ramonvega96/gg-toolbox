/**
 * This file returns an assortment of resource cards based on the values provided.
 */
import { useEffect, useState } from 'react';
import { getResourcesByTag, SearchBarFilters } from '../../utils/NetworkCalls';
import ResourceCard from '../resourceCard/ResourceCard';
import { Resource } from '../resourceCard/types/Resource';

/**
 * The props for this component are as follows:
 *      - contentParam: either the resource card values ready to render or the filter used to gather resource cards
 *      - cardStyle: the style/classnames to be applied to the individual resource cards
 */
interface ResourceCardGroupProps {
    contentParam: Resource[] | SearchBarFilters;
    limit?: number;
    resourcesDisplayed: number;
}

function ResourceCardGroup({
    contentParam,
    limit,
    resourcesDisplayed,
}: ResourceCardGroupProps) {
    const [resourceCards, setResourceCards] = useState<Resource[]>([]);

    /**
     * This is a checker to check whether an item (provided it is
     * Resource[] or searchBarFilters) is a searchBarFilters
     * This is used on the contentParam props to determine whether additional
     * steps are needed before the render
     * @param item the Resource or searchBarFilters
     * @returns true whether the item is a searchBarFilters
     */
    const isFilter = (
        item: Resource[] | SearchBarFilters
    ): item is SearchBarFilters => 'ageGroups' in item;

    /**
     * Using isFilter() to determine whether we need to receive resources and set them
     * to a state
     */
    useEffect(() => {
        /**
         * Receive and set resources based on a provided filter
         * @param filter
         */
        const getResourcesByFilter = async (
            filter: SearchBarFilters,
            limit?: number
        ) => {
            const resJSON = await getResourcesByTag(
                [],
                1,
                { publicationDate: -1 },
                filter,
                limit
            );
            setResourceCards(resJSON.payload.resources);
        };

        if (isFilter(contentParam)) {
            getResourcesByFilter(contentParam, limit);
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Creates the array of resource cards with styling applied if specified
     * @param resourceList resource card values to display
     * @returns an array of resource cards in a styled div
     */
    const createResourceList = (resourceList: Resource[]) =>
        resourceList.map(
            (resourceCardVal: Resource, index: number) =>
                index < resourcesDisplayed && (
                    <div
                        className={`xl:w-1/3 md:w-1/2 sm:w-full pb-2 pt-1 ${
                            (index + 1) % 2 === 0 ? 'md:pl-1' : 'md:pr-1'
                        } ${
                            Number.isInteger((index - 1) / 3)
                                ? 'xl:px-1'
                                : (index + 1) % 3 === 0
                                ? 'xl:pl-2 xl:pr-0'
                                : 'xl:pr-2 xl:pl-0'
                        } sm:px-0`}
                        key={index}
                    >
                        <ResourceCard
                            {...resourceCardVal}
                            key={index}
                        />
                    </div>
                )
        );

    return (
        <>
            {isFilter(contentParam)
                ? createResourceList(resourceCards)
                : createResourceList(contentParam)}
        </>
    );
}

export default ResourceCardGroup;
