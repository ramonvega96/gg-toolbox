import { useIntl } from 'react-intl';
import { formatText } from '../digitalResources/lumpyRoadToSolidsTinyBites/sharedComponents/ModalLayout';
import TextArrowButton from '../digitalResources/sharedComponents/TextArrowButton';
import { HelpSubtitle, HelpTitle } from '../pages/Help';
import { useState } from 'react';
import Accordion from '../components/Accordion';

function HelpAcc6() {
    const messages = useIntl();
    const [activeContentIndex, setActiveContentIndex] = useState<number>(-1);

    const acc1 = () => (
        <div>
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help6Acc1Txt1',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help6Acc1Txt2' }))}
            <img
                alt="Choose state map"
                src={require('../assets/images/help/fhp-4.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help6Acc1Txt3',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help6Acc1Txt4' }))}
            <img
                alt="Specific state modal opened"
                src={require('../assets/images/help/fhp-5.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help6Acc1Txt5' }))}
            <img
                alt="Maternal, Child, and Family Health nurse gif"
                className="xs:w-full md:w-3/5 mt-8 border b-gray"
                src={require('./media/mcfhn.gif')}
            />
        </div>
    );

    const acc2 = () => (
        <div>
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help6Acc2Txt1',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help6Acc2Txt2' }))}
        </div>
    );

    const acc3 = () => (
        <div>
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help6Acc3Txt1',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help6Acc3Txt2' }))}
            <img
                alt="Choose state map"
                src={require('../assets/images/help/fhp-6.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help6Acc3Txt3',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help6Acc3Txt4' }))}
            <img
                alt="Choose need from grid"
                src={require('../assets/images/help/fhp-7.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help6Acc3Txt5' }))}
            <img
                alt="Choose professional from grid"
                src={require('../assets/images/help/fhp-8.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help6Acc3Txt6',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help6Acc3Txt7' }))}
            <img
                alt="allied health professionals list"
                src={require('../assets/images/help/fhp-9.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help6Acc3Txt8' }))}
            <img
                alt="specific allied health professional"
                src={require('../assets/images/help/fhp-10.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help6Acc3Txt9' }))}
            <img
                alt="Find health professional GIF"
                className="xs:w-full md:w-3/5 mt-8 border b-gray"
                src={require('./media/aph.gif')}
            />
        </div>
    );

    const accContent = [
        {
            title: messages.formatMessage({ id: 'help6Acc1Title' }),
            content: acc1(),
        },
        {
            title: messages.formatMessage({ id: 'help6Acc2Title' }),
            content: acc2(),
        },
        {
            title: messages.formatMessage({ id: 'help6Acc3Title' }),
            content: acc3(),
        },
    ];

    return (
        <div className="md:w-full xl:w-3/4 text-primaryBlueDark">
            {HelpTitle(
                messages.formatMessage({
                    id: 'help6Title1',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help6Text1' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help6Text2',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help6Text3' }))}
            <div className="xs:pl-4 md:pl-12">
                {formatText(messages.formatMessage({ id: 'help6Text4' }))}
                {formatText(messages.formatMessage({ id: 'help6Text5' }))}
                {formatText(messages.formatMessage({ id: 'help6Text6' }))}
                {formatText(messages.formatMessage({ id: 'help6Text7' }))}
            </div>
            <img
                alt="FHP Landing"
                src={require('../assets/images/help/fhp-1.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help6Text9',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help6Text10' }))}
            <img
                alt="FHP Path selector"
                src={require('../assets/images/help/fhp-2.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help6Text11' }))}
            <img
                alt="Types of Health Care in Australia"
                src={require('../assets/images/help/fhp-3.png')}
                className="xs:w-full md:w-3/5 my-4"
            />
            {formatText(messages.formatMessage({ id: 'help6Text12' }))}
            {formatText(messages.formatMessage({ id: 'help6Text13' }))}
            {formatText(messages.formatMessage({ id: 'help6Text14' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help6Text15',
                })
            )}

            <div className="mb-12">
                {accContent.map((item, index) => (
                    <Accordion
                        key={index}
                        title={
                            <p className="font-omnes font-bold text-left xs:text-base md:text-xl my-0">
                                {item.title}
                            </p>
                        }
                        content={
                            <div className="w-full bg-slate-100 px-0 py-8">
                                {item.content}
                            </div>
                        }
                        index={index}
                        activeIndex={activeContentIndex}
                        setActiveIndex={setActiveContentIndex}
                    />
                ))}
            </div>

            <hr className={`border-primaryBlueDark`} />
            {HelpTitle(
                messages.formatMessage({
                    id: 'help6Title2',
                })
            )}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help6Text16',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help6Text17' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help6Text18',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help6Text19' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help6Text20',
                })
            )}
            {formatText(messages.formatMessage({ id: 'help6Text21' }))}
            {HelpSubtitle(
                messages.formatMessage({
                    id: 'help6Text22',
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

export default HelpAcc6;
