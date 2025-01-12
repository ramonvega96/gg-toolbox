/**
 * The ContactUsPage component is the page that contains the ContactForm component for users to
 * send an email.
 */
import { useIntl } from 'react-intl';
import TitleAndRouteButton from '../../TitleAndRouteButton';
import TitleContainer from '../../TitleContainer';
import SplitSection from '../SplitSection';
import ContactForm from './ContactForm';

function ContactUsPage() {
    const messages = useIntl();
    const borderColor = 'secondaryOrange';

    return (
        <div>
            <TitleContainer
                title={messages.formatMessage({ id: 'getInTouch' })}
                subtitle={messages.formatMessage({ id: 'getInTouchBelow' })}
            />
            <ContactForm />
            <TitleAndRouteButton
                title={messages.formatMessage({
                    id: 'doYouHaveUploadResource',
                })}
                buttonTitle={messages.formatMessage({ id: 'uploadHere' })}
                route="/upload-a-resource"
                borderBottom={borderColor}
                borderTop={borderColor}
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
export default ContactUsPage;
