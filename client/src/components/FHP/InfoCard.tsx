import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import {
    LinksListModal,
    TabsModal,
    UncategorizedBulletsModal,
    CategorizedBulletsModal,
} from './types/Modals';
import InfoCardAccordion from './InfoCardAccordion';
import { PathwayContext } from '../../utils/Contexts';
import { ReactComponent as Arrow } from '../../assets/images/icons/svg/right_arrow_svgrepo_com.svg';

export interface InfoCardInterface {
    profession: string;
    description: string;
    index: number;
    greenButtonLabel: string;
    blueButtonLabel: string;
    modalHeader?: string;
    modalTopics?: UncategorizedBulletsModal | CategorizedBulletsModal;
    redirectingPathway?: string;
    setToggleModal(toggle: boolean): void;
    setModalContent(
        modalType:
            | LinksListModal
            | TabsModal
            | UncategorizedBulletsModal
            | CategorizedBulletsModal
    ): void;
    setModalHeader(header: string): void;
    setProfessionalPathway(professionalPathway: string): void;
}

/**
 * This function converts selected json text into bold text given that it
 * starts with **
 * @param input string input
 * @returns p tag styling of regular and bold text
 */
export function createBoldText(input: string) {
    const splitString = input.split('**');
    return splitString.length === 2 ? (
        <span className="whitespace-pre-line">
            {splitString[0]}
            <br></br>
            <span className="font-bold">{splitString[1]} </span>
        </span>
    ) : (
        <span className="whitespace-pre-line">{splitString[0]}</span>
    );
}

/**
 * This function allocates the correct pathway when the user selects the
 * blue "find your local..." button
 * @param mode the profession selected
 */
export function navigatePathwayMode(
    selectedProfession: string,
    setProfessionalPathway: (professionalPathway: string) => void,
    setPath: (path: string) => void,
    link?: string
) {
    switch (selectedProfession) {
        case 'General Practitioner':
            return window.open(link);
        case 'Maternal, Child and Family Health Nurse':
            setProfessionalPathway('MCHN');
            break;
        case 'Allied Health Professional':
            setProfessionalPathway('AHP');
            break;
    }
    setPath('australia');
}

function InfoCard(props: InfoCardInterface) {
    const {
        profession,
        description,
        index,
        greenButtonLabel,
        blueButtonLabel,
        modalHeader,
        modalTopics,
        setModalHeader,
        setModalContent,
        setToggleModal,
        setProfessionalPathway,
    } = props;

    /** This handles the accordion for mobile */
    const [toggleAccordion, setToggleAccordion] = useState<boolean>(false);
    const { setPath } = useContext(PathwayContext);

    return (
        <div
            id="info-card-container"
            className={`${
                index % 2 === 0 ? `lg:bg-lightGrey xs:bg-white` : `bg-white`
            } text-primaryBlueDark pt-4 lg:px-1 md:px-0 lg:pb-36`}
        >
            <h5
                id="info-card-title"
                className="font-bold font-omnes flex justify-between mymd:px-10 lg:px-5 xl:px-10 max-mymd:px-10 lg:mb-3 lg:text-2xl lg:h-[100px]"
                onClick={() => {
                    setToggleAccordion(!toggleAccordion);
                }}
            >
                {profession}
                <span
                    id="accordion-toggle-info-icon"
                    className="lg:hidden ml-4 flex items-center"
                >
                    {toggleAccordion ? (
                        <FontAwesomeIcon icon={faChevronUp} />
                    ) : (
                        <FontAwesomeIcon icon={faChevronDown} />
                    )}
                </span>
            </h5>
            <hr
                id="info-card-divider"
                className="border-primaryBlueDark lg:hidden mx-10 mb-0"
            />
            <div
                id="info-card-description-container"
                className="hidden lg:block xl:px-10 lg:px-5 h-full"
            >
                <div className="h-3/5">
                    <p
                        id="info-card-description"
                        className="font-forma"
                    >
                        {createBoldText(description)}
                    </p>
                </div>
                <div>
                    <button
                        id={
                            'info-card-description-button-topics-' +
                            profession
                                .replace(/\s/g, '-')
                                .replace(',', '')
                                .toLowerCase()
                        }
                        className="bg-secondaryGreen hover:bg-tertiaryGreen text-white font-omnes
                    font-thin w-full text-left py-3 px-4 h-[100px] text-sm 2xl:text-base"
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
                        id={
                            'info-card-description-button-pathway-' +
                            profession.replace(/\s/g, '-').toLowerCase()
                        }
                        className="bg-primaryBlue hover:bg-primaryBlueDark text-white font-omnes 
                    py-4 pl-7 pr-5 w-full mt-10 flex flex-row text-left place-items-center justify-between h-[100px] text-sm 2xl:text-base"
                        onClick={() => {
                            navigatePathwayMode(
                                profession,
                                setProfessionalPathway,
                                setPath,
                                'https://www.hotdoc.com.au/'
                            );
                        }}
                    >
                        <span className="font-omnes text-sm 2xl:text-base w-10/12">
                            {blueButtonLabel}
                        </span>
                        <Arrow
                            fill="white"
                            width="2em"
                        />
                    </button>
                </div>
            </div>
            <div id="info-card-mobile">
                <InfoCardAccordion
                    setProfessionalPathway={setProfessionalPathway}
                    toggleAccordion={toggleAccordion}
                    modalHeader={modalHeader}
                    description={description}
                    modalTopics={modalTopics}
                    index={index}
                    profession={profession}
                    greenButtonLabel={greenButtonLabel}
                    blueButtonLabel={blueButtonLabel}
                    setModalHeader={setModalHeader}
                    setModalContent={setModalContent}
                    setToggleModal={setToggleModal}
                    navigatePathwayMode={navigatePathwayMode}
                />
            </div>
        </div>
    );
}
export default InfoCard;
