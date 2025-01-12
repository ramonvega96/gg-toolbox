import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

interface PagingComponentInterface {
    actualPage: number;
    pagesCount: number;
    setActualPage: (pageNum: number) => void;
    setReplaceResults: (replaceResults: boolean) => void;
}

function PagingComponent({
    actualPage,
    pagesCount,
    setActualPage,
    setReplaceResults,
}: PagingComponentInterface) {
    const carouselElement = useRef<HTMLDivElement>(null);
    const pageMarkersRefs = useRef<HTMLDivElement[] | null[]>([]);

    const updateSelectedPage = (selectedPage: number) => {
        setReplaceResults(true);
        setActualPage(selectedPage);

        pageMarkersRefs.current[selectedPage - 1]?.scrollIntoView({
            block: 'nearest',
            inline: 'start',
        });

        setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
            });
        }, 200);
    };

    function renderPagesMarkers() {
        const numberArray = Array.from(
            { length: pagesCount },
            (_, index) => index + 1
        );

        return numberArray.map((num, index) => {
            return (
                <div
                    className={`rounded-full cursor-pointer h-8 w-8 flex items-center justify-center ${
                        num === actualPage ? 'bg-lightGrey' : 'bg-white'
                    }`}
                    key={`page-marker-${num}`}
                    id={`page-marker-${num}`}
                    onClick={() => {
                        updateSelectedPage(num);
                    }}
                    ref={(ref) => (pageMarkersRefs.current[index] = ref)}
                >
                    <span className="text-primaryBlueDark font-bold">
                        {num}
                    </span>
                </div>
            );
        });
    }

    return (
        <div className="w-2/4 min-w-[200px] flex justify-between relative overflow-hidden">
            <button
                className={`p-2 h-16 z-[10] mx-2`}
                id="paging-carousel-spin-left"
                onClick={() => {
                    if (actualPage > 1) updateSelectedPage(actualPage - 1);
                }}
            >
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    size="1x"
                />
            </button>
            <div
                id="paging-component"
                className="flex items-center overflow-x-scroll scroll-smooth no-scrollbar py-2"
                ref={carouselElement}
            >
                <div className="w-full grid grid-rows-1 grid-flow-col gap-3">
                    {renderPagesMarkers()}
                </div>
            </div>
            <button
                className={`p-2 h-16 z-[10] mx-2`}
                id="paging-carousel-spin-right"
                onClick={() => {
                    if (actualPage < pagesCount)
                        updateSelectedPage(actualPage + 1);
                }}
            >
                <FontAwesomeIcon
                    icon={faChevronRight}
                    size="1x"
                />
            </button>
        </div>
    );
}

export default PagingComponent;
