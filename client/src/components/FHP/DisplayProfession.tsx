import { useContext, useEffect, useState } from 'react';
import { getHealthProfessionalInfoByState } from '../../utils/NetworkCalls';
import { HealthProfessional, Service } from './types/HealthProfessional';
import { LinksListModal } from './types/Modals';
import NavigationButtons from './NavigationButtons';
import MultiPurposeModal from './modals/MultiPurposeModal';
import { PathwayContext } from '../../utils/Contexts';
import Footer from '../home/Footer';
import ButtonsModal from './modals/ButtonsModal';
import { useIntl } from 'react-intl';
import { renderProfessionsAccordion } from './Suggested';
import { ILink } from './types/Modals';

interface DisplayProfessionProps {
    profession: string;
    state: string;
    professional?: HealthProfessional;
}

function DisplayProfession(props: DisplayProfessionProps) {
    const { profession, state, professional } = props;
    const { setPath } = useContext(PathwayContext);

    const [togglePublicServiceModal, setTogglePublicServiceModal] =
        useState<boolean>(false);
    const [toggleCommunityServiceModal, setToggleCommunityServiceModal] =
        useState<boolean>(false);
    const [selectedProfession, setSelectedProfession] =
        useState<HealthProfessional>();
    const [selectedProfessions, setSelectedProfessions] = useState<
        HealthProfessional[]
    >([]);
    const [isNested, setIsNested] = useState<boolean>(true);

    const messages = useIntl();

    useEffect(() => {
        const getSelectedProfessional = async () => {
            if (profession && !professional) {
                setIsNested(false);
                const res = await getHealthProfessionalInfoByState(
                    state,
                    profession
                );
                if (res.payload.length === 1) {
                    setSelectedProfession(res.payload[0] as HealthProfessional);
                } else if (res.payload.length > 1) {
                    setSelectedProfessions(res.payload);
                }
            } else if (professional) {
                setIsNested(true);
                setSelectedProfession(professional);
            }
        };
        getSelectedProfessional();
        // Useeffect to run component setup
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function createBulletPointsForPublicServices(
        profession?: string,
        input?: string
    ) {
        if (input) {
            const list =
                profession !== 'maternal, child and family health nurse'
                    ? input.split('- ')
                    : input.split('* ');
            return (
                <div>
                    {list[0]}
                    <ul className="pt-2">
                        {list.slice(1).map((point, index) => {
                            return (
                                <li
                                    className="font-forma list-disc px-2"
                                    key={index}
                                >
                                    {point}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }
    }

    function renderPublicServicesModal() {
        const paediatricProfessions = [
            'dietitian',
            'physiotherapist',
            'occupational therapist',
            'speech pathologist',
        ];
        const modal =
            selectedProfession &&
            selectedProfession.publicService &&
            Array.isArray(selectedProfession.publicService) ? (
                <MultiPurposeModal
                    toggleModal={setTogglePublicServiceModal}
                    modalHeader={`${
                        profession.toLowerCase().includes('psychologist')
                            ? `Psychologists in public hospitals are usually only for
                            ${
                                profession.toLowerCase().includes('paediatric')
                                    ? 'children'
                                    : 'those'
                            } who
                            are very mentally unwell, have experienced trauma or are
                            in crisis situations. It is recommended to
                            speak to your GP first to find a psychology service
                            that is suitable for your child. The following public
                            hospitals may have psychologists:`
                            : `${
                                  profession.toLowerCase() ===
                                  'lactation consultant'
                                      ? 'To see a lactation consultant in a public service, first contact the hospital where you had your baby. Alternatively, you'
                                      : 'You'
                              } may be able to see a ${
                                  paediatricProfessions.includes(
                                      profession.toLowerCase()
                                  )
                                      ? 'paediatric '
                                      : ''
                              }
                                ${profession.toLowerCase()} at the following public hospitals:`
                    }`}
                    modalFooter={messages.formatMessage({
                        id: 'publicServicesModalFooter',
                    })}
                    modalContent={
                        {
                            services: selectedProfession.publicService,
                        } as LinksListModal
                    }
                />
            ) : selectedProfession && selectedProfession.publicService ? (
                <ButtonsModal
                    toggleModal={setTogglePublicServiceModal}
                    description={
                        (selectedProfession.publicService as Service)
                            .description
                    }
                    buttons={
                        (selectedProfession.publicService as Service).links
                    }
                />
            ) : (
                ''
            );

        return modal;
    }

    function renderCommunityServicesModal() {
        return (
            <ButtonsModal
                toggleModal={setToggleCommunityServiceModal}
                description={selectedProfession?.communityService?.description}
                buttons={selectedProfession?.communityService?.links}
            />
        );
    }

    function getProfessionDashed() {
        return selectedProfession
            ? selectedProfession.profession
                  .toLowerCase()
                  .replace(/,/g, '')
                  .replace(/\s+/g, '-')
            : '';
    }

    return (
        <>
            <div className="flex flex-col justify-between w-full">
                <div>
                    {!isNested && (
                        <NavigationButtons
                            setPath={setPath}
                            path="needHelp"
                        />
                    )}
                    {selectedProfession && (
                        <div id="profession-display-component">
                            <div
                                id={`display-profession-${getProfessionDashed()}`}
                                className={` pb-8 ${
                                    !isNested
                                        ? 'pt-24 mb-16 max-md:ml-10 max-md:w-10/12 md:ml-28 lg:ml-36 2xl:ml-64'
                                        : ''
                                }`}
                            >
                                {!isNested && (
                                    <h1
                                        className="pb-8 font-omnes"
                                        id={`profession-title-${getProfessionDashed()}`}
                                    >
                                        {profession}
                                    </h1>
                                )}
                                <div
                                    id={`profession-description-${getProfessionDashed()}`}
                                    className="whitespace-pre-line mb-12 md:w-10/12"
                                >
                                    {createBulletPointsForPublicServices(
                                        selectedProfession.profession,
                                        selectedProfession.description
                                    )}
                                </div>
                                <div
                                    id="public-private-button-container"
                                    className="flex flex-row gap-4 justify-left mt-8 w-3/5 min-w-[300px] max-w-[600px]"
                                >
                                    {selectedProfession &&
                                        selectedProfession.publicService &&
                                        (selectedProfession.publicService
                                            .description ||
                                            (
                                                selectedProfession.publicService as ILink[]
                                            ).length > 0) && (
                                            <button
                                                id="public-btn"
                                                className="font-omnes bg-white !leading-1 hover:!bg-lightGrey text-primaryBlueDark w-1/3 xs:p-2 xs:text-sm md:text-[1rem] h-20 rounded-none"
                                                onClick={() => {
                                                    setTogglePublicServiceModal(
                                                        !togglePublicServiceModal
                                                    );
                                                }}
                                            >
                                                {messages.formatMessage({
                                                    id:
                                                        selectedProfession.profession ===
                                                        'dentist'
                                                            ? 'dentalServiceBtn'
                                                            : selectedProfession.state ===
                                                              'act'
                                                            ? 'publicServiceBtn'
                                                            : 'publicHospitalsBtn',
                                                })}
                                            </button>
                                        )}
                                    {selectedProfession &&
                                        selectedProfession.privateService && (
                                            <button
                                                id="private-btn"
                                                className="font-omnes bg-white !leading-1 hover:!bg-lightGrey text-primaryBlueDark w-1/3 xs:p-2 xs:text-sm md:text-[1rem] h-20 rounded-none"
                                                onClick={() => {
                                                    window.open(
                                                        selectedProfession.privateService,
                                                        '_blank'
                                                    );
                                                }}
                                            >
                                                {messages.formatMessage({
                                                    id: 'privateServiceBtn',
                                                })}
                                            </button>
                                        )}
                                    {selectedProfession &&
                                        selectedProfession.communityService && (
                                            <button
                                                id="community-services-btn"
                                                className="font-omnes bg-white !leading-1 hover:!bg-lightGrey text-primaryBlueDark w-1/3 xs:p-2 xs:text-sm md:text-[1rem] h-20 rounded-none"
                                                onClick={() => {
                                                    setToggleCommunityServiceModal(
                                                        true
                                                    );
                                                }}
                                            >
                                                {messages.formatMessage({
                                                    id: 'communityServiceBtn',
                                                })}
                                            </button>
                                        )}
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedProfessions.length > 1 && (
                        <div id="profession-display-component">
                            <div
                                className="w-full"
                                id="related-professions-accordion"
                            >
                                <div
                                    id="header-title-button-container"
                                    className="w-full xs:w-10/12 max-sm:ml-10 max-lg:ml-20 md:mt-20 sm:ml-14 lg:ml-40 mt-10"
                                >
                                    <h1 className="py-10 font-omnes text-5xl max-sm:text-2xl">
                                        {messages.formatMessage({
                                            id: 'relatedProfessionals',
                                        })}
                                    </h1>
                                    <div className="w-full text-xl mb-24">
                                        {renderProfessionsAccordion(
                                            selectedProfessions
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {togglePublicServiceModal && renderPublicServicesModal()}
                    {toggleCommunityServiceModal &&
                        renderCommunityServicesModal()}
                </div>
                {!isNested && (
                    <div className="flex mt-auto">
                        <Footer
                            pageAnalitycsId="fhp-display-specific-professional-page"
                            feedbackOnly={true}
                            noNoodle={true}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default DisplayProfession;
