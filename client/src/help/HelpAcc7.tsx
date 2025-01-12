import { useIntl } from 'react-intl';
import { formatText } from '../digitalResources/lumpyRoadToSolidsTinyBites/sharedComponents/ModalLayout';
import TextArrowButton from '../digitalResources/sharedComponents/TextArrowButton';
import { HelpSubtitle, HelpTitle } from '../pages/Help';

function HelpAcc7() {
    const messages = useIntl();

    return (
        <div className="md:w-full xl:w-3/4 text-primaryBlueDark">
            {HelpTitle(
                messages.formatMessage({
                    id: 'help7Title1',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help7Text1' }))}
            {formatText(messages.formatMessage({ id: 'help7Text2' }))}
            <img
                alt="Feedback from footer"
                src={require('../assets/images/help/feedback-1.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help7Text3' }))}
            <img
                alt="Feedback from contact"
                src={require('../assets/images/help/feedback-2.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help7Text4' }))}
            <img
                alt="Contact page"
                src={require('../assets/images/help/feedback-3.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help7Text5' }))}
            <img
                alt="Footer thubs up/down"
                src={require('../assets/images/help/feedback-4.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help7Text6' }))}
            <img
                alt="Card thubs up/down"
                src={require('../assets/images/help/feedback-5.png')}
                className="my-4"
            />

            <hr className={`border-primaryBlueDark`} />
            {HelpTitle(
                messages.formatMessage({
                    id: 'help7Title2',
                })
            )}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help7Text7',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help7Text8' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help7Text9',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help7Text10' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help7Text11',
                })
            )}
            <div className="xs:w-full md:w-1/3">
                <TextArrowButton
                    topText={messages.formatMessage({ id: 'contactUs' })}
                    link="https://growandgotoolbox.com/contact-us"
                    coloursStyling="bg-primaryBlue hover:bg-primaryBlueDark"
                />
            </div>
        </div>
    );
}

export default HelpAcc7;
