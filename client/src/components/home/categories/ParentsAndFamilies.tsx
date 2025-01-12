import { useIntl } from 'react-intl';
import TopicGrid from '../../TopicGrid';
import WelcomeComponent from '../../WelcomeComponent';
import PageTopics from '../../../assets/json/landingPageTopics.json';
import SplitSection from '../SplitSection';
import TitleAndRouteButton from '../../TitleAndRouteButton';

function ParentsAndFamilies() {
    const messages = useIntl();
    const borderColor = 'secondaryRed';

    return (
        <div>
            <WelcomeComponent
                title={messages.formatMessage({
                    id: 'homeparentsAndFamiliesTitle',
                })}
                description={messages.formatMessage({
                    id: 'homeparentsAndFamiliesDescription',
                })}
                panel="https://stluc.manta.uqcloud.net/elipse/public/gogrow/welcomeComponentImages/parents_and_carers.jpg"
                panelAlt="Kid and mom cooking"
                icon="parents.svg"
                borderColor={borderColor}
                search={true}
            />
            <TitleAndRouteButton
                title={messages.formatMessage({
                    id: 'checkPodsquad',
                })}
                text={messages.formatMessage({
                    id: 'podsquadDesc',
                })}
                buttonTitle={messages.formatMessage({
                    id: 'visitPodsquad',
                })}
                externalLink="https://www.playpodsquad.com.au/"
                backgroundColor="white"
                buttonColor="primaryBlue"
                textColor="primaryBlueDark"
            />
            <TopicGrid
                color="opaqueRed"
                terms={PageTopics.parents_and_families_1}
                title={messages.formatMessage({
                    id: 'helpparentsAndFamiliesTitle',
                })}
                centered={true}
            />
            <TopicGrid
                color="white"
                terms={PageTopics.parents_and_families_2}
                title={messages.formatMessage({ id: 'smthngDifferent' })}
                description={messages.formatMessage({
                    id: 'recommendedWebsites',
                })}
                footNote={messages.formatMessage({
                    id: 'recommendedWebsitesNote',
                })}
                centered={false}
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
                borderColor={`${borderColor} border-t-8 border-${borderColor}`}
            />
        </div>
    );
}
export default ParentsAndFamilies;
