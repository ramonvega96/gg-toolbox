import { useIntl } from 'react-intl';
import TopicGrid from '../../TopicGrid';
import WelcomeComponent from '../../WelcomeComponent';
import PageTopics from '../../../assets/json/landingPageTopics.json';
import SplitSection from '../SplitSection';
import { ReactComponent as Arrow } from '../../../assets/images/icons/svg/right_arrow_svgrepo_com.svg';
import { useNavigate } from 'react-router-dom';
import ECECHomeMapComponent from '../../ECECHomeMapComponent';
import ButtonsBannerComponent from '../../ButtonsBannerComponent';
import TitleAndRouteButton from '../../TitleAndRouteButton';

function EarlyChildhoodEducation() {
    const messages = useIntl();
    const navigate = useNavigate();
    const borderColor = 'secondaryGreen';

    return (
        <div>
            <WelcomeComponent
                title={messages.formatMessage({ id: 'homeECECTitle' })}
                description={messages.formatMessage({
                    id: 'homeECECDescription',
                })}
                panel="https://stluc.manta.uqcloud.net/elipse/public/gogrow/welcomeComponentImages/ECEC.jpg"
                panelAlt="Kids in the playground"
                icon="ECEC.svg"
                borderColor={borderColor}
                search={true}
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
            <ECECHomeMapComponent />
            <TopicGrid
                color="white"
                terms={PageTopics.ecec_1}
                title={messages.formatMessage({
                    id: 'ECECResourcesForYouTitle',
                })}
                bottomBorderColor={borderColor}
                centered={false}
            />
            <ButtonsBannerComponent
                title={messages.formatMessage({ id: 'PDModulesTitle' })}
                description={messages.formatMessage({
                    id: 'PDModulesDescription',
                })}
                topButton={
                    <button
                        id="go-to-pd-podcast"
                        className="bg-secondaryGreen mt-8 bottom-5 items-center p-6 flex justify-between text-left mymd:top-80 top-60 w-full hover:bg-tertiaryGreen"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setTimeout(() => {
                                navigate('/G&G-podcast');
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
                            {messages.formatMessage({ id: 'PDModulesBtn' })}
                        </span>
                        <Arrow
                            fill="white"
                            width="2em"
                        />
                    </button>
                }
                panel="https://stluc.manta.uqcloud.net/elipse/public/gogrow/welcomeComponentImages/ECEC_module.jpg"
                panelAlt="Kids playing with educator"
                borderColor={borderColor}
            />
            <TitleAndRouteButton
                title={messages.formatMessage({
                    id: 'professionalDevOp',
                })}
                buttonTitle={messages.formatMessage({
                    id: 'professionalDevForECEC',
                })}
                route="/search?h=true&audiences=Education+Professionals&resourceTypes=Professional+Development+Courses"
                backgroundColor="white"
                buttonColor="primaryGreen"
                textColor="primaryBlueDark"
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
            />
        </div>
    );
}
export default EarlyChildhoodEducation;
