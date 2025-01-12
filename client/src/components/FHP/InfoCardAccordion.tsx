import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { PathwayContext } from '../../utils/Contexts';
import { createBoldText, InfoCardInterface } from './InfoCard';

interface InfoCardAccordionInterface {
    toggleAccordion: boolean;
    navigatePathwayMode(
        selectedProfession: string,
        setProfessionalPathway: (professionalPathway: string) => void,
        setPath: (path: string) => void,
        link?: string
    ): void;
}

function InfoCardAccordion(
    props: InfoCardAccordionInterface & InfoCardInterface
) {
    const {
        toggleAccordion,
        modalHeader,
        description,
        profession,
        modalTopics,
        greenButtonLabel,
        blueButtonLabel,
        setModalHeader,
        setModalContent,
        setToggleModal,
        navigatePathwayMode,
        setProfessionalPathway,
    } = props;
    const { setPath } = useContext(PathwayContext);

    return (
        <>
            <div
                id="accordion-find-help-container"
                className={`${
                    toggleAccordion &&
                    'w-screen bg-lightGrey pb-10 lg:hidden px-10'
                }`}
            >
                {toggleAccordion && (
                    <div
                        id="find-help-info-accordion"
                        className="w-full"
                    >
                        <p
                            id="hp-accordion-description"
                            className="font-forma whitespace-pre-wrap mb-10 pt-4"
                        >
                            {createBoldText(description)}
                        </p>
                        <button
                            className="bg-secondaryGreen !leading-[1] shadow-[2px_6px_5px_0px_rgba(194,194,194,0.75)] w-full text-white font-omnes font-thin drop-shadow-lg text-left hover:underline py-2 px-4 min-h-[70px] "
                            onClick={() => {
                                if (
                                    profession !== 'General Practitioner' &&
                                    modalHeader &&
                                    modalTopics
                                ) {
                                    setModalHeader(modalHeader);
                                    setModalContent(modalTopics);
                                    setToggleModal(true);
                                } else
                                    window.open(
                                        'https://www.healthdirect.gov.au/the-role-of-a-gp'
                                    );
                            }}
                        >
                            {greenButtonLabel}
                        </button>
                        <button
                            className="bg-primaryBlue !leading-[1] shadow-[2px_6px_5px_0px_rgba(194,194,194,0.75)] w-full min-h-[70px] text-white font-omnes mt-10 mb-2 drop-shadow-lg flex flex-row text-left place-items-center justify-between hover:underline py-2 px-4"
                            onClick={() => {
                                navigatePathwayMode(
                                    profession,
                                    setProfessionalPathway,
                                    setPath,
                                    'https://www.hotdoc.com.au/'
                                );
                            }}
                        >
                            {blueButtonLabel}
                            <FontAwesomeIcon
                                className="text-lg pl-5 mr-4"
                                icon={faArrowRight}
                            />
                        </button>
                    </div>
                )}
            </div>
            <hr className={`border-primaryBlueDark lg:hidden mx-10 my-0`} />
        </>
    );
}

export default InfoCardAccordion;
