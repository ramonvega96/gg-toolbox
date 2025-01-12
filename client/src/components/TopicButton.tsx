import { useNavigate } from 'react-router-dom';

interface TopicButtonprops {
    term: TopicButtonCard;
    index: number;
    image?: string;
}

export interface RawTopicButtonCard {
    label: string;
    searchQuery?: string;
    externalLink?: string;
}

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
    U[keyof U];
export type TopicButtonCard = RawTopicButtonCard &
    AtLeastOne<Pick<RawTopicButtonCard, 'label'>>;

export const generateURL = (endpoint: string, searchQuery: string) => {
    return `/${endpoint}?${searchQuery}`;
};

const TopicButton = (props: TopicButtonprops) => {
    const { term, index, image } = props;
    const navigate = useNavigate();

    return (
        <button
            key={`topic-button-${index}`}
            id={`topic-button-${term.label}`}
            className="flex flex-col font-omnes bg-white text-primaryBlueDark xs:text-base md:text-xl border-[0.10px] border-primaryGrey flex 
                justify-center items-center drop-shadow-mysm col-full
                h-[18vh] max-h-[200px] min-h-[60px] 
                w-[32vw] max-w-[300px] min-w-[200px] 
                py-[4vw] md:py-10 
                px-[4vw] md:px-[2vw] 
                transition ease-in-out delay-10 hover:!bg-lightGrey whitespace-pre-wrap"
            onClick={() => {
                if (term.searchQuery) {
                    window.scrollTo(0, 0);
                    setTimeout(() => {
                        navigate(
                            generateURL('search', term.searchQuery as string)
                        );
                    }, 200);
                } else if (term.externalLink) {
                    window.open(term.externalLink, '_blank');
                }
            }}
        >
            {image && (
                <img
                    id="grow-and-go-logo"
                    alt="grow and go logo"
                    src={image}
                    className="xs:w-[30px] cursor-pointer"
                />
            )}
            {term.label}
        </button>
    );
};

export default TopicButton;
