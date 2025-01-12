import ResourceCard from '../resourceCard/ResourceCard';
import { Resource } from '../resourceCard/types/Resource';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';
import { useEffect, useState } from 'react';

/**
 * Interface for resource slider
 */
interface ResourceSliderInterface {
    resources: Resource[];
    breakpoint: string;
}
/**
 * This renders the resource slider (carousel) for the "here are some professionals that may help" page.
 * The number of resource cards displayed is responsive:
 * @param resources an array of resource cards
 * @param breakpoint the current screen size
 * Mobile shows 1 card, tablet shows 2, web shows 3
 * @returns a series of resource cards
 */
function ResourceSlider(props: ResourceSliderInterface) {
    const { resources, breakpoint } = props;
    const messages = useIntl();
    const [rightResource, setRightResource] = useState<number>(-1);
    const [leftResource, setLeftResources] = useState<number>(0);

    /**
     * This function handles the switching of resource cards for the left
     * arrow
     */
    function resourcesLeft() {
        if (
            leftResource === resources.length ||
            rightResource === resources.length
        ) {
            setLeftResources(0);
            resetResources();
        } else {
            setRightResource(rightResource + 1);
            setLeftResources(leftResource + 1);
        }
    }
    /**
     * This function handles the switching resource cards for the right
     * arrow
     */
    function resourcesRight() {
        if (
            rightResource === resources.length ||
            leftResource === resources.length
        ) {
            setLeftResources(0);
            resetResources();
        } else {
            setRightResource(rightResource + 1);
            setLeftResources(leftResource + 1);
        }
    }

    /**
     * This function resets the resources displayed based off the screen size
     * This is called when the end of the resource array has been reached.
     */
    function resetResources() {
        switch (breakpoint) {
            case 'sm':
                setRightResource(1);
                break;
            case 'md':
                setRightResource(2);
                break;
            case 'xl':
                setRightResource(3);
                break;
        }
    }
    /**
     * This useEffect  initialises the rendering of resource cards based off the
     * current breakpoint specified from the browser
     */

    useEffect(() => {
        switch (breakpoint) {
            case 'sm':
                rightResource === -1 ? setRightResource(1) : resourcesRight();
                break;
            case 'md':
                rightResource === -1 ? setRightResource(2) : resourcesRight();
                break;
            case 'xl':
                rightResource === (-1 || resources.length)
                    ? setRightResource(3)
                    : resourcesRight();
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div
            id="resource-slider-headers-container"
            className="flex flex-col h-full w-full md:pt-20 pt-5 pb-10 bg-secondaryGreen shadow-[0_-8px_#ff9233] justify-center items-center"
        >
            <div
                id="resource-slider-headers"
                className="text-center font-omnes mb-16 max-mymd:px-8 mymd:px-20 xl:px-36"
            >
                <h1 className="max-sm:text-base font-omnes">
                    {messages.formatMessage({
                        id: 'relatedResources',
                    })}
                </h1>
                <p className="font-forma max-sm:text-base">
                    {messages.formatMessage({
                        id: 'viewRelatedResources',
                    })}
                </p>
            </div>

            <div
                id="resource-slider-container"
                className="flex flex-row justify-between items-center max-mymd:px-4 mymd:px-20 xl:px-36"
            >
                <FontAwesomeIcon
                    id="left-arrow"
                    icon={faAngleLeft}
                    className="sm:flex hidden text-4xl hover:cursor-pointer w-10 pr-2"
                    onClick={() => {
                        resourcesLeft();
                    }}
                />
                <div className="flex flex-row justify-between items-center">
                    {resources
                        .slice(leftResource, rightResource)
                        .map((resourceCardVal: Resource, index: number) => {
                            return (
                                <div
                                    className="max-md:w-full w-1/2 px-2"
                                    key={index}
                                >
                                    <ResourceCard
                                        {...resourceCardVal}
                                        key={index}
                                    />
                                </div>
                            );
                        })}
                </div>
                <FontAwesomeIcon
                    id="right-arrow"
                    icon={faAngleRight}
                    className="sm:flex hidden text-4xl hover:cursor-pointer w-10 pl-2"
                    onClick={() => {
                        resourcesRight();
                    }}
                />
            </div>
            <div
                id="resource-slider-container"
                className="flex flex-row sm:hidden flex justify-between items-center max-mymd:px-4 mymd:px-20 xl:px-36 mt-4"
            >
                <FontAwesomeIcon
                    id="left-arrow"
                    icon={faAngleLeft}
                    className="text-4xl hover:cursor-pointer w-10 pr-4"
                    onClick={() => {
                        resourcesLeft();
                    }}
                />
                <FontAwesomeIcon
                    id="right-arrow"
                    icon={faAngleRight}
                    className="text-4xl hover:cursor-pointer w-10 pl-4"
                    onClick={() => {
                        resourcesRight();
                    }}
                />
            </div>
        </div>
    );
}

export default ResourceSlider;
