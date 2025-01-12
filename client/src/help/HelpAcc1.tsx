import { useIntl } from 'react-intl';
import TextArrowButton from '../digitalResources/sharedComponents/TextArrowButton';
import YoutubeEmbed from '../utils/YoutubeEmbed';
import { HelpSubtitle, HelpTitle } from '../pages/Help';
import { formatText } from '../digitalResources/lumpyRoadToSolidsTinyBites/sharedComponents/ModalLayout';

function HelpAcc1() {
    const messages = useIntl();

    return (
        <div className="md:w-full xl:w-3/4 text-primaryBlueDark">
            {HelpTitle(messages.formatMessage({ id: 'help1Title' }))}
            {formatText(messages.formatMessage({ id: 'help1Text1' }))}
            <div className="xs:w-full xl:w-3/4">
                <YoutubeEmbed
                    embedId={'XYCFxqKADbg'}
                    paddingBottom="pb-[56.25%]"
                />
            </div>
            <hr className={`border-primaryBlueDark`} />
            {HelpSubtitle(messages.formatMessage({ id: 'help1Text2' }))}
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

export default HelpAcc1;
