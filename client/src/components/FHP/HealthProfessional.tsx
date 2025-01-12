import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import tagsAndProfessions from '../../assets/json/needHelpTagsAndProfessions.json';
import { PathwayContext } from '../../utils/Contexts';
import { useIntl } from 'react-intl';

interface HealthProfessionalProps {
    setProfession(job: string): void;
}
/**
 * This renders the list of health professionals that a user can
 * select from.
 * @returns JSX element
 */
function HealthProfessional(props: HealthProfessionalProps) {
    const messages = useIntl();
    const [showProfessions, setShowProfessions] = useState<boolean>(false);
    const { setProfession } = props;
    const { setPath } = useContext(PathwayContext);

    /**
     * This function scrolls to the bottom of the page
     * @returns an object triggering the scroll
     */
    const ScrollBottom = () => {
        const bottomRef = useRef<null | HTMLDivElement>(null);
        useEffect(
            () =>
                bottomRef.current?.scrollIntoView({
                    behavior: 'smooth',
                })
        );
        return <div ref={bottomRef} />;
    };

    return (
        <div
            id="i-know-what-hp-see-container"
            className="bg-secondaryGreen w-screen pt-10 pb-4 mt-10
         shadow-[0_-8px_#ff9233] hover:cursor-pointer"
            onClick={() => {
                setShowProfessions(!showProfessions);
            }}
        >
            <div className="w-full xs:ml-3 mdsm:ml-4 sm:ml-12 md:ml-20 max-lg:ml-24 lg:pl-14 ">
                <div
                    id="hp-header-container"
                    className="flex justify-between md:w-10/12 pb-2 xs:pl-0 max-md:w-[90vw] lg:w-9/12
                 "
                >
                    <h3 className="max-sm:text-base">
                        {messages.formatMessage({ id: 'iKnowMyHP' })}
                    </h3>

                    <button
                        id="hp-topic-button"
                        className="!leading-[1] hover:text-midGrey"
                        onClick={() => {
                            setShowProfessions(!showProfessions);
                        }}
                    >
                        {showProfessions ? (
                            <FontAwesomeIcon
                                className="text-3xl max-sm:text-xl"
                                icon={faChevronUp}
                            />
                        ) : (
                            <FontAwesomeIcon
                                className="text-3xl max-sm:text-xl"
                                icon={faChevronDown}
                            />
                        )}
                    </button>
                </div>
                <div
                    id="hp-grid-container"
                    className=""
                >
                    {showProfessions && (
                        <div
                            id="grid-container"
                            className="flex flex-col pt-10 text-left max-sm:w-11/12 
                        max-lg:w-10/12 lg:w-9/12 xl:w-[65%]"
                        >
                            <ScrollBottom />
                            <div
                                id="i-know-what-hp-see-grid"
                                className="grid grid-cols-2 grid-rows-4 
                        md:grid-cols-4 md:grid-rows-3 max-mymd:gap-x-4 
                        mymd:gap-x-12 gap-x-20 gap-y-4 md:gap-y-10 !leading-[1]"
                            >
                                {tagsAndProfessions.professions.map(
                                    (profession, index) => {
                                        return (
                                            <button
                                                key={index}
                                                id={
                                                    'hp-topic-button-' +
                                                    profession
                                                        .replace(/\s/g, '-')
                                                        .toLowerCase()
                                                }
                                                className="text-sm md:text-xl 
                                        text-primaryBlueDark font-omnes max-md:min-h-[100px]
                                     bg-white md:min-h-[150px] lg:min-h-[180px] 
                                     xl:min-h-[110px] w-full py-6 md:py-16 px-[1vw]  
                                     justify-center justify-self-center
                                    hover:!bg-lightGrey
                                     shadow-[13px_9px_13px_-7px_rgba(0,0,0,0.44);] !leading-[1]"
                                                onClick={() => {
                                                    setProfession(profession);
                                                    setPath(
                                                        'displayProfession'
                                                    );
                                                }}
                                            >
                                                {profession}
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HealthProfessional;
