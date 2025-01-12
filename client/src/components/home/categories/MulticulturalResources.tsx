import { useIntl } from 'react-intl';
import Carousel from '../../carousel/Carousel';
import CarouselGrid from '../../carousel/CarouselGrid';
import WelcomeComponent from '../../WelcomeComponent';
import SplitSection from '../SplitSection';
import PageTopics from '../../../assets/json/landingPageTopics.json';
import { LanguageCarouselCardProps } from '../../carousel/LanguageCarouselCard';
import TitleAndRouteButton from '../../TitleAndRouteButton';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../../assets/images/icons/svg/right_arrow_svgrepo_com.svg';
import { generateURL } from '../../TopicButton';
import ButtonsBannerComponent from '../../ButtonsBannerComponent';

function MulticulturalResources() {
    const messages = useIntl();
    const navigate = useNavigate();
    const borderColor = 'secondaryPink';
    const cards: LanguageCarouselCardProps[] =
        PageTopics.resources_in_your_language.sort((a, b) =>
            a.label.localeCompare(b.label)
        );

    return (
        <div className="relative">
            <WelcomeComponent
                title={messages.formatMessage({
                    id: 'homeLanguagesTitle',
                })}
                description={messages.formatMessage({
                    id: 'homeLanguagesDescription',
                })}
                panel="https://stluc.manta.uqcloud.net/elipse/public/gogrow/welcomeComponentImages/language.jpg"
                panelAlt="Kids eating orange"
                icon="language_resources.svg"
                borderColor={borderColor}
                search={true}
            />
            <Carousel
                description={messages.formatMessage({
                    id: 'languagesCarouselDescription',
                })}
                backgroundColor="#f3777833"
                element={
                    <CarouselGrid
                        rows={2}
                        cards={cards}
                    />
                }
            />
            <TitleAndRouteButton
                title={messages.formatMessage({
                    id: 'homeLanguagesButton',
                })}
                buttonTitle={messages.formatMessage({
                    id: 'letUsKnow',
                })}
                route="/contact-us"
                backgroundColor="white"
                buttonColor="secondaryPink"
                textColor="black"
            />
            <ButtonsBannerComponent
                title={messages.formatMessage({
                    id: 'culturallyAdaptedResourcesTitle',
                })}
                description={messages.formatMessage({
                    id: 'culturallyAdaptedResourcesDescription',
                })}
                topButton={
                    <button
                        id="multicultural-eating-practices-button"
                        className="bg-secondaryGreen mt-8 bottom-5 items-center p-6 flex justify-between text-left  mymd:top-80 top-60 w-full hover:bg-tertiaryGreen"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setTimeout(() => {
                                navigate(
                                    generateURL(
                                        'search',
                                        'subcategories=Cultural+Eating+Practices'
                                    )
                                );
                            }, 200);
                        }}
                    >
                        <span
                            style={{
                                fontFamily:
                                    'forma-djr-DisplayProfession, sans-serif',
                            }}
                            className="max-lg:text-base xl:text-xl font-thin mr-4"
                        >
                            {messages.formatMessage({
                                id: 'multiculturalEatingPractices',
                            })}
                        </span>
                        <Arrow
                            fill="white"
                            width="2em"
                        />
                    </button>
                }
                panel="https://stluc.manta.uqcloud.net/elipse/public/gogrow/welcomeComponentImages/culturally-adapted-resources-panel.png"
                panelAlt="Dad and doughter trying new foods"
                borderColor={borderColor}
                borderTop={true}
            />
            <SplitSection
                fcBgColor={'secondaryGreen'}
                fcTitle={messages.formatMessage({ id: 'resourceCategories' })}
                fcText={messages.formatMessage({
                    id: 'whatCanHelpDescription',
                })}
                fcBtnText={messages.formatMessage({ id: 'FHPWhatButton' })}
                fcBtnPath={'/browse'}
                scBgColor={'tertiaryGreen'}
                scTitle={messages.formatMessage({ id: 'FHP' })}
                scText={messages.formatMessage({ id: 'whoCanHelpDescription' })}
                scBtnText={messages.formatMessage({ id: 'FHPWhoButton' })}
                scBtnPath={'/find-a-health-professional'}
                borderColor={borderColor}
            />
        </div>
    );
}
export default MulticulturalResources;
