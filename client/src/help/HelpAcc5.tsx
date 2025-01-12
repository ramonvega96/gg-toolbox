import { useIntl } from 'react-intl';
import { formatText } from '../digitalResources/lumpyRoadToSolidsTinyBites/sharedComponents/ModalLayout';
import TextArrowButton from '../digitalResources/sharedComponents/TextArrowButton';
import { HelpSubtitle, HelpTitle } from '../pages/Help';

function HelpAcc5() {
    const messages = useIntl();

    return (
        <div className="md:w-full xl:w-3/4 text-primaryBlueDark">
            {HelpTitle(
                messages.formatMessage({
                    id: 'help5Title1',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help5Text1' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help5Text2',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help5Text3' }))}
            <div className="xs:w-full md:w-2/5 my-4">
                <TextArrowButton
                    topText={messages.formatMessage({ id: 'help5Btn1' })}
                    link="https://growandgotoolbox.com/upload-a-resource"
                    coloursStyling="bg-primaryBlue hover:bg-primaryBlueDark"
                />
            </div>
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help5Text4',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help5Text5' }))}
            <img
                alt="upload step 2 screenshot"
                src={require('../assets/images/help/submit-step-2.png')}
                className="xs:w-full md:w-3/5 mt-4 mb-2"
            />
            <div className="text-slate-400">
                {formatText(messages.formatMessage({ id: 'help5Text6' }))}
            </div>
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help5Text7',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help5Text8' }))}
            <img
                alt="filters step 3 screenshot"
                src={require('../assets/images/help/submit-step-3.png')}
                className="xs:w-full md:w-3/5 mt-4 mb-2"
            />
            <div className="text-slate-400">
                {formatText(messages.formatMessage({ id: 'help5Text9' }))}
            </div>
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help5Text10',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help5Text11' }))}
            <img
                alt="filters step 4 PDF format screenshot"
                src={require('../assets/images/help/submit-step-4-pdf.png')}
                className="xs:w-full md:w-3/5 mt-4 mb-2"
            />
            <div className="text-slate-400">
                {formatText(messages.formatMessage({ id: 'help5Text12' }))}
            </div>
            {formatText(messages.formatMessage({ id: 'help5Text13' }))}
            <img
                alt="filters step 4 URL format screenshot"
                src={require('../assets/images/help/submit-step-4-url.png')}
                className="xs:w-full md:w-3/5 mt-4 mb-2"
            />
            <div className="text-slate-400">
                {formatText(messages.formatMessage({ id: 'help5Text14' }))}
            </div>
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help5Text15',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help5Text16' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help5Text17',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help5Text18' }))}
            <hr className={`border-primaryBlueDark`} />
            {HelpTitle(
                messages.formatMessage({
                    id: 'help5Text19',
                })
            )}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help5Text20',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help5Text21' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help5Text22',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help5Text23' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help5Text24',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help5Text25' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help5Text26',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help5Text27' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help5Text28',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help5Text29' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help5Text30',
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

export default HelpAcc5;
