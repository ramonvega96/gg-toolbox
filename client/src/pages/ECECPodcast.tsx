import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import TitleContainer from '../components/TitleContainer';
import { useIntl } from 'react-intl';
import TitleAndRouteButton from '../components/TitleAndRouteButton';
import { useState } from 'react';
import Accordion from '../components/Accordion';
import NestedAccordions from '../ggtPodcast/NestedAccordions';
import PodcastLayout from '../ggtPodcast/podcastLayout';

function ECECPodcast() {
    const messages = useIntl();
    const [activeContentIndex, setActiveContentIndex] = useState<number>(-1);

    const accordionContentSet = [
        {
            title: 'Advice for introducing solids in a child care setting',
            duration: '36mins',
            content: (
                <NestedAccordions
                    accordionNestedItems={[
                        {
                            title: 'Part 1: Developmental milestones',
                            duration: '22mins',
                            content: (
                                <PodcastLayout
                                    description="pd1Desc"
                                    spotifyLink="https://open.spotify.com/episode/18lF4SwFdMErH3fBtCymgz?si=s3Soy5dOQpu5hTNvmbbpDA"
                                    youtubeLink="https://youtu.be/DwEy3ch4qNc"
                                    extraResources={[
                                        {
                                            label: 'pd1ER1',
                                            link: 'https://growandgotoolbox.com/digital-resources/lumpy-road-to-solids',
                                        },
                                        {
                                            label: 'pd1ER2',
                                            link: 'https://www.health.gov.au/resources/publications/cooking-for-children-book',
                                        },
                                        {
                                            label: 'pd1ER3',
                                            link: 'https://naqld.org/app/uploads/2020/11/Preparing-First-Foods-Workshop-Manual.pdf',
                                        },
                                        {
                                            label: 'pd1ER4',
                                            link: 'https://heas.health.vic.gov.au/resources/plan-a-menu/menu-planning-for-babies/',
                                        },
                                    ]}
                                />
                            ),
                        },
                        {
                            title: 'Part 2: Introducing solids in child care',
                            duration: '14mins',
                            content: (
                                <PodcastLayout
                                    description="pd2Desc"
                                    spotifyLink="https://open.spotify.com/episode/31Wcf3iFRaKMpTCRiPnBlE?si=J7V1JX6PQpe-pdM3YmpuPg"
                                    youtubeLink="https://youtu.be/oK30pP__HQM"
                                    extraResources={[
                                        {
                                            label: 'pd1ER1',
                                            link: 'https://growandgotoolbox.com/digital-resources/lumpy-road-to-solids',
                                        },
                                        {
                                            label: 'pd1ER2',
                                            link: 'https://www.health.gov.au/resources/publications/cooking-for-children-book',
                                        },
                                        {
                                            label: 'pd1ER3',
                                            link: 'https://naqld.org/app/uploads/2020/11/Preparing-First-Foods-Workshop-Manual.pdf',
                                        },
                                        {
                                            label: 'pd1ER4',
                                            link: 'https://heas.health.vic.gov.au/resources/plan-a-menu/menu-planning-for-babies/',
                                        },
                                    ]}
                                />
                            ),
                        },
                    ]}
                />
            ),
        },
        {
            title: 'Managing fussy eating in Child Care',
            duration: '20mins',
            content: (
                <PodcastLayout
                    description="pd3Desc"
                    spotifyLink="https://open.spotify.com/episode/1vJIv7oqUz8cTPjHZzzZD6?si=J5p-UhhtQa2WTW4VEe1eOA"
                    youtubeLink="https://youtu.be/KgtsosdfaCA"
                    extraResources={[
                        {
                            label: 'pd3ER1',
                            link: 'https://growandgotoolbox.com/search?subcategories=Fussy+Eating',
                        },
                        {
                            label: 'pd3ER2',
                            link: 'https://heas.health.vic.gov.au/resources/promoting-healthy-eating/introducing-new-foods-to-children/',
                        },
                        {
                            label: 'pd3ER3',
                            link: 'https://heas.health.vic.gov.au/resources/promoting-healthy-eating/how-to-introduce-new-foods-to-children-video-series/',
                        },
                        {
                            label: 'pd3ER4',
                            link: 'https://growandgotoolbox.com/search?subcategories=Fussy+Eating',
                        },
                    ]}
                />
            ),
        },
        {
            title: 'Food insecurity in the Child Care Centre',
            duration: '9mins',
            content: (
                <PodcastLayout
                    description="pd4Desc"
                    spotifyLink="https://open.spotify.com/episode/2Rkxpj0UXH0RnKRY1k5H3W?si=XnwSBVDcS3GV8K8c6yicSA"
                    youtubeLink="https://youtu.be/kLYHLqqGi4U"
                    extraResources={[
                        {
                            label: 'pd4ER1',
                            link: 'https://assets.adobe.com/id/urn:aaid:sc:US:6002c3f4-b625-474f-92d0-1424059105e4?view=published',
                        },
                        {
                            label: 'pd4ER2',
                            link: 'https://www.acnc.gov.au/charity/programs/map?classie=487',
                        },
                    ]}
                />
            ),
        },
        {
            title: 'Allergies and intolerances',
            duration: '20mins',
            content: (
                <NestedAccordions
                    accordionNestedItems={[
                        {
                            title: 'Part 1: An Introduction to Food Allergies and Intolerances',
                            duration: '11mins',
                            content: (
                                <PodcastLayout
                                    description="pd5Desc"
                                    spotifyLink="https://open.spotify.com/episode/0o6uCqiJED6utkzfLn42rX?si=mQi8jmPFScaxK5XUBZmr1Q"
                                    youtubeLink="https://youtu.be/nCsE2ZK0kZs"
                                    extraResources={[
                                        {
                                            label: 'pd5ER1',
                                            link: 'https://www.allergyfacts.org.au/?__cf_chl_rt_tk=utFE3oyU_89nPKGBsEFzvhxL5hgjqrQGnBaTqu_SLiw-1709091857-0.0-1554',
                                        },
                                        {
                                            label: 'pd5ER2',
                                            link: 'http://www.preventallergies.com.au',
                                        },
                                    ]}
                                />
                            ),
                        },
                        {
                            title: 'Part 2: Managing allergies & intolerances',
                            duration: '9mins',
                            content: (
                                <PodcastLayout
                                    description="pd6Desc"
                                    spotifyLink="https://open.spotify.com/episode/1tfGmyC8G04b4btWm0y2uP?si=ri9r98AcT7SOETx9KBwv9Q"
                                    youtubeLink="https://youtu.be/3_xDyM-R7Mc"
                                    extraResources={[
                                        {
                                            label: 'pd6ER1',
                                            link: 'https://growandgotoolbox.com/search?subcategories=Allergies+And+Intolerances',
                                        },
                                        {
                                            label: 'pd6ER2',
                                            link: 'http://www.preventallergies.com.au',
                                        },
                                        {
                                            label: 'pd6ER3',
                                            link: 'http://www.allergyaware.com.au',
                                        },
                                    ]}
                                />
                            ),
                        },
                    ]}
                />
            ),
        },
        {
            title: 'Healthcare in the Early Childhood Education and Care Setting',
            duration: '16mins',
            content: (
                <PodcastLayout
                    description="pd7Desc"
                    spotifyLink="https://open.spotify.com/episode/2IWa5kzPsYbhPffTMR2Tgo?si=ywDv1CVYTVe3ayJDV3Kl2A"
                    youtubeLink="https://youtu.be/RJCcPPCmL94"
                    extraResources={[
                        {
                            label: 'pd7ER1',
                            link: 'https://www.growandgotoolbox.com/find-a-health-professional',
                        },
                    ]}
                />
            ),
        },
    ];

    return (
        <div>
            <Header toggleBanner={true} />
            <TitleContainer
                title={messages.formatMessage({ id: 'ececPodcast' })}
                subtitle={messages.formatMessage({ id: 'ececPodcastDesc' })}
            />
            <div className="py-16 xs:px-8 md:px-16 xl:px-36">
                {accordionContentSet.map((item, index: number) => {
                    return (
                        <Accordion
                            key={index}
                            title={
                                <div>
                                    <p className="font-omnes text-left text-xl my-0">
                                        {item.title}
                                    </p>
                                    <p className="font-forma text-left text-xs my-0">
                                        {item.duration}
                                    </p>
                                </div>
                            }
                            content={
                                <div className="w-full bg-slate-100 p-8">
                                    {accordionContentSet[index].content}
                                </div>
                            }
                            index={index}
                            activeIndex={activeContentIndex}
                            setActiveIndex={setActiveContentIndex}
                        />
                    );
                })}
            </div>
            <TitleAndRouteButton
                title={messages.formatMessage({
                    id: 'otherTopics',
                })}
                buttonTitle={messages.formatMessage({
                    id: 'contactUs',
                })}
                route="/contact-us"
                paddingY="py-12"
                borderTop={'secondaryOrange'}
                borderBottom={'secondaryOrange'}
            />
            <Footer pageAnalitycsId="g&g-podcast-page" />
        </div>
    );
}

export default ECECPodcast;
