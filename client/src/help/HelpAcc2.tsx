import { useIntl } from 'react-intl';
import { formatText } from '../digitalResources/lumpyRoadToSolidsTinyBites/sharedComponents/ModalLayout';
import TopicButton from '../components/TopicButton';
import TextArrowButton from '../digitalResources/sharedComponents/TextArrowButton';
import { HelpSubtitle, HelpTitle } from '../pages/Help';

function HelpAcc2() {
    const messages = useIntl();

    return (
        <div className="md:w-full xl:w-3/4 text-primaryBlueDark">
            {HelpTitle(messages.formatMessage({ id: 'help2Title1' }))}
            {formatText(messages.formatMessage({ id: 'help2Text1' }))}
            {HelpSubtitle(messages.formatMessage({ id: 'help2Text2' }))}
            {formatText(messages.formatMessage({ id: 'help2Text3' }))}
            <img
                alt="Using the search bars gif"
                className="xs:w-full md:w-3/5 my-4 border b-gray"
                src={require('./media/search.gif')}
            />
            {formatText(messages.formatMessage({ id: 'help2Text4' }))}
            {HelpSubtitle(messages.formatMessage({ id: 'help2Text5' }))}
            {formatText(messages.formatMessage({ id: 'help2Text6' }))}
            <div className="my-4">
                <TopicButton
                    term={{
                        label: 'Growth',
                        externalLink: '',
                    }}
                    index={0}
                />
            </div>
            {formatText(messages.formatMessage({ id: 'help2Text7' }))}
            <img
                alt="Using pre-selected topic buttons found across the website gif"
                className="xs:w-full md:w-3/5 my-4 border b-gray"
                src={require('./media/topicBtn.gif')}
            />
            {formatText(messages.formatMessage({ id: 'help2Text8' }))}
            {HelpSubtitle(messages.formatMessage({ id: 'help2Text9' }))}
            {formatText(messages.formatMessage({ id: 'help2Text10' }))}
            <img
                alt="categories location screenshot"
                src={require('../assets/images/help/categories-location.jpg')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help2Text11' }))}
            <img
                alt="lis of categories"
                src={require('../assets/images/help/categories-list.jpg')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help2Text12' }))}
            <img
                alt="subcategory example"
                src={require('../assets/images/help/subcategory-example.jpg')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help2Text13' }))}
            <img
                alt="Using our categories page gif"
                className="xs:w-full md:w-3/5 my-4 border b-gray"
                src={require('./media/categories.gif')}
            />
            {formatText(messages.formatMessage({ id: 'help2Text14' }))}
            {HelpSubtitle(messages.formatMessage({ id: 'help2Text15' }))}
            {formatText(messages.formatMessage({ id: 'help2Text16' }))}
            <div className="xs:w-full md:w-1/3">
                <TextArrowButton
                    topText={messages.formatMessage({ id: 'contactUs' })}
                    link="https://growandgotoolbox.com/contact-us"
                    coloursStyling="bg-primaryBlue hover:bg-primaryBlueDark"
                />
            </div>
            <hr className={`border-primaryBlueDark`} />
            {HelpTitle(messages.formatMessage({ id: 'help2Title2' }))}
            {HelpSubtitle(messages.formatMessage({ id: 'help2Text17' }))}
            {formatText(messages.formatMessage({ id: 'help2Text18' }))}
            <img
                alt="sort feature screenshot"
                src={require('../assets/images/help/sort.jpg')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help2Text19' }))}
            <div className="w-full my-4">
                <img
                    alt="resource card"
                    src={require('../assets/images/help/resource.jpg')}
                />
            </div>
            {HelpSubtitle(messages.formatMessage({ id: 'help2Text20' }))}
            {formatText(messages.formatMessage({ id: 'help2Text21' }))}
            {HelpSubtitle(messages.formatMessage({ id: 'help2Text22' }))}
            {formatText(messages.formatMessage({ id: 'help2Text23' }))}
            <img
                alt="topic grid screenshot"
                src={require('../assets/images/help/topic-grid.jpg')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {HelpSubtitle(messages.formatMessage({ id: 'help2Text24' }))}
            {formatText(messages.formatMessage({ id: 'help2Text25' }))}
            {HelpSubtitle(messages.formatMessage({ id: 'help2Text26' }))}
        </div>
    );
}

export default HelpAcc2;
