import { useIntl } from 'react-intl';
import { formatText } from '../digitalResources/lumpyRoadToSolidsTinyBites/sharedComponents/ModalLayout';
import TextArrowButton from '../digitalResources/sharedComponents/TextArrowButton';
import { HelpSubtitle, HelpTitle } from '../pages/Help';

function HelpAcc4() {
    const messages = useIntl();

    return (
        <div className="md:w-full xl:w-3/4 text-primaryBlueDark">
            {HelpTitle(
                messages.formatMessage({
                    id: 'help4Title1',
                })
            )}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help4Text1',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help4Text2' }))}

            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help4Text3',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help4Text4' }))}
            <img
                alt="filters step 1 screenshot"
                src={require('../assets/images/help/filters-step-1.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help4Text5',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help4Text6' }))}
            <img
                alt="filters dropdown open"
                src={require('../assets/images/help/filters-open.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            <img
                alt="filters categories open"
                src={require('../assets/images/help/filter-categories-open.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help4Text7' }))}
            <img
                alt="seleted filters screeshot"
                src={require('../assets/images/help/selected-filters.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help4Text8',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help4Text9' }))}
            <img
                alt="filters dropdown open"
                src={require('../assets/images/help/clear-filters.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help4Text10' }))}
            <img
                alt="Using the search bars filters gif"
                className="xs:w-full md:w-3/5 my-4 border b-gray"
                src={require('./media/filters.gif')}
            />
            <hr className={`border-primaryBlueDark`} />
            {HelpTitle(
                messages.formatMessage({
                    id: 'help4Title2',
                })
            )}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help4Text11',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help4Text12' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help4Text13',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help4Text14' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help4Text15',
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

export default HelpAcc4;
