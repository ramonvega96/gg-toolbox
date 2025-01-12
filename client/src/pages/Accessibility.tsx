import { useIntl } from 'react-intl';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';

function Accessibility() {
    const messages = useIntl();

    return (
        <div>
            <Header toggleBanner={true} />
            <div className="flex bg-primaryBlue pb-12 pt-20 lg:flex-row">
                <div className="xl:w-1/2 md:w-full sm:w-full mdsm:w-full xs:w-full text-left text-white flex flex-col  max-mymd:ml-16 mymd:ml-20 xl:ml-36">
                    <h1 className="font-omnes pb-12 text-4xl text-white max-mdsm:text-2xl">
                        {messages.formatMessage({
                            id: 'accessibility',
                        })}
                    </h1>
                    <h5 className="w-full text-left md:text-2xl font-normal pr-28">
                        {messages.formatMessage({
                            id: 'accessibilityDescription',
                        })}
                    </h5>
                </div>
            </div>
            <div
                id="accessibility-container"
                className="border-b-8 border-secondaryOrange"
            >
                <div className="bg-white max-mymd:mx-16 mymd:mx-20 xl:mx-36 mb-32 ">
                    <h2 className="font-forma font-bold text-primaryBlueDark mt-10">
                        {messages.formatMessage({
                            id: 'accessibilityHeader-1',
                        })}
                    </h2>
                    <p>
                        {messages.formatMessage({
                            id: 'accessibilityDesc',
                        })}
                    </p>
                    <p className="mt-10">
                        {messages.formatMessage({
                            id: 'accessibilityULDesc2',
                        })}
                    </p>
                    <ul className="list-disc">
                        <li>
                            {messages.formatMessage({
                                id: 'accessibilityUL2Bullet1',
                            })}
                        </li>
                        <li className="mt-2">
                            {messages.formatMessage({
                                id: 'accessibilityUL2Bullet2',
                            })}
                        </li>
                        <li className="mt-2">
                            {messages.formatMessage({
                                id: 'accessibilityUL2Bullet3',
                            })}
                        </li>
                        <li className="mt-2">
                            {messages.formatMessage({
                                id: 'accessibilityUL2Bullet4',
                            })}
                        </li>
                    </ul>
                    <h2 className="font-forma font-bold text-primaryBlueDark mt-10">
                        {messages.formatMessage({
                            id: 'accessibilityHeader-2',
                        })}
                    </h2>
                    <p className="mt-10">
                        {messages.formatMessage({
                            id: 'accessibilityULDesc3',
                        })}
                    </p>
                    <ul className="list-disc">
                        <li>
                            {messages.formatMessage({
                                id: 'accessibilityUL3Bullet1',
                            })}
                        </li>
                        <li className="mt-2">
                            {messages.formatMessage({
                                id: 'accessibilityUL3Bullet2',
                            })}
                        </li>
                        <li className="mt-2">
                            {messages.formatMessage({
                                id: 'accessibilityUL3Bullet3',
                            })}
                        </li>
                    </ul>
                </div>
            </div>
            <Footer pageAnalitycsId="accessibility-page" />
        </div>
    );
}
export default Accessibility;
