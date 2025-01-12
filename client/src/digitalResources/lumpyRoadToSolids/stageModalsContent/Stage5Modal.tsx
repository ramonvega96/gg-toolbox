import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import TextArrowButton from '../../sharedComponents/TextArrowButton';
import { formatUL } from './Stage4Modal';

function Stage5Modal() {
    const messages = useIntl();

    const [isMobileView, setIsMobileView] = useState(false);
    const carouselElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 1280);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollRight = () => {
        if (carouselElement.current) {
            carouselElement.current.scrollTo({
                left: carouselElement.current.scrollLeft + 300,
                behavior: 'smooth',
            });
        }
    };

    const scrollLeft = () => {
        if (carouselElement.current) {
            carouselElement.current.scrollTo({
                left: carouselElement.current.scrollLeft - 300,
                behavior: 'smooth',
            });
        }
    };

    const getBrowserContent = () => {
        return (
            <div className="flex-col items-center mt-8 xl:px-24 overflow-hidden">
                <div className="xl:flex xl:gap-x-12">
                    <div className="xl:w-1/2">
                        <p
                            className="text-sm"
                            data-cy="modal-text1"
                        >
                            {messages.formatMessage({ id: 'stage5ModalText1' })}
                        </p>
                        <div data-cy="food-ideas-ul">
                            {formatUL(
                                messages
                                    .formatMessage({ id: 'stage5ModalText2' })
                                    .split('-'),
                                'text-sm'
                            )}
                        </div>
                        <TextArrowButton
                            topText="Here are some recipes to help with introducing solids"
                            link="https://growandgotoolbox.com/search?subcategories=Recipes+And+Meal+Planning"
                        />
                    </div>
                    <div className="xl:w-1/2 xs:hidden xl:flex flex-col">
                        <div className="relative float-left left-[340px] top-[30px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="food0-label"
                            >
                                Crunchy nut butter toast
                            </p>
                        </div>
                        <div className="relative float-right left-[320px] top-[50px]">
                            <div
                                data-cy="food0-img"
                                className='absolute w-36 h-36 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage5-food0.png")] bg-contain bg-cover bg-no-repeat bg-bottom'
                            />
                        </div>
                        <div className="relative float-left left-[170px] top-[40px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="food1-label"
                            >
                                Pieces of Lasagne
                            </p>
                        </div>
                        <div className="relative float-right left-[140px] top-[60px]">
                            <div
                                data-cy="food1-img"
                                className='absolute w-36 h-36 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage5-food1.png")] bg-contain bg-cover bg-no-repeat bg-bottom'
                            />
                        </div>
                        <div className="relative float-left left-[30px] top-[140px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="food2-label"
                            >
                                Sliced steak
                            </p>
                        </div>
                        <div className="relative float-right left-[0px] top-[160px]">
                            <div
                                data-cy="food2-img"
                                className='absolute w-36 h-36 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage5-food2.png")] bg-contain bg-cover bg-no-repeat bg-bottom'
                            />
                        </div>
                        <div className="relative float-left right-[0px] top-[320px]">
                            <p
                                className="absolute text-xs text-primaryBlueDark"
                                data-cy="food3-label"
                            >
                                Crumbed fish
                            </p>
                        </div>
                        <div className="relative float-right right-[25px] top-[340px]">
                            <div
                                data-cy="food3-img"
                                className='absolute w-36 h-36 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage5-food3.png")] bg-contain bg-cover bg-no-repeat bg-bottom'
                            />
                        </div>
                        <div className="relative float-right left-[130px] top-[200px]">
                            <div
                                data-cy="modal-baby-img"
                                className='absolute w-96 h-96 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage5-baby.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                        </div>
                    </div>
                </div>
                <p
                    className="text-sm mb-0 mt-2"
                    data-cy="iron-rich-foods"
                >
                    {messages.formatMessage({ id: 'ironRichFoods' })}
                </p>
                <p
                    className="text-sm mb-0"
                    data-cy="iron-rich-foods"
                >
                    {messages.formatMessage({ id: 'ironRichFoodsBolded' })}
                </p>
            </div>
        );
    };

    const getMobileContent = () => {
        return (
            <div className="mt-8 xs:px-6 md:px-16 overflow-hidden">
                <p
                    className="text-sm"
                    data-cy="modal-text1"
                >
                    {messages.formatMessage({ id: 'stage5ModalText1' })}
                </p>
                <div data-cy="food-ideas-ul">
                    {formatUL(
                        messages
                            .formatMessage({ id: 'stage5ModalText2' })
                            .split('-'),
                        'text-sm'
                    )}
                </div>
                <div
                    className="flex justify-center items-center"
                    data-cy="food-carousel"
                >
                    <button
                        id="carousel-spin-left"
                        onClick={() => scrollLeft()}
                    >
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            size="2x"
                        />
                    </button>
                    <div
                        ref={carouselElement}
                        className="flex overflow-x-scroll overflow-y-hidden scroll-smooth no-scrollbar snap-mandatory snap-x"
                    >
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="food0-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage5-food0.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="food0-label"
                            >
                                Crunchy nut butter toast
                            </span>
                        </div>
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="food1-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage5-food1.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="food1-label"
                            >
                                Pieces of Lasagne
                            </span>
                        </div>
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="food2-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage5-food2.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="food2-label"
                            >
                                Sliced steak
                            </span>
                        </div>
                        <div className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center">
                            <div
                                data-cy="food3-img"
                                className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage5-food3.png")] bg-contain bg-cover bg-no-repeat bg-center'
                            />
                            <span
                                className="w-40 text-center pt-8 text-sm"
                                data-cy="food3-label"
                            >
                                Crumbed fish
                            </span>
                        </div>
                    </div>
                    <button
                        id="carousel-spin-right"
                        onClick={() => scrollRight()}
                    >
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            size="2x"
                        />
                    </button>
                </div>
                <p
                    className="text-sm my-0"
                    data-cy="iron-rich-foods"
                >
                    {messages.formatMessage({ id: 'ironRichFoods' })}
                </p>
                <p
                    className="text-sm mb-2"
                    data-cy="iron-rich-foods"
                >
                    {messages.formatMessage({ id: 'ironRichFoodsBolded' })}
                </p>
                <TextArrowButton
                    topText="Here are some recipes to help with introducing solids"
                    link="https://growandgotoolbox.com/search?subcategories=Recipes+And+Meal+Planning"
                />
                <div className="h-64">
                    <div className="relative float-right right-[250px] top-[20px]">
                        <div
                            data-cy="modal-baby-img"
                            className='absolute w-80 h-80 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage5-baby.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                    </div>
                </div>
            </div>
        );
    };

    const getModalContent = () => (
        <div data-cy="modal-stg5">
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

export default Stage5Modal;
