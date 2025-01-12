import { useIntl } from 'react-intl';
import TopicGrid from '../../TopicGrid';
import WelcomeComponent from '../../WelcomeComponent';
import PageTopics from '../../../assets/json/landingPageTopics.json';
import SplitSection from '../SplitSection';
import { ReactComponent as Arrow } from '../../../assets/images/icons/svg/right_arrow_svgrepo_com.svg';
import TopicGridArtworkFirst from '../../../assets/images/graphics/TopicGridArtwork_1.png';
import TopicGridArtworkSecond from '../../../assets/images/graphics/TopicGridArtwork_2.png';
import TopicGridArtworkThird from '../../../assets/images/graphics/TopicGridArtwork_3.png';
import TopicGridArtworkFourth from '../../../assets/images/graphics/TopicGridArtwork_4.png';
import ATSIHomeMapComponent from '../../ATSIHomeMapComponent';
import { useNavigate } from 'react-router-dom';

function AboriginalAndTorresStrait() {
    const messages = useIntl();
    const navigate = useNavigate();
    const borderColor = 'secondaryOrange';

    const aboutTheArtwork: React.ReactNode = (
        <div className="px-10">
            <img
                src={
                    'https://stluc.manta.uqcloud.net/elipse/public/gogrow/welcomeComponentImages/MasterArtwork.png'
                }
                alt={'Aboriginals artwork'}
                className={`w-full mb-2`}
            />
            <h2 className="text-xl mb-0">Sarah Richards</h2>
            <p className="font-light">
                {messages.formatMessage({
                    id: 'sarahWho',
                })}
            </p>
            <div className="xl:flex hidden grid grid-cols-2 gap-4 w-full pt-10">
                <p className="text-lg w-1/2">
                    {messages.formatMessage({
                        id: 'artwork1',
                    })}
                </p>
                <div className="w-1/2">
                    <p className="text-lg w-full">
                        {messages.formatMessage({
                            id: 'artwork2',
                        })}
                    </p>
                    <button
                        id="go-to-artist"
                        className={`bg-tertiaryGreen w-full max-md:mt-8 px-6 py-3 flex justify-between items-center
               hover:bg-primaryBlueDark text-xl text-white`}
                        onClick={() => {
                            navigate('/about-us?scrollTo=artist');
                        }}
                    >
                        {messages.formatMessage({
                            id: 'findAboutArtist',
                        })}
                        <Arrow
                            className="ml-4"
                            fill="white"
                            width="2em"
                        />
                    </button>
                </div>
            </div>
            <div className="xl:hidden w-full pt-10">
                <p className="text-lg">
                    {messages.formatMessage({
                        id: 'artwork1',
                    }) +
                        ' ' +
                        messages.formatMessage({
                            id: 'artwork2',
                        })}
                </p>
                <button
                    id="go-to-artist-mobile"
                    className={`bg-tertiaryGreen w-full max-md:mt-8 px-6 py-3 flex justify-between items-center
               hover:bg-primaryBlueDark text-xl text-white`}
                    onClick={() => {
                        navigate('/about-us?scrollTo=artist');
                    }}
                >
                    {messages.formatMessage({
                        id: 'findAboutArtist',
                    })}
                    <Arrow
                        className="ml-4"
                        fill="white"
                        width="2em"
                    />
                </button>
            </div>
        </div>
    );

    return (
        <div>
            <WelcomeComponent
                title={messages.formatMessage({ id: 'homeAboriginalTitle' })}
                description={messages.formatMessage({
                    id: 'homeAboriginalDescription',
                })}
                icon="ATSI.png"
                borderColor={borderColor}
                search={true}
                panel="https://stluc.manta.uqcloud.net/elipse/public/gogrow/welcomeComponentImages/MasterArtwork.png"
                panelAlt="Aboriginals artwork"
                modalContent={aboutTheArtwork}
                modalHeader={messages.formatMessage({
                    id: 'artworkStoryHeader',
                })}
                modalBtnText={messages.formatMessage({
                    id: 'readTheStory',
                })}
            />
            <div className="overflow-hidden">
                <div>
                    <div className="h-0 max-xl:hidden relative float-left bottom-[35rem] right-[150px]">
                        <img
                            className="h-[750px]"
                            src={TopicGridArtworkFirst}
                            alt="Aboriginal artwork"
                        />
                    </div>
                    <div className="h-0 max-xl:hidden relative float-right top-[20rem] left-[200px] z-[1]">
                        <img
                            className="h-[650px]"
                            src={TopicGridArtworkSecond}
                            alt="Aboriginal artwork"
                        />
                    </div>
                    <TopicGrid
                        color="opaqueOrange"
                        terms={PageTopics.atsi_1}
                        title={messages.formatMessage({
                            id: 'aboriginalTitleTG1',
                        })}
                        centered={true}
                    />
                </div>
                <TopicGrid
                    color="white"
                    terms={PageTopics.atsi_2}
                    title={messages.formatMessage({ id: 'aboriginalTitleTG2' })}
                    description={messages.formatMessage({
                        id: 'aboriginalDescriptionTG2',
                    })}
                    centered={false}
                />
                <div>
                    <div className="h-0 max-xl:hidden relative float-left top-[13rem] right-[350px] z-[1]">
                        <img
                            className="h-[650px]"
                            src={TopicGridArtworkThird}
                            alt="Aboriginal artwork"
                        />
                    </div>
                    <ATSIHomeMapComponent />
                </div>
                <div className="h-0 max-xl:hidden relative float-right top-[12rem] left-[200px] z-[1]">
                    <img
                        className="h-[650px]"
                        src={TopicGridArtworkFourth}
                        alt="Aboriginal artwork"
                    />
                </div>
                <SplitSection
                    fcBgColor="white"
                    fcTitle={messages.formatMessage({
                        id: 'noResourceTitle',
                    })}
                    fcText={messages.formatMessage({
                        id: 'noResourceDesc',
                    })}
                    fcBtnText={messages.formatMessage({
                        id: 'personaliseResource',
                    })}
                    fcBtnPath="/personalise-a-resource"
                    scBgColor="[#F2F2F2]"
                    scTitle={messages.formatMessage({ id: 'missedSomething' })}
                    scText={messages.formatMessage({
                        id: 'letUsKnowDesc',
                    })}
                    scBtnText={messages.formatMessage({ id: 'contactUs' })}
                    scBtnPath="/contact-us"
                    textColor="primaryBlueDark"
                    btnStyle="bg-secondaryGreen hover:bg-tertiaryGreen text-white z-[2]"
                />
            </div>
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
                borderColor={`${borderColor} border-t-8 border-${borderColor}`}
            />
        </div>
    );
}
export default AboriginalAndTorresStrait;
