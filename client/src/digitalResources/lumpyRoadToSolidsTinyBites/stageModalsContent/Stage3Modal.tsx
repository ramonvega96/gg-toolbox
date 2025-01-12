import { useIntl } from 'react-intl';
import ModalLayout, {
    formatText,
    IAccordion,
} from '../sharedComponents/ModalLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import img01 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-food1-tb.png';
import img02 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-food2-tb.png';
import img03 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-food3-tb.png';
import img04 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-food4-tb.png';
import img05 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-food5-tb.png';
import img06 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-food6-tb.png';
import img07 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-food7-tb.png';
import img08 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-food8-tb.png';
import img1 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-bb-food1.png';
import img2 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-bb-food2.png';
import img3 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-bb-food3.png';
import img4 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage4-acc0-food1-tb.png';

function Stage3Modal() {
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
            title: 'stage3-acc1Title',
            textAndButtons: [
                {
                    text: 'stage3-acc1Txt1',
                    buttons: [
                        {
                            topText: 'stage3-acc1Bg1Btn1',
                            bottomText: 'stage3-acc1Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/2b0a0f29-1396-461f-8185-2e098849b673',
                            icon: 'pdf',
                        },
                        {
                            topText: 'stage3-acc1Bg1Btn2',
                            bottomText: 'stage3-acc1Bg1Btn2Sub',
                            link: 'https://youtu.be/QSjr2tz3BT0?si=PAknf0Ngvv6hXckC&t=113',
                            icon: 'video',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage3-acc2Title',
            textAndButtons: [
                {
                    text: 'stage3-acc2Txt1',
                    buttons: [
                        {
                            topText: 'stage3-acc2Bg1Btn1',
                            bottomText: 'stage3-acc2Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/70ec02f0-7db8-45ab-a326-a87fe780f6f3',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage3-acc3Title',
            textAndButtons: [
                {
                    text: 'stage3-acc3Txt1',
                    buttons: [
                        {
                            topText: 'stage3-acc3Bg1Btn1',
                            bottomText: 'stage3-acc3Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/30441ad8-7161-4694-b575-c63da3eb9834',
                            icon: 'pdf',
                        },
                    ],
                },
                {
                    text: 'stage3-acc3Txt2',
                    buttons: [
                        {
                            topText: 'stage3-acc3Bg2Btn1',
                            bottomText: 'stage3-acc3Bg2Btn1Sub',
                            link: 'https://indd.adobe.com/view/70ec02f0-7db8-45ab-a326-a87fe780f6f3',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage3-acc4Title',
            textAndButtons: [
                {
                    text: 'stage3-acc4Txt1',
                    buttons: [
                        {
                            topText: 'stage3-acc4Bg1Btn1',
                            bottomText: 'stage3-acc4Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/84baf61b-0088-4812-9894-dd955615098d',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage3-acc5Title',
            textAndButtons: [
                {
                    text: 'stage3-acc5Txt1',
                    buttons: [],
                },
            ],
            foodPictures: [
                {
                    img: img01,
                    imgAlt: 'Cucumber rings',
                },
                {
                    img: img02,
                    imgAlt: 'Capsicum strips',
                },
                {
                    img: img03,
                    imgAlt: 'Sliced apple',
                },
                {
                    img: img04,
                    imgAlt: 'Sliced pear',
                },
                {
                    img: img05,
                    imgAlt: 'Baby corn',
                },
                {
                    img: img06,
                    imgAlt: 'Bok choy stems',
                },
                {
                    img: img07,
                    imgAlt: 'Asparagus stems',
                },
                {
                    img: img08,
                    imgAlt: 'Tofu cubes',
                },
            ],
        },
    ];

    const bbFoodPictures = [
        {
            img: img1,
            imgAlt: '½ cup of cooked Veggies',
        },
        {
            img: img2,
            imgAlt: '½ of a medium pear',
        },
        {
            img: img3,
            imgAlt: '½ cup of rice',
        },
        {
            img: img4,
            imgAlt: '½ cup of canned chickpeas',
        },
    ];

    const bottomBanner = (
        <div>
            <h1 className="font-gelica font-bold xs:text-base xl:text-xl text-tbSecondaryBlue mb-4">
                {messages.formatMessage({
                    id: 'stage3-bbTitle',
                })}
            </h1>
            {formatText(
                messages.formatMessage({
                    id: 'stage3-bbText',
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
            heading="stage3-tb"
            subHeading="stage3-subHeading"
            description="stage3-description"
            bottomBanner={bottomBanner}
            modalBody={modalBody}
        />
    );

    return getModalContent();
}

export default Stage3Modal;
