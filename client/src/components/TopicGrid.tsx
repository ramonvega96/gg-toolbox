import TopicButton, { TopicButtonCard } from './TopicButton';

/**
 * Props for Link Grid
 *  title - Title for text column
 *  description - Description placed underneath title
 *  topics - Array of topics to navigate to search bar with
 *  color - Background color of grid
 *  language - If topics are language specific or not (applys language filter to search when clicked on)
 */
interface TopicGridInterface {
    title: string;
    description?: string;
    footNote?: string;
    terms: TopicButtonCard[];
    color:
        | 'opaqueOrange'
        | 'opaqueYellow'
        | 'opaqueRed'
        | 'opaqueGreen'
        | 'opaquePink'
        | 'white';
    bottomBorderColor?:
        | 'secondaryBlue'
        | 'secondaryGreen'
        | 'secondaryRed'
        | 'secondaryOrange'
        | 'secondaryYellow'
        | 'secondaryPink'
        | 'tertiaryGreen';
    topBorderColor?:
        | 'secondaryBlue'
        | 'secondaryGreen'
        | 'secondaryRed'
        | 'secondaryOrange'
        | 'secondaryYellow'
        | 'secondaryPink'
        | 'tertiaryGreen';
    centered: boolean;
}

/**
 * This customisable component renders the grid of links for each home page category
 *
 * Each link in the grid takes the user straight to the search bar and
 * searches for the category that was clicked on
 */
const TopicGrid = (props: TopicGridInterface) => {
    const {
        title,
        description,
        footNote,
        terms,
        color,
        bottomBorderColor,
        topBorderColor,
        centered,
    } = props;

    /**
     * This functions maps the given color prop name to it's matching hex code
     * This is due to Tailwind being unable to dynamically import the colors using bg-${color}
     */
    const colorSwitch = (): string => {
        switch (color) {
            case 'opaqueOrange':
                return 'bg-[#f8952a33]';
            case 'opaqueYellow':
                return 'bg-[#ffce3933]';
            case 'opaqueRed':
                return 'bg-[#de4b3633]';
            case 'opaqueGreen':
                return 'bg-[#1e9b5033]';
            case 'opaquePink':
                return 'bg-[#f3777833]';
            case 'white':
                return 'bg-white';
            default:
                return '';
        }
    };

    const currColor = colorSwitch();

    return (
        <div
            className={`${currColor} xs:px-16 md:px-20 xl:px-36 relative w-full flex flex-col py-10 mr-8
            ${!centered ? 'mymd:flex-row' : ''}
            ${bottomBorderColor && `border-b-8 border-${bottomBorderColor}`}
            ${topBorderColor && `border-t-8 border-${topBorderColor}`}`}
        >
            {!centered && (
                <div className="xs:w-full md:w-full xl:w-1/3 max-w-lg flex flex-col text-left justify-center py-10 text-primaryBlueDark">
                    <h1
                        data-cy="topics-header"
                        className="mb-8 font-omnes font-bold xl:text-3xl md:text-base max-md:text-3xl"
                    >
                        {title}
                    </h1>
                    {description && (
                        <span
                            data-cy="topics-description"
                            className="font-forma xl:text-xl md:text-sm max-md:text-xl tracking-normal"
                        >
                            {description}
                        </span>
                    )}
                    {footNote && (
                        <span
                            data-cy="topics-description"
                            className="font-forma xl:text-base md:text-sm max-md:text-base tracking-normal italic mt-4"
                        >
                            {footNote}
                        </span>
                    )}
                </div>
            )}
            {centered && (
                <div className="w-full flex flex-col text-center justify-center py-10 text-primaryBlueDark">
                    <h1
                        data-cy="topics-header"
                        className="mb-8 font-omnes font-bold xl:text-3xl md:text-base max-md:text-3xl"
                    >
                        {title}
                    </h1>
                    {description && (
                        <span
                            data-cy="topics-description"
                            className="font-forma xl:text-xl md:text-sm max-md:text-xl tracking-normal"
                        >
                            {description}
                        </span>
                    )}
                </div>
            )}
            <div
                className={`w-full 
                    flex flex-wrap gap-8 items-center justify-center relative z-[2]`}
            >
                {terms.map((term, index) => {
                    return (
                        <TopicButton
                            key={`topic-button-${index}`}
                            term={term}
                            index={index}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default TopicGrid;
