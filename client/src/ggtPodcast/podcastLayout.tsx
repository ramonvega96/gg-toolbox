import { useIntl } from 'react-intl';
import TopicButton from '../components/TopicButton';
import spotify from '../assets/images/graphics/spotify.png';
import youtube from '../assets/images/graphics/youtube.png';

interface ExtraResource {
    label: string;
    link: string;
}

export interface IPodcastLayout {
    description: string;
    spotifyLink: string;
    youtubeLink: string;
    extraResources: ExtraResource[];
}

function PodcastLayout({
    description,
    spotifyLink,
    youtubeLink,
    extraResources,
}: IPodcastLayout) {
    const messages = useIntl();

    return (
        <div
            className="text-primaryBlueDark"
            data-cy={`podcast-${description}`}
        >
            <p className="font-forma text-left md:text-xl">
                {messages.formatMessage({
                    id: description,
                })}
            </p>
            <p className="font-forma font-bold text-left md:text-xl mb-0">
                {messages.formatMessage({
                    id: 'listenOn',
                })}
            </p>
            <div className="flex flex-wrap md:flex-row py-8 gap-4">
                <TopicButton
                    term={{ label: 'Spotify', externalLink: spotifyLink }}
                    index={0}
                    image={spotify}
                />
                <TopicButton
                    term={{ label: 'Youtube', externalLink: youtubeLink }}
                    index={2}
                    image={youtube}
                />
            </div>

            {extraResources.length > 0 && (
                <div>
                    <p className="font-forma font-bold text-left md:text-xl my-0">
                        {messages.formatMessage({
                            id: 'extraResources',
                        })}
                    </p>
                    {extraResources.map((resource, index) => {
                        return (
                            <div
                                className="pt-2"
                                key={index}
                            >
                                <a
                                    className="text-primaryBlueDark font-forma text-left md:text-xl break-words"
                                    target="_blank"
                                    href={resource.link}
                                    rel="noreferrer"
                                >
                                    {messages.formatMessage({
                                        id: resource.label,
                                    })}
                                </a>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default PodcastLayout;
