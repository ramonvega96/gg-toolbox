import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import TitleContainer from '../components/TitleContainer';
import { useIntl } from 'react-intl';
import TitleAndRouteButton from '../components/TitleAndRouteButton';
import { useState } from 'react';
import Accordion from '../components/Accordion';
import HelpAcc1 from '../help/HelpAcc1';
import HelpAcc2 from '../help/HelpAcc2';
import HelpAcc3 from '../help/HelpAcc3';
import HelpAcc4 from '../help/HelpAcc4';
import HelpAcc5 from '../help/HelpAcc5';
import HelpAcc6 from '../help/HelpAcc6';
import HelpAcc7 from '../help/HelpAcc7';

export const HelpTitle = (str: string) => (
    <h1 className="font-omnes font-bold xs:text-2xl md:text-3xl mb-4">{str}</h1>
);
export const HelpSubtitle = (str: string) => (
    <h1 className="font-forma xs:text-2xl md:text-2xl mb-4">{str}</h1>
);

function Help() {
    const messages = useIntl();
    const [activeContentIndex, setActiveContentIndex] = useState<number>(-1);

    const accContent = [
        {
            title: messages.formatMessage({ id: 'help1' }),
            content: <HelpAcc1 />,
        },
        {
            title: messages.formatMessage({ id: 'help2' }),
            content: <HelpAcc2 />,
        },
        {
            title: messages.formatMessage({ id: 'help3' }),
            content: <HelpAcc3 />,
        },
        {
            title: messages.formatMessage({ id: 'help4' }),
            content: <HelpAcc4 />,
        },
        {
            title: messages.formatMessage({ id: 'help5' }),
            content: <HelpAcc5 />,
        },
        {
            title: messages.formatMessage({ id: 'help6' }),
            content: <HelpAcc6 />,
        },
        {
            title: messages.formatMessage({ id: 'help7' }),
            content: <HelpAcc7 />,
        },
    ];

    return (
        <div>
            <Header toggleBanner={true} />
            <TitleContainer
                title={messages.formatMessage({ id: 'needHelp' })}
                subtitle={messages.formatMessage({ id: 'helpDesc' })}
            />
            <h1 className="font-omnes font-bold text-3xl xl:px-36 md:px-20 xs:px-10 pt-14 pb-4">
                {messages.formatMessage({
                    id: 'whatIs',
                })}
            </h1>
            <div className="grid xl:grid-cols-2 xs:grid-cols-1 gap-4 w-full xl:px-36 md:px-20 xs:px-10 pb-14 bg-white text-primaryBlueDark">
                <p className="text-lg m-0">
                    {messages.formatMessage({
                        id: 'helpP1',
                    })}
                </p>
                <p className="text-lg m-0">
                    {messages.formatMessage({
                        id: 'helpP2',
                    })}
                </p>
            </div>
            <div className="xl:px-36 md:px-20 xs:px-10 pb-14">
                {accContent.map((item, index) => (
                    <Accordion
                        key={index}
                        title={
                            <p className="font-omnes font-bold text-left xs:text-base md:text-xl my-0">
                                {item.title}
                            </p>
                        }
                        content={
                            <div className="w-full bg-slate-100 px-12 py-8">
                                {item.content}
                            </div>
                        }
                        index={index}
                        activeIndex={activeContentIndex}
                        setActiveIndex={setActiveContentIndex}
                    />
                ))}
            </div>
            <TitleAndRouteButton
                title={messages.formatMessage({
                    id: 'cantFindHelp',
                })}
                buttonTitle={messages.formatMessage({
                    id: 'contactUs',
                })}
                route="/contact-us"
                paddingY="py-12"
                borderTop={'secondaryOrange'}
                borderBottom={'secondaryOrange'}
            />
            <Footer pageAnalitycsId="help-page" />
        </div>
    );
}

export default Help;
