import { useIntl } from 'react-intl';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface ResourcesPerPageInterface {
    resourcesTotalCount: number;
    resourcesPerPage: number;
    setResourcesPerPage: (rpp: number) => void;
}

function ResourcesPerPage({
    resourcesTotalCount,
    resourcesPerPage,
    setResourcesPerPage,
}: ResourcesPerPageInterface) {
    const messages = useIntl();
    const pagingOptions = [9, 18, 36, 72];

    const [accordionToggle, setAccordionToggle] = useState(false);

    return (
        <div className="xl:w-3/4 max-xl:w-full flex flex-row justify-between pt-2 border-t-2">
            <span className="flex items-center justify-center text-sm w-1/2">
                {`${resourcesTotalCount} ${messages.formatMessage({
                    id: 'resultsFound',
                })}`}
            </span>
            <div className="w-1/2 flex flex-row justify-center max-xs:justify-start">
                <span className="flex items-center text-sm items-center">
                    {messages.formatMessage({
                        id: 'viewPerPage',
                    })}
                </span>
                <div className="flex flex-col ml-2">
                    <div
                        className="flex flex-row w-[60px] border items-center justify-between cursor-pointer px-2"
                        onClick={() => setAccordionToggle(!accordionToggle)}
                        onBlur={() => {
                            setTimeout(() => {
                                setAccordionToggle(false);
                            }, 200);
                        }}
                        tabIndex={0}
                        id="rpp-dropdow"
                    >
                        <h2
                            className={`p-1 mb-0 font-normal text-sm text-center`}
                        >
                            {resourcesPerPage}
                        </h2>
                        <FontAwesomeIcon
                            icon={
                                !accordionToggle ? faChevronUp : faChevronDown
                            }
                            className="text-black"
                        />
                    </div>
                    <div className="relative">
                        <div
                            className={`absolute z-[10] rounded-none bg-white shadow-md border-t w-[60px]
                                ${accordionToggle ? 'show' : 'collapse'}`}
                            id="rpp-options"
                        >
                            {pagingOptions.map((rpp: number, index: number) => {
                                return (
                                    <h2
                                        className={`p-1 mb-0 hover:bg-lightGrey cursor-pointer font-normal
                                            text-sm text-center  ${
                                                index !== 0 ? 'border-t' : ''
                                            }`}
                                        id={`rpp-accordion-option-${index}`}
                                        key={rpp}
                                        onClick={() => {
                                            setResourcesPerPage(rpp);
                                            setTimeout(() => {
                                                window.scrollTo({
                                                    top: 0,
                                                    left: 0,
                                                });
                                            }, 200);
                                        }}
                                    >
                                        {rpp}
                                    </h2>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResourcesPerPage;
