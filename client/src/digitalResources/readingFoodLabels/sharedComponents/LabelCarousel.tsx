import { PlacesType, Tooltip } from 'react-tooltip';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export interface labelKit {
    label: string;
    subLabel?: string;
    tooltipText: string;
}

interface LabelCarouselInterface {
    labelsArr: labelKit[];
    dataTooltipId: string;
    tooltipPosition: string;
}

const LabelCarousel = (props: LabelCarouselInterface) => {
    const { labelsArr, dataTooltipId, tooltipPosition } = props;

    const [isMobileView, setIsMobileView] = useState(false);
    const [labelArrIndex, setLabelArrIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 1280);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const next = () => {
        if (labelArrIndex < labelsArr.length - 1)
            setLabelArrIndex(labelArrIndex + 1);
        else setLabelArrIndex(0);
    };

    const previous = () => {
        if (labelArrIndex > 0) setLabelArrIndex(labelArrIndex - 1);
        else setLabelArrIndex(labelsArr.length - 1);
    };

    return (
        <div
            className={`flex gap-2 ${
                labelsArr[labelArrIndex].subLabel ? 'items-center' : 'items-end'
            } justify-center`}
        >
            <button
                className="text-white"
                onClick={() => previous()}
                data-cy="carousel-btn-previous"
            >
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="xs:text-lg md:text-xl xl:text-2xl"
                />
            </button>
            <div className="flex flex-col items-center justify-center">
                <p
                    className="font-omnes text-white xs:text-xl xl:text-2xl m-0 whitespace-nowrap"
                    data-cy={`${dataTooltipId}-label-${labelArrIndex}`}
                >
                    {labelsArr[labelArrIndex].label}
                </p>
                {labelsArr[labelArrIndex].subLabel && (
                    <p className="h-0 font-omnes text-white xs:text-xs md:text-sm mx-0 -mt-2 whitespace-nowrap">
                        {labelsArr[labelArrIndex].subLabel}
                    </p>
                )}
            </div>
            <button
                className="text-white"
                onClick={() => next()}
                data-cy="carousel-btn-next"
            >
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className="xs:text-lg md:text-xl xl:text-2xl"
                />
            </button>
            <div className="relative float-left right-[5px] bottom-[5px]">
                <div
                    className="absolute text-center rounded-full bg-white xs:w-4 xs:h-4 md:w-5 md:h-5 cursor-pointer"
                    data-tooltip-id={`${dataTooltipId}-tooltip-${labelArrIndex}`}
                    data-tooltip-content={labelsArr[labelArrIndex].tooltipText}
                    data-cy="carousel-info-btn"
                >
                    <p className="text-black xs:text-sm md:text-base m-0">i</p>
                </div>
                <Tooltip
                    id={`${dataTooltipId}-tooltip-${labelArrIndex}`}
                    className="text-black font-sans text-base"
                    opacity={1}
                    style={{
                        backgroundColor: '#F2F2F2',
                        width: '350px',
                        zIndex: 1,
                    }}
                    place={tooltipPosition as PlacesType}
                    openOnClick={isMobileView}
                />
            </div>
        </div>
    );
};

export default LabelCarousel;
