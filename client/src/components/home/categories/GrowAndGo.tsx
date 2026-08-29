import WelcomeComponent from '../../WelcomeComponent';
import { useIntl } from 'react-intl';
import SplitSection from '../SplitSection';
import TitleAndRouteButton from '../../TitleAndRouteButton';
function GrowAndGo() {
    const messages = useIntl();
    const borderColor = 'secondaryOrange';

    return (
        <div>
            <WelcomeComponent
                title={messages.formatMessage({ id: 'welcome' })}
                description={messages.formatMessage({ id: 'description' })}
                embedYoutubeId="8xSQg_PPM_I"
                icon={'go_and_grow.svg'}
                borderColor={borderColor}
                search={true}
            />
            <TitleAndRouteButton
                title={messages.formatMessage({ id: 'visitTbResources' })}
                buttonTitle={messages.formatMessage({ id: 'tinyBitesResources' })}
                route="/?pathway=tb-resources"
                backgroundColor="white"
                buttonColor="primaryBlue"
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
                borderColor={`${borderColor} border-t-8 border-${borderColor}`}
            />
            <TitleAndRouteButton
                title={messages.formatMessage({
                    id: 'learnTeam',
                })}
                buttonTitle={messages.formatMessage({
                    id: 'aboutUs',
                })}
                route="/about-us"
                backgroundColor="white"
                buttonColor="primaryBlue"
                textColor="primaryBlueDark"
            />
        </div>
    );
}
export default GrowAndGo;
