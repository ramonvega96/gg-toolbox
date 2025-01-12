import { useIntl } from 'react-intl';
import { useRef } from 'react';
import TextArrowButton, {
    TextArrowButtonInterface,
} from '../../sharedComponents/TextArrowButton';
import { formatText } from './ModalLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

interface TextAndButtonsCombo {
    text: string;
    buttons: TextArrowButtonInterface[];
    sidePicture?: Picture;
}

interface Picture {
    img: string;
    imgAlt: string;
    position?: string;
}

export interface AccordionBody {
    textAndButtons: TextAndButtonsCombo[];
    foodPictures?: Picture[];
    customComponent?: React.ReactNode;
}

function AccordionBodyLayout(accordionBody: AccordionBody) {
    const messages = useIntl();
    const carouselElement = useRef<HTMLDivElement>(null);

    const scrollRight = () => {
        if (carouselElement.current) {
            carouselElement.current.scrollTo({
                left: carouselElement.current.scrollLeft + 350,
                behavior: 'smooth',
            });
        }
    };

    const scrollLeft = () => {
        if (carouselElement.current) {
            carouselElement.current.scrollTo({
                left: carouselElement.current.scrollLeft - 350,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex xs:flex-col xl:flex-row gap-x-4 gap-y-4">
                <div
                    className={`${
                        accordionBody.foodPictures
                            ? 'xs:w-full xl:w-3/5'
                            : 'w-full'
                    } `}
                >
                    {accordionBody.textAndButtons.map(
                        (
                            textAndButtons: TextAndButtonsCombo,
                            index: number
                        ) => {
                            return (
                                <div
                                    key={index}
                                    className="flex xs:flex-col xl:flex-row mb-4"
                                >
                                    <div
                                        className={`${
                                            textAndButtons.sidePicture
                                                ? 'xs:w-full xl:w-3/5'
                                                : 'w-full'
                                        }`}
                                    >
                                        {formatText(
                                            messages.formatMessage({
                                                id: textAndButtons.text,
                                            })
                                        )}
                                        {textAndButtons.sidePicture && (
                                            <div className="xl:hidden xs:flex justify-center items-center w-full mb-4">
                                                <img
                                                    alt={
                                                        textAndButtons
                                                            .sidePicture.imgAlt
                                                    }
                                                    src={
                                                        textAndButtons
                                                            .sidePicture.img
                                                    }
                                                    className={`w-44 h-44 rounded-full object-cover ${
                                                        textAndButtons
                                                            .sidePicture
                                                            .position
                                                            ? textAndButtons
                                                                  .sidePicture
                                                                  .position
                                                            : 'object-center'
                                                    }`}
                                                />
                                            </div>
                                        )}
                                        {textAndButtons.buttons.map(
                                            (
                                                btn: TextArrowButtonInterface,
                                                btnIndex: number
                                            ) => (
                                                <div
                                                    key={btnIndex}
                                                    className={`${
                                                        accordionBody.foodPictures ||
                                                        textAndButtons.sidePicture
                                                            ? 'w-full'
                                                            : 'xs:w-full md:w-3/4'
                                                    } `}
                                                >
                                                    <TextArrowButton
                                                        topText={messages.formatMessage(
                                                            {
                                                                id: btn.topText,
                                                            }
                                                        )}
                                                        bottomText={
                                                            btn.bottomText &&
                                                            messages.formatMessage(
                                                                {
                                                                    id: btn.bottomText,
                                                                }
                                                            )
                                                        }
                                                        link={btn.link}
                                                        icon={btn.icon}
                                                        coloursStyling="bg-tbPink hover:bg-tbPinkDark"
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                    {textAndButtons.sidePicture && (
                                        <div className="xs:hidden xl:flex justify-center items-center w-2/5">
                                            <img
                                                alt={
                                                    textAndButtons.sidePicture
                                                        .imgAlt
                                                }
                                                src={
                                                    textAndButtons.sidePicture
                                                        .img
                                                }
                                                className={`w-52 h-52 rounded-full object-cover ${
                                                    textAndButtons.sidePicture
                                                        .position
                                                        ? textAndButtons
                                                              .sidePicture
                                                              .position
                                                        : 'object-center'
                                                }`}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        }
                    )}
                </div>
                {accordionBody.foodPictures && (
                    <div className="max-xl:hidden w-2/5">
                        <div className="grid grid-cols-2">
                            {accordionBody.foodPictures.map(
                                (foodPic: Picture, index: number) => (
                                    <div
                                        className="flex flex-col items-center mb-4"
                                        key={index}
                                    >
                                        <img
                                            alt={foodPic.imgAlt}
                                            src={foodPic.img}
                                            className="w-32 h-32 rounded-full object-cover mb-2"
                                        />
                                        <p className="m-0 font-roboto text-sm text-tbSecondaryBlue text-center">
                                            {foodPic.imgAlt}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
                {accordionBody.foodPictures && (
                    <div
                        className="xl:hidden flex justify-center items-center"
                        data-cy="food-carousel"
                    >
                        <button
                            id="carousel-spin-left"
                            onClick={() => scrollLeft()}
                        >
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                size="1x"
                                className="text-tbTertiaryBlue"
                            />
                        </button>
                        <div
                            ref={carouselElement}
                            className="flex overflow-x-scroll overflow-y-hidden scroll-smooth no-scrollbar snap-mandatory snap-x"
                        >
                            {accordionBody.foodPictures.map(
                                (foodPic: Picture, index: number) => (
                                    <div
                                        className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center"
                                        key={index}
                                    >
                                        <img
                                            alt={foodPic.imgAlt}
                                            src={foodPic.img}
                                            className="w-32 h-32 rounded-full mb-2 object-cover"
                                        />
                                        <p className="m-0 font-roboto text-sm text-tbSecondaryBlue text-center">
                                            {foodPic.imgAlt}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                        <button
                            id="carousel-spin-right"
                            onClick={() => scrollRight()}
                        >
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                size="1x"
                                className="text-tbTertiaryBlue"
                            />
                        </button>
                    </div>
                )}
            </div>
            {accordionBody.customComponent && accordionBody.customComponent}
        </div>
    );
}

export default AccordionBodyLayout;
