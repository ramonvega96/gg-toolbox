import { useIntl } from 'react-intl';
import { formatText } from '../digitalResources/lumpyRoadToSolidsTinyBites/sharedComponents/ModalLayout';
import TextArrowButton from '../digitalResources/sharedComponents/TextArrowButton';
import { HelpSubtitle, HelpTitle } from '../pages/Help';

function HelpAcc3() {
    const messages = useIntl();

    const items = Array.from({ length: 11 });

    return (
        <div className="md:w-full xl:w-3/4 text-primaryBlueDark">
            {HelpTitle(
                messages.formatMessage({
                    id: 'help3Title1',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help3Text1' }))}
            <div className="flex xs:flex-col md:flex-row w-full my-4 gap-4 items-start">
                <img
                    alt="resource card with numbers"
                    src={require('../assets/images/help/nums-resource.png')}
                    className="xs:w-full md:w-1/3"
                />
                <ol className="list-decimal ml-0 xs:w-full md:w-1/2">
                    {items.map((_, i) => (
                        <li
                            className="py-2"
                            key={i}
                        >
                            {messages.formatMessage({ id: `rcP${i}` })}
                        </li>
                    ))}
                </ol>
            </div>
            <hr className={`border-primaryBlueDark`} />
            {HelpTitle(
                messages.formatMessage({
                    id: 'help3Title2',
                })
            )}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help3Text2',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help3Text3' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help3Text4',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help3Text5' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help3Text6',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help3Text7' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help3Text8',
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

export default HelpAcc3;
