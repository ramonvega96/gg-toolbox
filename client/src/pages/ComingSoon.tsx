import { useIntl } from 'react-intl';
import { useContext } from 'react';
import { HomePathwayContext } from '../utils/HomeContext';
import TitleAndRouteButton from '../components/TitleAndRouteButton';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';

/**
 * This page renders a coming soon page.
 * @returns a page that displays a coming soon message
 */
function ComingSoon() {
    const messages = useIntl();
    const { path } = useContext(HomePathwayContext);

    return (
        <div id="coming-soon-header-footer-container">
            <Header toggleBanner={true} />
            <div id="coming-soon-container">
                <div
                    id="coming-soon-message-container"
                    className="bg-white flex flex-col justify-center items-center text-center max-md:px-10 max-md:py-12 md:py-24 lg:py-44"
                >
                    <h2
                        id="coming-soon-title"
                        className="font-omnes text-4xl font-bold text-center mt-10 mb-10 text-primaryBlueDark"
                    >
                        {messages.formatMessage({ id: 'comingSoon' })}
                    </h2>
                    <span
                        id="coming-soon-description"
                        className=" 2xl:text-2xl grid content-center
                                     max-sm:mt-2 max-sm:mb-10 my-4"
                    >
                        {messages.formatMessage({
                            id: 'comingSoonDescription',
                        })}
                    </span>
                </div>
                <div id="for-more-info-container">
                    <TitleAndRouteButton
                        title={messages.formatMessage({
                            id: 'forMoreInformation',
                        })}
                        buttonTitle={messages.formatMessage({
                            id: 'contactUs',
                        })}
                        route="/contact-us"
                        paddingY="py-24"
                        borderTop={'secondaryOrange'}
                        borderBottom={'secondaryOrange'}
                    />
                </div>
            </div>
            <Footer
                proudlySupported={path === 'growAndGo'}
                pageAnalitycsId="coming-soon-page"
            />
        </div>
    );
}
export default ComingSoon;
