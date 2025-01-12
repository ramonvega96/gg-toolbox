import React, { useContext, useEffect, useState } from 'react';
import NavigationButtons from './NavigationButtons';
import { PathwayContext } from '../../utils/Contexts';
import {
    getHealthProfessionalByTag,
    getResourcesByTag,
} from '../../utils/NetworkCalls';
import { HealthProfessional } from './types/HealthProfessional';
import { Resource } from '../resourceCard/types/Resource';
import { convertPayloadToResourceList } from '../../utils/GeneralFunctions';
import Accordion from './Accordion';
import { useIntl } from 'react-intl';
import Footer from '../home/Footer';
import ResourceSlider from './ResourceSlider';
import MultiPurposeModal from './modals/MultiPurposeModal';

interface SuggestedInterface {
    state: string;
    tag: string;
}

export function renderProfessionsAccordion(
    professionals: HealthProfessional[]
) {
    return professionals.map((professional, index) => {
        return (
            <Accordion
                professional={professional}
                key={index}
            />
        );
    });
}

/**
 * Renders the I need help with... section
 * @param props setPath: the previous page, setTopic: the users selection
 * @returns
 */
function Suggested(props: SuggestedInterface) {
    const messages = useIntl();
    const { state, tag } = props;
    const { setPath } = useContext(PathwayContext);
    const [professions, setProfessions] = useState<HealthProfessional[]>();
    const [resources, setResources] = useState<Resource[]>([]);
    const [toggleModal, setToggleModal] = useState<boolean>(false);

    useEffect(() => {
        const getProfessionals = async () => {
            const res = await getHealthProfessionalByTag(state, tag);
            res && setProfessions(res.payload || []);
        };

        const tagArray: string[] = [tag.toLowerCase()];
        const getResources = async () => {
            const resJSON = await getResourcesByTag(tagArray, 1, {});

            if (resJSON.success && resJSON.payload.resources.length !== 0) {
                const response = resJSON.payload.resources;
                if (response !== undefined && response !== '') {
                    setResources(convertPayloadToResourceList(response));
                }
            }
        };

        getResources();
        getProfessionals();
        // Useeffect to run component setup
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {toggleModal && (
                <MultiPurposeModal
                    toggleModal={setToggleModal}
                    modalHeader={messages.formatMessage({
                        id: 'ahpTipsModalHeader',
                    })}
                    modalContent={{
                        bullets: messages
                            .formatMessage({
                                id: 'ahpTipsList',
                            })
                            .split('#'),
                    }}
                />
            )}
            <div
                id="suggested-container"
                className="flex flex-col h-full w-full justify-between"
            >
                <div>
                    <NavigationButtons
                        setPath={setPath}
                        path="needHelp"
                    />
                    <div className="w-full justify-center">
                        <div>
                            <div
                                id="header-title-button-container"
                                className="w-full xs:w-10/12 max-sm:ml-10 max-lg:ml-20 md:mt-20 sm:ml-14 lg:ml-40 mt-10"
                            >
                                <h1 className="py-10 font-omnes text-5xl max-sm:text-2xl">
                                    {messages.formatMessage({
                                        id: 'relatedProfessionals',
                                    })}
                                </h1>
                                <button
                                    id="tips-modal-btn"
                                    className="bg-secondaryGreen hover:bg-tertiaryGreen text-lg font-omnes font-thin p-3 mb-8 text-left w-full md:w-2/4 lg:w-1/3 lg:h-20 rounded-none md:min-w-[400px]"
                                    onClick={() => {
                                        setToggleModal(true);
                                    }}
                                >
                                    {messages.formatMessage({
                                        id: 'ahpTips',
                                    })}
                                </button>
                                {professions && (
                                    <div
                                        id="accordion"
                                        className="w-full text-xl mb-24"
                                    >
                                        {/* maps out all suggested professions into an accordion */}
                                        {renderProfessionsAccordion(
                                            professions
                                        )}
                                    </div>
                                )}
                            </div>
                            <div
                                id="mobile-resource-slider"
                                className="max-md:block md:hidden xl:hidden"
                            >
                                <ResourceSlider
                                    resources={resources}
                                    breakpoint="sm"
                                />
                            </div>
                            <div
                                id="tablet-resource-slider"
                                className="max-md:hidden md:block xl:hidden"
                            >
                                <ResourceSlider
                                    resources={resources}
                                    breakpoint="md"
                                />
                            </div>
                            <div
                                id="laptop-resource-slider"
                                className="max-md:hidden md:hidden xl:block"
                            >
                                <ResourceSlider
                                    resources={resources}
                                    breakpoint="xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer
                    pageAnalitycsId="fhp-display-suggested-professionals-page"
                    feedbackOnly={true}
                    noNoodle={true}
                />
            </div>
        </>
    );
}

export default Suggested;
