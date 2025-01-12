import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

interface CarouselInterface {
    backgroundColor: string;
    element: JSX.Element;
    header?: string;
    description?: string;
    footNote?: string;
}

/**
 * This component renders a carousel of elements
 * @param description: description of the carousel
 * @param backgroundColor: background color of the carousel
 * @param element: JSX element to be rendered in the carousel
 * @returns JSX element
 */

const Carousel = ({
    backgroundColor,
    element,
    header,
    description,
    footNote,
}: CarouselInterface) => {
    const carouselElement = useRef<HTMLDivElement>(null);

    return (
        <div className={`bg-[${backgroundColor}] py-10 `}>
            <div className="flex flex-col items-center">
                {header && (
                    <h1 className="text-center w-2/3 font-omnes text-primaryBlueDark font-bold mwymd:text-3xl text-3xl mt-4 mb-12">
                        {header}
                    </h1>
                )}
                {description && (
                    <p className="text-center w-2/3 text-xl py-4 text-primaryBlueDark">
                        {description}
                    </p>
                )}
            </div>
            <div className="flex justify-between items-center relative overflow-hidden">
                <button
                    className={`p-2 h-24 z-[10] md:mr-12 max-md:ml-0 md:ml-24`}
                    id="carousel-spin-left"
                    onClick={() => {
                        if (carouselElement.current) {
                            if (carouselElement.current.scrollLeft === 0) {
                                return;
                            } else {
                                carouselElement.current.scrollLeft -= 315;
                            }
                        }
                    }}
                >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        size="2x"
                    />
                </button>
                <div
                    id="carousel"
                    className="w-full overflow-x-scroll scroll-smooth no-scrollbar"
                    ref={carouselElement}
                >
                    {element}
                </div>
                <button
                    className={`p-2 h-24 z-[10] md:ml-12 max-md:mr-0 md:mr-24`}
                    id="carousel-spin-right"
                    onClick={() => {
                        if (carouselElement.current) {
                            if (
                                carouselElement.current.scrollWidth -
                                    carouselElement.current.scrollLeft ===
                                carouselElement.current.clientWidth
                            ) {
                                return;
                            } else {
                                carouselElement.current.scrollLeft += 325;
                            }
                        }
                    }}
                >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        size="2x"
                    />
                </button>
            </div>
            <div className="flex flex-col items-center">
                {footNote && (
                    <p className="text-center w-2/3 text-s py-4 text-primaryBlueDark italic">
                        {footNote}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Carousel;
