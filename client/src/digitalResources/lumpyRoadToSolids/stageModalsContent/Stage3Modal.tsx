import { RefObject, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import Accordion from '../../../components/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { formatText } from './Stage2Modal';

function Stage3Modal() {
    const messages = useIntl();

    const [activeContentIndex, setActiveContentIndex] = useState<number>(0);
    const [isMobileView, setIsMobileView] = useState(false);
    const firstCarouselElement = useRef<HTMLDivElement>(null);
    const secondCarouselElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 1280);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const formatUL = (textBullets: string[], textClass: string) => {
        return (
            <div>
                <ul className="list-disc">
                    {textBullets.map((bulletContent, index) => {
                        return (
                            <li key={index}>
                                <p
                                    className={`font-forma text-base mb-0 ${textClass}`}
                                >
                                    {formatText(bulletContent)}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    const scrollRight = (carouselElement: RefObject<HTMLDivElement>) => {
        if (carouselElement.current) {
            carouselElement.current.scrollTo({
                left: carouselElement.current.scrollLeft + 250,
                behavior: 'smooth',
            });
        }
    };

    const scrollLeft = (carouselElement: RefObject<HTMLDivElement>) => {
        if (carouselElement.current) {
            carouselElement.current.scrollTo({
                left: carouselElement.current.scrollLeft - 250,
                behavior: 'smooth',
            });
        }
    };

    const section0Content = (
        <div className="xs:p-4 md:p-8 xl:py-16 xl:px-20">
            <div className="xl:flex">
                <div
                    className="xl:w-1/2"
                    data-cy="section0-foods-ul"
                >
                    {formatUL(
                        messages
                            .formatMessage({ id: 'stage3ModalContent0Text' })
                            .split(':'),
                        ''
                    )}
                </div>
                <div className="xs:hidden xl:flex flex-col justify-center gap-y-8 xl:w-1/2">
                    <div className="flex gap-x-4">
                        <div className="relative float-left xl:right-[5px] xl:bottom-[25px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="section0-food0-label"
                            >
                                Mashed kidney beans
                            </p>
                        </div>
                        <div
                            data-cy="section0-food0-img"
                            className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food0.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                        <div className="relative float-left xl:right-[0px] xl:bottom-[25px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="section0-food1-label"
                            >
                                Minced Beef
                            </p>
                        </div>
                        <div
                            data-cy="section0-food1-img"
                            className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food1.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                        <div className="relative float-left xl:right-[0px] xl:bottom-[25px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="section0-food2-label"
                            >
                                Mashed Broccoli
                            </p>
                        </div>
                        <div
                            data-cy="section0-food2-img"
                            className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food2.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                    </div>
                    <div className="flex gap-x-4">
                        <div className="relative float-left xl:right-[0px] xl:bottom-[25px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="section0-food3-label"
                            >
                                Dahl (lentils)
                            </p>
                        </div>
                        <div
                            data-cy="section0-food3-img"
                            className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food6.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                        <div className="relative float-left xl:right-[0px] xl:bottom-[25px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="section0-food4-label"
                            >
                                Minced chicken
                            </p>
                        </div>
                        <div
                            data-cy="section0-food4-img"
                            className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food4.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                        <div className="relative float-left xl:right-[0px] xl:bottom-[25px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="section0-food5-label"
                            >
                                Flaked fish
                            </p>
                        </div>
                        <div
                            data-cy="section0-food5-img"
                            className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food5.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                    </div>
                </div>
                <div
                    className="xl:hidden flex justify-center items-center"
                    data-cy="section0-food-carousel"
                >
                    <button
                        id="section0-carousel-spin-left"
                        onClick={() => scrollLeft(firstCarouselElement)}
                    >
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            size="2x"
                        />
                    </button>
                    <div
                        ref={firstCarouselElement}
                        className="flex overflow-x-scroll overflow-y-hidden scroll-smooth no-scrollbar snap-mandatory snap-x"
                    >
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="section0-food0-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food0.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="section0-food0-label"
                            >
                                Mashed kidney beans
                            </span>
                        </div>
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="section0-food1-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food1.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="section0-food1-label"
                            >
                                Minced Beef
                            </span>
                        </div>
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="section0-food2-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food2.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="section0-food2-label"
                            >
                                Mashed Broccoli
                            </span>
                        </div>
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="section0-food3-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food6.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="section0-food3-label"
                            >
                                Dahl (lentils)
                            </span>
                        </div>
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="section0-food4-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food4.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="section0-food4-label"
                            >
                                Minced chicken
                            </span>
                        </div>
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="section0-food5-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food5.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="section0-food5-label"
                            >
                                Flaked fish
                            </span>
                        </div>
                    </div>
                    <button
                        id="section0-carousel-spin-right"
                        onClick={() => scrollRight(firstCarouselElement)}
                    >
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            size="2x"
                        />
                    </button>
                </div>
            </div>
            <p className="text-base mb-0 mt-2">
                {messages.formatMessage({ id: 'ironRichFoods' })}
            </p>
            <p className="text-base mb-0">
                {messages.formatMessage({ id: 'ironRichFoodsBolded' })}
            </p>
        </div>
    );

    const section1Content = (
        <div className="xs:p-4 md:p-8 xl:py-16 xl:px-20">
            <div className="xl:flex">
                <div
                    className="xl:w-1/2"
                    data-cy="section1-foods-ul"
                >
                    {formatUL(
                        messages
                            .formatMessage({ id: 'stage3ModalContent1Text' })
                            .split(':'),
                        ''
                    )}
                </div>
                <div className="xs:hidden xl:flex flex-col justify-center gap-y-6 xl:w-1/2">
                    <div className="flex gap-x-4 justify-center">
                        <div className="relative float-left xl:right-[0px] xl:bottom-[25px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="section1-food0-label"
                            >
                                Toast soldiers
                            </p>
                        </div>
                        <div
                            data-cy="section1-food0-img"
                            className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food6.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                        <div className="relative float-left xl:right-[0px] xl:bottom-[45px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="section1-food1-label"
                            >
                                Cooked broccoli & cauliflower
                            </p>
                        </div>
                        <div
                            data-cy="section1-food1-img"
                            className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food7.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                    </div>
                    <div className="flex gap-x-4 justify-center">
                        <div className="relative float-left xl:right-[0px] xl:bottom-[20px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="section1-food2-label"
                            >
                                Steak strips
                            </p>
                        </div>
                        <div
                            data-cy="section1-food2-img"
                            className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food8.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                        <div className="relative float-left xl:right-[0px] xl:bottom-[20px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="section1-food3-label"
                            >
                                Large pasta
                            </p>
                        </div>
                        <div
                            data-cy="section1-food3-img"
                            className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food9.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                        <div className="relative float-left xl:right-[0px] xl:bottom-[20px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="section1-food4-label"
                            >
                                Omelette strips
                            </p>
                        </div>
                        <div
                            data-cy="section1-food4-img"
                            className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food10.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                    </div>
                    <div className="flex gap-x-4 justify-center">
                        <div className="relative float-left xl:right-[0px] xl:bottom-[20px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="section1-food5-label"
                            >
                                Watermelon
                            </p>
                        </div>
                        <div
                            data-cy="section1-food5-img"
                            className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food11.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                        <div className="relative float-left xl:right-[0px] xl:bottom-[20px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="section1-food6-label"
                            >
                                Pear
                            </p>
                        </div>
                        <div
                            data-cy="section1-food6-img"
                            className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food12.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                    </div>
                </div>
                <div
                    className="xl:hidden flex justify-center items-center"
                    data-cy="section1-food-carousel"
                >
                    <button
                        id="section1-carousel-spin-left"
                        onClick={() => scrollLeft(secondCarouselElement)}
                    >
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            size="2x"
                        />
                    </button>
                    <div
                        ref={secondCarouselElement}
                        className="flex overflow-x-scroll overflow-y-hidden scroll-smooth no-scrollbar snap-mandatory snap-x"
                    >
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="section1-food0-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food6.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="section1-food0-label"
                            >
                                Toast soldiers
                            </span>
                        </div>
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="section1-food1-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food7.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="section1-food1-label"
                            >
                                Cooked broccoli & cauliflower
                            </span>
                        </div>
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="section1-food2-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food8.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="section1-food2-label"
                            >
                                Steak strips
                            </span>
                        </div>
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="section1-food3-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food9.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="section1-food3-label"
                            >
                                Large pasta
                            </span>
                        </div>
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="section1-food4-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food10.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="section1-food4-label"
                            >
                                Omelette strips
                            </span>
                        </div>
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="section1-food5-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food11.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="section1-food5-label"
                            >
                                Watermelon
                            </span>
                        </div>
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="section1-food6-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food12.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="section1-food6-label"
                            >
                                Pear
                            </span>
                        </div>
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="section1-food7-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food13.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="section1-food7-label"
                            >
                                Beef mince
                            </span>
                        </div>
                    </div>
                    <button
                        id="section1-carousel-spin-right"
                        onClick={() => scrollRight(secondCarouselElement)}
                    >
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            size="2x"
                        />
                    </button>
                </div>
            </div>
            <p className="text-base mb-0 mt-2">
                {messages.formatMessage({ id: 'ironRichFoods' })}
            </p>
            <p className="text-base mb-0">
                {messages.formatMessage({ id: 'ironRichFoodsBolded' })}
            </p>
        </div>
    );

    const modalContent = [
        {
            title: 'Food examples for spoon-fed babies',
            content: section0Content,
        },
        {
            title: 'Finger food examples for baby led weaning',
            content: section1Content,
        },
    ];

    const getBrowserContent = () => {
        return (
            <div className="flex-col items-center mt-8">
                <div className="xl:flex xl:px-24 xl:gap-x-12">
                    <div className="w-1/2">
                        <p data-cy="modal-text1">
                            {formatText(
                                messages.formatMessage({
                                    id: 'stage3ModalHeaderText0',
                                })
                            )}
                        </p>
                        <p data-cy="modal-text2">
                            {messages.formatMessage({
                                id: 'stage3ModalHeaderText1',
                            })}
                        </p>
                    </div>
                    <div className="w-1/2">
                        <p data-cy="modal-text3">
                            {messages.formatMessage({
                                id: 'stage3ModalHeaderText2',
                            })}
                        </p>
                        <div className="flex items-center justify-center gap-x-2">
                            <div
                                data-cy="modal-baby1"
                                className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-baby1.jpg")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <div
                                data-cy="modal-baby2"
                                className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-baby2.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <div
                                data-cy="modal-baby3"
                                className='w-28 h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-baby3.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-row gap-x-1 h-[50px]">
                    {modalContent.map((item, index: number) => {
                        return (
                            <div
                                className={`tab text-center leading-4 text-white font-omnes p-2 w-1/2 h-full ${
                                    activeContentIndex === index
                                        ? 'bg-primaryBlue'
                                        : 'bg-primaryBlueDark'
                                }`}
                                onClick={() => setActiveContentIndex(index)}
                                key={index}
                                data-cy="modal-tab"
                            >
                                {item.title}
                            </div>
                        );
                    })}
                </div>
                <div className="w-full bg-slate-100">
                    {activeContentIndex !== -1 &&
                        modalContent[activeContentIndex].content}
                </div>
            </div>
        );
    };

    const getMobileContent = () => {
        return (
            <div className="mt-8 xs:px-6 md:px-16">
                <div>
                    <p data-cy="modal-text1">
                        {formatText(
                            messages.formatMessage({
                                id: 'stage3ModalHeaderText0',
                            })
                        )}
                    </p>
                    <p data-cy="modal-text2">
                        {messages.formatMessage({
                            id: 'stage3ModalHeaderText1',
                        })}
                    </p>
                    <p data-cy="modal-text3">
                        {messages.formatMessage({
                            id: 'stage3ModalHeaderText2',
                        })}
                    </p>
                    <div className="flex items-center justify-center gap-x-2">
                        <div
                            data-cy="modal-baby1"
                            className='xs:w-28 xs:h-28 md:w-32 md:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-baby1.jpg")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                        <div
                            data-cy="modal-baby2"
                            className='xs:w-28 xs:h-28 md:w-32 md:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-baby3.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                    </div>
                    <div className="flex items-center justify-center gap-x-2">
                        <div
                            data-cy="modal-baby3"
                            className='xs:w-28 xs:h-28 md:w-32 md:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-baby2.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                    </div>
                </div>
                {modalContent.map((item, index: number) => {
                    return (
                        <Accordion
                            key={index}
                            title={
                                <p className="font-forma text-left text-xl my-0">
                                    {item.title}
                                </p>
                            }
                            content={
                                <div className="w-full bg-slate-100">
                                    {modalContent[index].content}
                                </div>
                            }
                            index={index}
                            activeIndex={activeContentIndex}
                            setActiveIndex={setActiveContentIndex}
                        />
                    );
                })}
            </div>
        );
    };

    const getModalContent = () => (
        <div data-cy="modal-stg3">
            <div className="xl:hidden">
                {isMobileView && getMobileContent()}
            </div>
            <div className="xs:hidden xl:block">
                {!isMobileView && getBrowserContent()}
            </div>
        </div>
    );

    return getModalContent();
}

export default Stage3Modal;
