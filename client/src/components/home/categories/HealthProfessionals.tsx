import { useIntl } from 'react-intl';
import TopicGrid from '../../TopicGrid';
import WelcomeComponent from '../../WelcomeComponent';
import PageTopics from '../../../assets/json/landingPageTopics.json';
import SplitSection from '../SplitSection';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../../assets/images/icons/svg/right_arrow_svgrepo_com.svg';
import TitleAndRouteButton from '../../TitleAndRouteButton';
import ButtonsBannerComponent from '../../ButtonsBannerComponent';
import ggtPhi1 from '../../../assets/images/graphics/ggtPhi_1.png';
import ggtPhi2 from '../../../assets/images/graphics/ggtPhi_2.png';
import ggtPhi3 from '../../../assets/images/graphics/ggtPhi_3.png';
import ggtPhi4 from '../../../assets/images/graphics/ggtPhi_4.png';
import ggtPhi5 from '../../../assets/images/graphics/ggtPhi_5.png';
import ggtPhi6 from '../../../assets/images/graphics/ggtPhi_6.png';
import ggtPhi7 from '../../../assets/images/graphics/ggtPhi_7.png';

function HealthProfessionals() {
    const messages = useIntl();
    const navigate = useNavigate();
    const borderColor = 'secondaryYellow';

    const philosophySection = (image: string, title: string, body: string) => (
        <div
            id={`${title}-section`}
            className="flex xs:flex-col md:flex-row gap-x-8 justify-center items-center py-2"
        >
            <div className="flex w-1/4 justify-center xs:mb-4">
                <img
                    className="xs:w-full md:w-3/4"
                    src={image}
                    alt={`${title} section icon`}
                />
            </div>
            <div className="w-3/4">
                <p className="font-forma font-bold xs:text-lg md:text-xl text-primaryBlueDark m-0">
                    {messages.formatMessage({
                        id: title,
                    })}
                </p>
                <p className="font-forma xs:text-base md:text-lg text-primaryBlueDark">
                    {messages.formatMessage({
                        id: body,
                    })}
                </p>
            </div>
        </div>
    );

    const aboutTheArtwork: React.ReactNode = (
        <div className="xs:px-4 md:px-12">
            {philosophySection(ggtPhi1, 'vision', 'visionText')}
            {philosophySection(ggtPhi2, 'aboutGGT', 'aboutGGTText')}
            {philosophySection(ggtPhi3, 'funding', 'fundingText')}
            {philosophySection(ggtPhi4, 'rationale', 'rationaleText')}
            {philosophySection(ggtPhi5, 'listening', 'listeningText')}
            {philosophySection(ggtPhi6, 'quality', 'qualityText')}
            {philosophySection(ggtPhi7, 'maintaining', 'maintainingText')}
        </div>
    );

    return (
        <div>
            <WelcomeComponent
                title={messages.formatMessage({
                    id: 'homeHealthProfessionalsTitle',
                })}
                description={messages.formatMessage({
                    id: 'homeHealthProfessionalsDescription',
                })}
                panel="https://stluc.manta.uqcloud.net/elipse/public/gogrow/welcomeComponentImages/health_professionals.jpg"
                panelAlt="Health professional with parent and kid"
                icon="health_professional.svg"
                borderColor={borderColor}
                search={true}
                modalContent={aboutTheArtwork}
                modalHeader={messages.formatMessage({
                    id: 'ggPhilosophy',
                })}
                modalBtnText={messages.formatMessage({
                    id: 'readThePhilosophy',
                })}
            />
            <TitleAndRouteButton
                title={messages.formatMessage({
                    id: 'ECECResourcesForFamiliesTitle',
                })}
                buttonTitle={messages.formatMessage({
                    id: 'goToParentsAndFamilies',
                })}
                route="/?pathway=parents-and-families"
                backgroundColor="white"
                buttonColor="primaryBlue"
                textColor="primaryBlueDark"
            />
            <TopicGrid
                color="opaqueYellow"
                terms={PageTopics.health_professionals}
                title={messages.formatMessage({
                    id: 'helpHealthProfessionalsTitle',
                })}
                centered={true}
            />
            <TitleAndRouteButton
                title={messages.formatMessage({
                    id: 'ECECResourcesProfessionalDev',
                })}
                buttonTitle={messages.formatMessage({
                    id: 'ECECResourcesProfessionalDevBtn',
                })}
                route="/search?h=true&audiences=Health+Professionals&resourceTypes=Professional+Development+Courses"
                backgroundColor="white"
                buttonColor="primaryGreen"
                textColor="primaryBlueDark"
                borderBottom={borderColor}
            />
            <ButtonsBannerComponent
                title={messages.formatMessage({
                    id: 'buildAndShare',
                })}
                description={messages.formatMessage({
                    id: 'useTheLinks',
                })}
                borderColor={borderColor}
                topButton={
                    <button
                        id="welcome-upload-resource"
                        className="bg-secondaryGreen mt-8 p-6 flex justify-between text-left w-full items-center mymd:top-80 top-60 hover:bg-tertiaryGreen"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setTimeout(() => {
                                navigate('/upload-a-resource');
                            }, 200);
                        }}
                    >
                        <span
                            style={{
                                fontFamily:
                                    'forma-djr-DisplayProfession, sans-serif',
                            }}
                            className="max-lg:text-base xl:text-xl font-thin mr-4"
                        >
                            {messages.formatMessage({
                                id: 'shareResource',
                            })}
                        </span>
                        <Arrow
                            fill="white"
                            width="2em"
                        />
                    </button>
                }
                bottomButton={
                    <button
                        id="welcome-build-resource"
                        className="bg-secondaryGreen mt-8 bottom-5 items-center p-6 flex justify-between text-left  mymd:top-80 top-60 w-full hover:bg-tertiaryGreen"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setTimeout(() => {
                                navigate('/personalise-a-resource');
                            }, 200);
                        }}
                    >
                        <span
                            style={{
                                fontFamily:
                                    'forma-djr-DisplayProfession, sans-serif',
                            }}
                            className="max-lg:text-base xl:text-xl font-thin mr-4"
                        >
                            {messages.formatMessage({
                                id: 'personaliseResource',
                            })}
                        </span>
                        <Arrow
                            fill="white"
                            width="2em"
                        />
                    </button>
                }
                panel="https://stluc.manta.uqcloud.net/elipse/public/gogrow/welcomeComponentImages/customise_and_share.jpg"
                panelAlt="Health professional with kid"
            />
            <SplitSection
                fcBgColor={'secondaryGreen'}
                fcTitle={messages.formatMessage({ id: 'resourceCategories' })}
                fcText={messages.formatMessage({
                    id: 'whatCanHelpDescription',
                })}
                fcBtnText={messages.formatMessage({ id: 'FHPWhatButton' })}
                fcBtnPath={'/browse'}
                scBgColor={'tertiaryGreen'}
                scTitle={messages.formatMessage({ id: 'FHP' })}
                scText={messages.formatMessage({ id: 'whoCanHelpDescription' })}
                scBtnText={messages.formatMessage({ id: 'FHPWhoButton' })}
                scBtnPath={'/find-a-health-professional'}
                borderColor={borderColor}
            />
        </div>
    );
}
export default HealthProfessionals;
