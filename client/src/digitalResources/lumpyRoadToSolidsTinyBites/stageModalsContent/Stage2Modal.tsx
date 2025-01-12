import { useIntl } from 'react-intl';
import ModalLayout, {
    formatText,
    IAccordion,
} from '../sharedComponents/ModalLayout';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import img01 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-food8.png';
import img02 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage2-food2-tb.png';
import img03 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-food4.png';
import img04 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-food10.png';
import img05 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage2-food5-tb.png';
import img06 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-food7.png';
import img07 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage2-food7-tb.png';
import img08 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage2-food8.png';
import img09 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-food0.png';
import img10 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage2-food6.png';
import img1 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage2-bb-food1.png';
import img2 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage2-bb-food2.png';
import img3 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-bb-food3.png';
import img4 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage2-bb-food4.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

function Stage2Modal() {
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

    const modalBody: IAccordion[] = [
        {
            title: 'stage2-acc1Title',
            textAndButtons: [
                {
                    text: 'stage2-acc1Txt1',
                    buttons: [
                        {
                            topText: 'stage2-acc1Bg1Btn1',
                            bottomText: 'stage2-acc1Bg1Btn1Sub',
                            link: 'https://goodforkids.nsw.gov.au/media/2254/iron-and-vitamin-c-v4.pdf',
                            icon: 'pdf',
                        },
                    ],
                },
                {
                    text: 'stage2-acc1Txt2',
                    buttons: [
                        {
                            topText: 'stage2-acc1Bg2Btn1',
                            bottomText: 'stage2-acc1Bg2Btn1Sub',
                            link: 'https://indd.adobe.com/view/fd0063ba-0619-4275-be95-d497d7a86970',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
            foodPictures: [
                {
                    img: img01,
                    imgAlt: 'Steak strips',
                },
                {
                    img: img02,
                    imgAlt: 'Lamb chops',
                },
                {
                    img: img03,
                    imgAlt: 'Chicken minced',
                },
                {
                    img: img04,
                    imgAlt: 'Omelette strips',
                },
                {
                    img: img05,
                    imgAlt: 'Flaked fish',
                },
                {
                    img: img06,
                    imgAlt: 'Broccoli',
                },
                {
                    img: img07,
                    imgAlt: 'Green beans',
                },
                {
                    img: img08,
                    imgAlt: 'Nut butter',
                },
                {
                    img: img09,
                    imgAlt: 'Mashed beans',
                },
                {
                    img: img10,
                    imgAlt: 'Dahl',
                },
            ],
        },
        {
            title: 'stage2-acc2Title',
            textAndButtons: [
                {
                    text: 'stage2-acc2Txt1',
                    buttons: [
                        {
                            topText: 'stage2-acc2Bg1Btn1',
                            bottomText: 'stage2-acc2Bg1Btn1Sub',
                            link: 'https://preventallergies.org.au/wp-content/uploads/2024/04/Food_Ideas_For_Babies_7_to_9_Months.pdf',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage2-acc3Title',
            textAndButtons: [
                {
                    text: 'stage2-acc3Txt1',
                    buttons: [
                        {
                            topText: 'stage2-acc3Bg1Btn1',
                            bottomText: 'stage2-acc3Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/97511ed8-127c-40b4-ac3b-3a1c812776e0',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage2-acc4Title',
            textAndButtons: [
                {
                    text: 'stage2-acc4Txt1',
                    buttons: [
                        {
                            topText: 'stage2-acc4Bg1Btn1',
                            bottomText: 'stage2-acc4Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/30441ad8-7161-4694-b575-c63da3eb9834',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
    ];

    const bbFoodPictures = [
        {
            img: img1,
            imgAlt: '½ cup of cooked wombok',
        },
        {
            img: img2,
            imgAlt: '¼ of a medium pear',
        },
        {
            img: img3,
            imgAlt: '½ cup of rice',
        },
        {
            img: img4,
            imgAlt: '2 beef strips',
        },
    ];

    const bottomBanner = (
        <div>
            <h1 className="font-gelica font-bold xs:text-base xl:text-xl text-tbSecondaryBlue mb-4">
                {messages.formatMessage({
                    id: 'stage2-bbTitle',
                })}
            </h1>
            {formatText(
                messages.formatMessage({
                    id: 'stage2-bbText',
                })
            )}
            <div className="max-md:hidden flex gap-x-4">
                {bbFoodPictures.map((foodPic, index) => (
                    <div
                        className="flex flex-col items-center mb-4"
                        key={index}
                    >
                        <img
                            alt={foodPic.imgAlt}
                            src={foodPic.img}
                            className="w-32 rounded-full mb-2"
                        />
                        <p className="w-32 m-0 font-roboto text-sm text-tbSecondaryBlue text-center">
                            {foodPic.imgAlt}
                        </p>
                    </div>
                ))}
            </div>
            <div
                className="md:hidden flex justify-center items-center"
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
                    {bbFoodPictures.map((foodPic, index) => (
                        <div
                            className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center"
                            key={index}
                        >
                            <img
                                alt={foodPic.imgAlt}
                                src={foodPic.img}
                                className="w-36 rounded-full mb-2"
                            />
                            <p className="w-36 m-0 font-roboto text-sm text-tbSecondaryBlue text-center">
                                {foodPic.imgAlt}
                            </p>
                        </div>
                    ))}
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
        </div>
    );

    const getModalContent = () => (
        <ModalLayout
            heading="stage2-tb"
            subHeading="stage2-subHeading"
            description="stage2-description"
            bottomBanner={bottomBanner}
            modalBody={modalBody}
        />
    );

    return getModalContent();
}

export default Stage2Modal;
