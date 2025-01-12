/**
 * The UploadPage component is the page that contains the UploadForm component for users to
 * submite a resource.
 */
import { useIntl } from 'react-intl';
import TitleAndRouteButton from '../../TitleAndRouteButton';
import TitleContainer from '../../TitleContainer';
import SplitSection from '../SplitSection';
import UploadForm from './UploadForm';

function UploadPage() {
    const messages = useIntl();

    return (
        <div>
            <TitleContainer
                title={messages.formatMessage({
                    id: 'doYouHaveUploadResource',
                })}
                subtitle={messages.formatMessage({ id: 'fillOutForm' })}
            />
            <UploadForm />
            <TitleAndRouteButton
                title={messages.formatMessage({
                    id: 'wouldYouLikeToContact',
                })}
                buttonTitle={messages.formatMessage({
                    id: 'contactUs',
                })}
                route="/contact-us"
                borderBottom={'secondaryOrange'}
                borderTop={'secondaryOrange'}
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
                borderColor="secondaryOrange"
            />
        </div>
    );
}
export default UploadPage;
