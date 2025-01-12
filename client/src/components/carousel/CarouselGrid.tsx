import LanguageCarouselCard, {
    LanguageCarouselCardProps,
} from './LanguageCarouselCard';

import PDCarouselCard, { PDCarouselCardProps } from './PDCarouselCard';

interface CarouselGridProps {
    rows: number;
    cards: LanguageCarouselCardProps[] | PDCarouselCardProps[];
}

const CarouselGrid = (props: CarouselGridProps) => {
    const { rows, cards } = props;

    /**
     * The following are a "type guard functions": meaning they receive
     * an object from an unknown type but confirms if they belong to a
     * specified type. Therefore, the any is required.
     */

    const isLanguageCarouselCard = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        card: any
    ): card is LanguageCarouselCardProps => {
        return card && card.name && card.label;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isPDCarouselCard = (card: any): card is PDCarouselCardProps => {
        return card && card.title && card.description && card.externalLink;
    };

    return (
        // grid of language cards which is 1 or 2 rows high and infinite columns
        <div
            className={`grid ${rows === 1 && 'grid-rows-1'} ${
                rows === 2 && 'grid-rows-2'
            }  grid-flow-col gap-4`}
        >
            {cards.map((term, index) => (
                <div
                    className="m-2"
                    key={`carouser-card-${index}`}
                >
                    {isLanguageCarouselCard(term) && (
                        <LanguageCarouselCard
                            name={term.name}
                            label={term.label}
                        />
                    )}
                    {isPDCarouselCard(term) && (
                        <PDCarouselCard
                            title={term.title}
                            description={term.description}
                            externalLink={term.externalLink}
                            note={term.note}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default CarouselGrid;
