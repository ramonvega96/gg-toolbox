import NavigationButtons from './NavigationButtons';
import { useContext, useState } from 'react';
import MultiPurposeModal from './modals/MultiPurposeModal';
import {
    LinksListModal,
    TabsModal,
    UncategorizedBulletsModal,
    CategorizedBulletsModal,
} from './types/Modals';
import { PathwayContext } from '../../utils/Contexts';
import { useIntl } from 'react-intl';
import InfoCard from './InfoCard';

interface InformationInterface {
    setProfessionalPathway(professionalPathway: string): void;
}
/**
 * This component renders the second page the user sees for the FHP page
 * This should show a generic discription of three main health care providers (HCP):
 * General Practitioner, Maternal & Child Health Nurse & Allied Health Professional.
 * @param mode refers to the selected health care provider the user selects
 * @returns a page of information relating to three main HCP
 */
function Information(props: InformationInterface) {
    const messages = useIntl();
    const { setProfessionalPathway } = props;
    const { setPath } = useContext(PathwayContext);
    const [toggleModal, setToggleModal] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<
        | LinksListModal
        | TabsModal
        | UncategorizedBulletsModal
        | CategorizedBulletsModal
    >();
    const [modalHeader, setModalHeader] = useState<string>('');

    const healthcareLinks: Record<string, string> = {
        healthcare1Link1: 'https://www.naccho.org.au/naccho-map/',
        healthcare3Link1: 'https://www.servicesaustralia.gov.au/medicare',
        healthcare2Link1:
            'https://www.servicesaustralia.gov.au/health-care-card',
        healthcare4Link1:
            'https://www.ndis.gov.au/applying-access-ndis/am-i-eligible',
    };

    /**
     * This file handles the internationalisation of an array of strings for the
     * topics to talk about modal pop up in the information page (FHP) for
     * each profession (MCHN, GP & AHP)
     */
    const MCHNPopup = {
        categories: [...Array(5)].map((elem, index) => {
            const categoryArr = messages
                .formatMessage({ id: `MCHNCat${index + 1}` })
                .split('(*)');
            return {
                categoryName: categoryArr[0],
                topics: categoryArr.slice(1, categoryArr.length),
            };
        }),
    };

    const AHPPopup = {
        bullets: [...Array(8)].map((elem, index) => {
            return `AHPPoint_${index + 1}`;
        }),
    };

    const HCHeaders = [...Array(4)].map((elem, index) => {
        return { header: `healthcare${index + 1}Header` };
    });

    const HCDescriptions = [...Array(4)].map((elem, index) => {
        return (
            <div className="text-black">
                {Object.keys(messages.messages)
                    .filter((val) => {
                        return val.includes(`healthcare${index + 1}`);
                    })
                    .map((val) => {
                        if (val.includes('Content')) {
                            return (
                                <span
                                    className="font-normal"
                                    key={val}
                                >
                                    {messages.formatMessage({
                                        id: val,
                                    })}
                                </span>
                            );
                        } else if (val.includes('Link')) {
                            return (
                                <span key={val}>
                                    <a
                                        className="text-black font-normal underline"
                                        href={healthcareLinks[val]}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {messages.formatMessage({
                                            id: val,
                                        })}
                                    </a>
                                </span>
                            );
                        } else if (val.includes('Dotset')) {
                            return (
                                <ul
                                    className="list-disc pl-8"
                                    key={val}
                                >
                                    {messages
                                        .formatMessage({
                                            id: val,
                                        })
                                        .split('(*)')
                                        .map((li, index) => {
                                            return (
                                                index > 0 && (
                                                    <li
                                                        className="font-normal"
                                                        key={val + (index + 1)}
                                                    >
                                                        {li}
                                                    </li>
                                                )
                                            );
                                        })}
                                </ul>
                            );
                        }
                        return '';
                    })}
            </div>
        );
    });

    return (
        <>
            <div className="flex flex-col">
                <NavigationButtons
                    setPath={setPath}
                    path="firstPage"
                />
                <div
                    id="info-header-container"
                    className="bg-primaryBlueDark px-12 lg:px-3 "
                >
                    <div
                        id="info-header-text"
                        className="pt-20 w-full md:w-10/12 lg:px-32 pb-4"
                    >
                        <h1 className="pb-8 text-3xl md:text-4xl lg:text-5xl font-omnes">
                            {messages.formatMessage({
                                id: 'FHPTool',
                            })}
                        </h1>
                        <p className="pb-4 w-full md:w-5/6 lg:w-3/5">
                            {messages.formatMessage({
                                id: 'FHPTrickyParagraph',
                            })}
                        </p>
                        <button
                            id="how-does-healthcare-wrk-btn"
                            className="bg-secondaryGreen hover:bg-tertiaryGreen !leading-[1] text-lg font-omnes font-thin p-3 mb-8 text-left w-full md:w-2/4 lg:w-1/3 lg:h-20 rounded-none md:min-w-[400px]"
                            onClick={() => {
                                setToggleModal(!toggleModal);
                                setModalHeader(
                                    messages.formatMessage({
                                        id: 'healthcareTitle',
                                    })
                                );
                                setModalContent({
                                    description: messages.formatMessage({
                                        id: 'inAustralia',
                                    }),
                                    tabHeaders: HCHeaders.map((elem) => {
                                        return messages.formatMessage({
                                            id: elem.header,
                                        });
                                    }),
                                    tabContents: HCDescriptions.map((elem) => {
                                        return elem;
                                    }),
                                });
                            }}
                        >
                            {messages.formatMessage({
                                id: 'typesOfHealthcareBtn',
                            })}
                        </button>
                    </div>
                </div>
                <div
                    id="info-card-container"
                    className="flex grid grid-cols-1 lg:grid-cols-3 bg-white border-y-8 border-y-secondaryOrange lg:px-32 pb-12 lg:pb-0"
                >
                    <InfoCard
                        profession={messages.formatMessage({
                            id: 'MCHNProfession',
                        })}
                        modalHeader={messages.formatMessage({
                            id: 'MCHNTitle',
                        })}
                        description={messages.formatMessage({
                            id: 'MCHNDescription',
                        })}
                        greenButtonLabel={messages.formatMessage({
                            id: 'MCHNGreenButton',
                        })}
                        blueButtonLabel={messages.formatMessage({
                            id: 'MCHNBlueButton',
                        })}
                        modalTopics={MCHNPopup}
                        index={1}
                        setToggleModal={setToggleModal}
                        setModalContent={setModalContent}
                        setModalHeader={setModalHeader}
                        setProfessionalPathway={setProfessionalPathway}
                    />
                    <InfoCard
                        profession={messages.formatMessage({
                            id: 'GPProfession',
                        })}
                        description={messages.formatMessage({
                            id: 'GPDescription',
                        })}
                        greenButtonLabel={messages.formatMessage({
                            id: 'GPGreenButton',
                        })}
                        blueButtonLabel={messages.formatMessage({
                            id: 'GPBlueButton',
                        })}
                        index={2}
                        setToggleModal={setToggleModal}
                        setModalContent={setModalContent}
                        setModalHeader={setModalHeader}
                        setProfessionalPathway={setProfessionalPathway}
                    />
                    <InfoCard
                        profession={messages.formatMessage({
                            id: 'AHPProfession',
                        })}
                        modalHeader={messages.formatMessage({
                            id: 'AHPTitle',
                        })}
                        description={messages.formatMessage({
                            id: 'AHPDescription',
                        })}
                        greenButtonLabel={messages.formatMessage({
                            id: 'AHPGreenButton',
                        })}
                        blueButtonLabel={messages.formatMessage({
                            id: 'AHPBlueButton',
                        })}
                        modalTopics={AHPPopup}
                        index={3}
                        setToggleModal={setToggleModal}
                        setModalContent={setModalContent}
                        setModalHeader={setModalHeader}
                        setProfessionalPathway={setProfessionalPathway}
                    />
                </div>
            </div>
            {toggleModal && modalContent && (
                <MultiPurposeModal
                    toggleModal={setToggleModal}
                    modalHeader={modalHeader}
                    modalContent={modalContent}
                />
            )}
        </>
    );
}
export default Information;
