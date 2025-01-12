import { useIntl } from 'react-intl';
import { useEffect, useRef } from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import AboutTeamMember from '../components/aboutUs/AboutTeamMember';
import ArtistArtwork from '../assets/images/graphics/ArtistArtwork.png';
import { ReactComponent as Arrow } from '../assets/images/icons/svg/right_arrow_svgrepo_com.svg';
import { useSearchParams, useNavigate } from 'react-router-dom';
import WelcomeComponent from '../components/WelcomeComponent';
import ggtVis1 from '../assets/images/graphics/aboutGGT1.png';
import ggtVis2 from '../assets/images/graphics/aboutGGT2.png';

function AboutUs() {
    const [searchParams] = useSearchParams();
    const messages = useIntl();
    const aboutTheArtistRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const scrollTo = searchParams.has('scrollTo')
            ? searchParams.get('scrollTo')
            : '';
        if (scrollTo === 'artist' && aboutTheArtistRef.current)
            aboutTheArtistRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [searchParams]);

    const visionSection = (image: string, title: string, body: string) => (
        <div
            id={`${title}-section`}
            className="flex xs:flex-col md:flex-row gap-x-8 justify-center items-center py-2"
        >
            <div className="flex w-1/4 justify-center xs:mb-4">
                <img
                    className="xs:w-full md:w-3/4"
                    src={image}
                    alt={`${title} section icon`}
                />
            </div>
            <div className="xs:w-full md:w-3/4">
                <p className="font-forma font-bold xs:text-lg md:text-xl text-primaryBlueDark m-0">
                    {messages.formatMessage({
                        id: title,
                    })}
                </p>
                <p className="font-forma xs:text-base md:text-lg text-primaryBlueDark">
                    {messages.formatMessage({
                        id: body,
                    })}
                </p>
            </div>
        </div>
    );

    return (
        <div>
            <Header toggleBanner={true} />
            <WelcomeComponent
                title={messages.formatMessage({ id: 'aboutG&G' })}
                description={messages.formatMessage({ id: 'aboutGGTWelcome' })}
                embedYoutubeId="wBqIJ9HzLUs"
                icon={'go_and_grow.svg'}
                search={false}
            />
            <div id="about-us-container">
                <div className="grid xl:grid-cols-2 xs:grid-cols-1 gap-4 w-full xl:px-36 md:px-20 xs:px-10 py-14 bg-primaryBlueDark border-b-8 border-secondaryOrange text-white">
                    <p className="text-lg m-0">
                        {messages.formatMessage({
                            id: 'welcomeP1',
                        })}
                    </p>
                    <p className="text-lg m-0">
                        {messages.formatMessage({
                            id: 'welcomeP2',
                        })}
                    </p>
                </div>
                <div className="xl:px-36 md:px-20 xs:px-10 py-10 grid xl:grid-cols-2 xs:grid-cols-1 gap-4 w-full">
                    <div>
                        <p className="font-forma font-bold xs:text-lg md:text-xl text-primaryBlueDark m-0">
                            {messages.formatMessage({
                                id: 'ourVision',
                            })}
                        </p>
                        <h1 className="font-omnes font-bold xl:text-3xl md:text-2xl xs:text-xl lg:mb-12 mymd:mb-5 sm:mb-2">
                            {messages.formatMessage({
                                id: 'visionDescTitle',
                            })}
                        </h1>
                        <p className="font-forma xs:text-lg md:text-xl text-primaryBlueDark m-0">
                            {messages.formatMessage({
                                id: 'visionDesc',
                            })}
                        </p>
                    </div>
                    <div>
                        {visionSection(
                            ggtVis1,
                            'aboutCustomersTitle',
                            'aboutCustomersDesc'
                        )}
                        {visionSection(
                            ggtVis2,
                            'expandingTitle',
                            'expandingDesc'
                        )}
                    </div>
                </div>
                <div className="border-b-8 border-secondaryOrange 3xl:h-[50rem] 2xl:h-[40rem] xl:h-[30rem] md:h-[20rem] xs:h-[10rem]">
                    <img
                        src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/team.png"
                        alt="gogrow team"
                        className="object-cover object-top w-full h-full"
                    />
                </div>
                <div className="border-b-8 border-secondaryOrange bg-secondaryGreen xl:px-36 md:px-20 xs:px-10 pt-10">
                    <h2 className="font-omnes font-bold text-white mb-12">
                        {messages.formatMessage({
                            id: 'meetTeam',
                        })}
                    </h2>

                    <div className="xl:block md:hidden xs:hidden">
                        <div className="flex flex-row gap-4">
                            <div className="w-1/2">
                                <AboutTeamMember
                                    imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/helen_truby.png"
                                    imgAlt="Helen Truby picture"
                                    teamMemberName="Helen Truby"
                                    teamMemberRole="chiefInvestigator"
                                    teamMemberDesc="helenDesc"
                                />
                            </div>
                            <div className="w-1/2">
                                <AboutTeamMember
                                    imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/philip_waller.png"
                                    imgAlt="Philip Waller picture"
                                    teamMemberName="Philip Waller"
                                    teamMemberRole="digitalManager"
                                    teamMemberDesc="philipDesc"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className="w-1/2">
                                <AboutTeamMember
                                    imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/clare_dix.png"
                                    imgAlt="Clare Dix picture"
                                    teamMemberName="Clare Dix"
                                    teamMemberRole="projectManager"
                                    teamMemberDesc="clareDesc"
                                />
                            </div>
                            <div className="w-1/2">
                                <AboutTeamMember
                                    imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/tash_billich.png"
                                    imgAlt="Tash Billich picture"
                                    teamMemberName="Tash Billich"
                                    teamMemberRole="projectOfficerDieteticResearcher"
                                    teamMemberDesc="tashDesc"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className="w-1/2">
                                <AboutTeamMember
                                    imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/ceara_swyripa.png"
                                    imgAlt="Ceara Swyripa picture"
                                    teamMemberName="Ceara Swyripa"
                                    teamMemberRole="knowledgeTranslationsImpactManager"
                                    teamMemberDesc="cearaDesc"
                                />
                            </div>
                            <div className="w-1/2">
                                <AboutTeamMember
                                    imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/jacqui_palmer.png"
                                    imgAlt="Jacqui Palmer picture"
                                    teamMemberName="Jacqui Palmer"
                                    teamMemberRole="projectOfficerDieteticResearcher"
                                    teamMemberDesc="jacquiDesc"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className="w-1/2">
                                <AboutTeamMember
                                    imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/bea.png"
                                    imgAlt="Beatrice Murawski picture"
                                    teamMemberName="Beatrice Murawski"
                                    teamMemberRole="projectOfficerHealthBehaviourResearcher"
                                    teamMemberDesc="beaDesc"
                                    imageAlignment="object-center"
                                />
                            </div>
                            <div className="w-1/2">
                                <AboutTeamMember
                                    imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/stella.png"
                                    imgAlt="Stella Boyd-Ford picture"
                                    teamMemberName="Stella Boyd-Ford"
                                    teamMemberRole="projectOfficerResearch"
                                    teamMemberDesc="stellaDesc"
                                    imageAlignment="object-top"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="xl:hidden md:block xs:block">
                        <AboutTeamMember
                            imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/helen_truby.png"
                            imgAlt="Helen Truby picture"
                            teamMemberName="Helen Truby"
                            teamMemberRole="chiefInvestigator"
                            teamMemberDesc="helenDesc"
                        />
                        <AboutTeamMember
                            imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/philip_waller.png"
                            imgAlt="Philip Waller picture"
                            teamMemberName="Philip Waller"
                            teamMemberRole="digitalManager"
                            teamMemberDesc="philipDesc"
                        />
                        <AboutTeamMember
                            imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/clare_dix.png"
                            imgAlt="Clare Dix picture"
                            teamMemberName="Clare Dix"
                            teamMemberRole="projectManager"
                            teamMemberDesc="clareDesc"
                        />
                        <AboutTeamMember
                            imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/tash_billich.png"
                            imgAlt="Tash Billich picture"
                            teamMemberName="Tash Billich"
                            teamMemberRole="projectOfficerDieteticResearcher"
                            teamMemberDesc="tashDesc"
                        />
                        <AboutTeamMember
                            imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/ceara_swyripa.png"
                            imgAlt="Ceara Swyripa picture"
                            teamMemberName="Ceara Swyripa"
                            teamMemberRole="knowledgeTranslationsImpactManager"
                            teamMemberDesc="cearaDesc"
                        />
                        <AboutTeamMember
                            imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/jacqui_palmer.png"
                            imgAlt="Jacqui Palmer picture"
                            teamMemberName="Jacqui Palmer"
                            teamMemberRole="projectOfficerDieteticResearcher"
                            teamMemberDesc="jacquiDesc"
                        />
                        <AboutTeamMember
                            imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/bea.png"
                            imgAlt="Beatrice Murawski picture"
                            teamMemberName="Beatrice Murawski"
                            teamMemberRole="projectOfficerHealthBehaviourResearcher"
                            teamMemberDesc="beaDesc"
                            imageAlignment="object-center"
                        />
                        <AboutTeamMember
                            imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/stella.png"
                            imgAlt="Stella Boyd-Ford picture"
                            teamMemberName="Stella Boyd-Ford"
                            teamMemberRole="projectOfficerResearch"
                            teamMemberDesc="stellaDesc"
                            imageAlignment="object-top"
                        />
                    </div>
                </div>

                <div
                    className="bg-primaryBlueDark xl:px-36 md:px-20 xs:px-10 py-10"
                    ref={aboutTheArtistRef}
                >
                    <div className="h-0 max-xl:hidden relative float-right -top-[0vw] -right-[25vw]">
                        <img
                            className="h-[40vw]"
                            src={ArtistArtwork}
                            alt="Aboriginal about us artwork"
                        />
                    </div>
                    <h2 className="font-omnes font-bold text-white mb-12">
                        {messages.formatMessage({
                            id: 'aboutTheArtist',
                        })}
                    </h2>
                    <div className="max-xl:w-full w-10/12">
                        <AboutTeamMember
                            imgSrc="https://stluc.manta.uqcloud.net/elipse/public/gogrow/team/SarahRichards.png"
                            imgAlt="Sarah Richards picture"
                            teamMemberName="Sarah Richards"
                            teamMemberRole="founderAndArtist"
                            teamMemberDesc="sarahDesc"
                        />
                        <h3 className="font-forma font-bold text-white italic text-lg">
                            {`"${messages.formatMessage({
                                id: 'artistQuote',
                            })}"`}
                        </h3>
                        <p className="text-lg text-white font-light">
                            ~ Sarah Richards
                        </p>
                    </div>
                    <button
                        id="go-to-artwork"
                        className={`bg-secondaryGreen w-full xl:w-2/5 max-md:mt-8 px-6 py-2 
                        mb-4 flex justify-between items-center hover:bg-tertiaryGreen text-xl text-white`}
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setTimeout(() => {
                                navigate(
                                    '/?pathway=aboriginal-and-torres-strait&modalDisplay=open'
                                );
                            }, 200);
                        }}
                    >
                        {messages.formatMessage({
                            id: 'findAboutArtwork',
                        })}
                        <Arrow
                            className="ml-4"
                            fill="white"
                            width="2em"
                        />
                    </button>
                    <div className="justify-center items-center xl:hidden md:flex xs:flex max-xl:w-full">
                        <img
                            className="w-full max-w-[600px]"
                            src={ArtistArtwork}
                            alt="Aboriginal about us artwork"
                        />
                    </div>
                </div>

                <div className="xl:px-36 md:px-20 xs:px-10 pt-10">
                    <h2 className="font-omnes font-bold text-primaryBlueDark">
                        {messages.formatMessage({
                            id: 'acknowledgments',
                        })}
                    </h2>
                    <h5 className="font-omnes font-bold text-primaryBlueDark mt-10">
                        {messages.formatMessage({
                            id: 'steeringGroup',
                        })}
                    </h5>
                    <p className="xl:w-1/3 md:w-1/2 xs:w-full text-lg">
                        {messages.formatMessage({
                            id: 'steeringGroupThanks',
                        })}
                    </p>
                    <div className="xl:block md:hidden xs:hidden pt-10">
                        <div className="flex flex-row justify-center items-center gap-10">
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/aus_gov_long.png"
                                alt="aus gov logo"
                                className="w-[15%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/Nutrition-Australia_logo.png"
                                alt="nutirion aus logo"
                                className="w-[15%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/NSW-HEALTH-LOGO.webp"
                                alt="nsw health logo"
                                className="w-[15%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/Partner-Logos_0000_logo-ChildrensHealth.jpg"
                                alt="childrens health logo"
                                className="w-[15%]"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center gap-10">
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/Partner-Logos_0007_HWQ-Logos_HWQ-Logo.jpg"
                                alt="HWQ logo"
                                className="w-[15%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/uq-logo-purple.png"
                                alt="uq logo"
                                className="w-[15%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/ecu.png"
                                alt="ecu logo"
                                className="w-[15%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/deakin-university-logo-vector.png"
                                alt="deakin uni logo"
                                className="w-[15%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/NRHA-Logo-LS.png"
                                alt="NRHA logo"
                                className="w-[15%]"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center gap-10">
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/logo-foodbank.png"
                                alt="foodbank logo"
                                className="w-[15%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/my_dilly_bag.png"
                                alt="my dilly bag logo"
                                className="w-[15%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/karitane.png"
                                alt="karitane logo"
                                className="w-[15%]"
                            />
                        </div>
                    </div>
                    <div className="xl:hidden md:block xs:hidden pt-10">
                        <div className="flex flex-row justify-center items-center gap-10">
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/aus_gov_long.png"
                                alt="aus gov logo"
                                className="w-[20%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/Nutrition-Australia_logo.png"
                                alt="nutirion aus logo"
                                className="w-[20%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/NSW-HEALTH-LOGO.webp"
                                alt="nsw health logo"
                                className="w-[20%]"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center gap-10">
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/Partner-Logos_0000_logo-ChildrensHealth.jpg"
                                alt="childrens health logo"
                                className="w-[20%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/Partner-Logos_0007_HWQ-Logos_HWQ-Logo.jpg"
                                alt="HWQ logo"
                                className="w-[20%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/uq-logo-purple.png"
                                alt="uq logo"
                                className="w-[20%]"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center gap-10">
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/ecu.png"
                                alt="ecu logo"
                                className="w-[20%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/deakin-university-logo-vector.png"
                                alt="deakin uni logo"
                                className="w-[20%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/NRHA-Logo-LS.png"
                                alt="NRHA logo"
                                className="w-[20%]"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center gap-10">
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/logo-foodbank.png"
                                alt="foodbank logo"
                                className="w-[20%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/my_dilly_bag.png"
                                alt="my dilly bag logo"
                                className="w-[20%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/karitane.png"
                                alt="karitane logo"
                                className="w-[20%]"
                            />
                        </div>
                    </div>
                    <div className="xl:hidden md:hidden xs:block pt-10">
                        <div className="flex flex-row justify-center items-center gap-10">
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/aus_gov_long.png"
                                alt="aus gov logo"
                                className="w-[30%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/Nutrition-Australia_logo.png"
                                alt="nutirion aus logo"
                                className="w-[30%]"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center gap-10">
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/NSW-HEALTH-LOGO.webp"
                                alt="nsw health logo"
                                className="w-[30%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/Partner-Logos_0000_logo-ChildrensHealth.jpg"
                                alt="childrens health logo"
                                className="w-[30%]"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center gap-10">
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/Partner-Logos_0007_HWQ-Logos_HWQ-Logo.jpg"
                                alt="HWQ logo"
                                className="w-[30%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/uq-logo-purple.png"
                                alt="uq logo"
                                className="w-[30%]"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center gap-10">
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/ecu.png"
                                alt="ecu logo"
                                className="w-[30%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/deakin-university-logo-vector.png"
                                alt="deakin uni logo"
                                className="w-[30%]"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center gap-10">
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/NRHA-Logo-LS.png"
                                alt="NRHA logo"
                                className="w-[30%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/logo-foodbank.png"
                                alt="foodbank logo"
                                className="w-[30%]"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center gap-10">
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/my_dilly_bag.png"
                                alt="my dilly bag logo"
                                className="w-[30%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/karitane.png"
                                alt="karitane logo"
                                className="w-[30%]"
                            />
                        </div>
                    </div>
                    <div className="xl:block md:block xs:hidden pt-10 pb-20">
                        <div className="flex flex-row w-full pt-10">
                            <div className="w-1/2 pr-5">
                                <h5 className="font-forma font-bold text-primaryBlueDark">
                                    {messages.formatMessage({
                                        id: 'consumerPanel',
                                    })}
                                </h5>
                                <p className="text-lg">
                                    {messages.formatMessage({
                                        id: 'consumerPanelThanks',
                                    })}
                                </p>
                            </div>
                            <div className="w-1/2 pl-5">
                                <h5 className="font-forma font-bold text-primaryBlueDark">
                                    {messages.formatMessage({
                                        id: 'mediaParticipants',
                                    })}
                                </h5>
                                <p className="text-lg">
                                    {messages.formatMessage({
                                        id: 'mediaParticipantsThanks',
                                    })}
                                </p>
                                <div className="flex flex-row justify-center items-center gap-10">
                                    <img
                                        src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/national_aboriginal_design_agency.png"
                                        alt="NADA logo"
                                        className="w-[50%]"
                                    />
                                    <img
                                        src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/ravel.png"
                                        alt="ravel logo"
                                        className="w-[50%]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xl:hidden md:hidden xs:block pt-10 pb-20">
                        <div className="w-full">
                            <h5 className="font-forma font-bold text-primaryBlueDark">
                                {messages.formatMessage({
                                    id: 'consumerPanel',
                                })}
                            </h5>
                            <p className="text-lg">
                                {messages.formatMessage({
                                    id: 'consumerPanelThanks',
                                })}
                            </p>
                        </div>
                        <div className="w-full">
                            <h5 className="font-forma font-bold text-primaryBlueDark">
                                {messages.formatMessage({
                                    id: 'mediaParticipants',
                                })}
                            </h5>
                            <p className="text-lg">
                                {messages.formatMessage({
                                    id: 'mediaParticipantsThanks',
                                })}
                            </p>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-10">
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/national_aboriginal_design_agency.png"
                                alt="NADA logo"
                                className="w-[50%]"
                            />
                            <img
                                src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/ravel.png"
                                alt="ravel logo"
                                className="w-[50%]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                pageAnalitycsId="about-us-page"
                quickLinksOnly={true}
            />
        </div>
    );
}
export default AboutUs;
