import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import TextArrowButton from '../../sharedComponents/TextArrowButton';
import Accordion from '../../../components/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export const formatText = (input: string): JSX.Element[] => {
    const parts: JSX.Element[] = [];
    const regex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(input)) !== null) {
        const textBefore = input.substring(lastIndex, match.index);
        if (textBefore) {
            parts.push(<span key={lastIndex}>{textBefore}</span>);
        }

        const boldText = match[1];
        if (boldText) {
            parts.push(<strong key={match.index}>{boldText}</strong>);
        }

        lastIndex = regex.lastIndex;
    }

    const textAfter = input.substring(lastIndex);
    if (textAfter) {
        parts.push(<span key={lastIndex}>{textAfter}</span>);
    }

    return parts;
};

function Stage2Modal() {
    const messages = useIntl();

    const [activeContentIndex, setActiveContentIndex] = useState<number>(0);
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
                left: carouselElement.current.scrollLeft + 250,
                behavior: 'smooth',
            });
        }
    };

    const scrollLeft = () => {
        if (carouselElement.current) {
            carouselElement.current.scrollTo({
                left: carouselElement.current.scrollLeft - 250,
                behavior: 'smooth',
            });
        }
    };

    const section0Content = (
        <div
            className="xs:p-4 md:p-8 xl:py-16 xl:px-24"
            data-cy="section0-content"
        >
            <p
                className="font-forma xs:text-sm md:text-base xl:text-lg"
                data-cy="section0-text"
            >
                {formatText(
                    messages.formatMessage({ id: 'stage2ModalContent0Text' })
                )}
            </p>
            <p
                className="font-forma mb-0"
                data-cy="section0-further-info"
            >
                {messages.formatMessage({ id: 'furtherInfo' })}
            </p>
            <div
                className="xl:flex gap-10"
                data-cy="section0-btns"
            >
                <TextArrowButton
                    topText="Gagging, choking & spitting"
                    bottomText="Royal Children's Hospital Melbourne"
                    link="https://www.rch.org.au/uploadedFiles/Main/Content/speech/200101%20FandE%20Gagging%20Choking%20A4%20FSheet_FA_WEB.pdf"
                />
                <TextArrowButton
                    topText="Is gagging normal?"
                    bottomText="Baby Centre"
                    link="https://www.babycenter.com.au/v25018737/baby-led-weaning-is-gagging-normal-video"
                />
            </div>
        </div>
    );

    const section1Content = (
        <div
            className="xs:p-4 md:p-8 xl:py-16 xl:px-24"
            data-cy="section1-content"
        >
            <p
                className="font-forma xs:text-sm md:text-base xl:text-lg"
                data-cy="section1-text"
            >
                {formatText(
                    messages.formatMessage({ id: 'stage2ModalContent1Text' })
                )}
            </p>
            <p
                className="font-forma mb-0"
                data-cy="section1-further-info"
            >
                {messages.formatMessage({ id: 'furtherInfo' })}
            </p>
            <TextArrowButton
                topText="How to introduce the common allergy causing foods"
                bottomText="Nip allergies in the Bub"
                link="https://preventallergies.org.au/feeding-your-baby/how-to-introduce-common-allergy-causing-foods/"
            />
        </div>
    );

    const section2Content = (
        <div
            className="xs:p-4 md:p-8 xl:py-16 xl:px-24"
            data-cy="section2-content"
        >
            <p
                className="font-forma xs:text-sm md:text-base xl:text-lg mb-2"
                data-cy="section2-text"
            >
                {formatText(
                    messages.formatMessage({ id: 'stage2ModalContent2Text' })
                )}
            </p>
            <div
                className="xs:hidden xl:flex xl:gap-x-12 xl:overflow-x-visible"
                data-cy="section2-foods-display"
            >
                <div
                    className="h-64 w-1/5"
                    data-cy="section2-foods-group0"
                >
                    <div className="relative float-left xl:right-[0px] xl:top-[50px]">
                        <div className='absolute xl:w-28 xl:h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food0.png")] bg-contain bg-cover bg-no-repeat bg-center' />
                    </div>
                    <div className="relative float-left text-xs w-32 xl:right-[40px] xl:top-[170px]">
                        Fortified iron cereals mixed with breastmilk or formula
                    </div>
                </div>
                <div
                    className="h-64 w-1/2 mx-2"
                    data-cy="section2-foods-group1"
                >
                    <div className="relative float-left xl:left-[0px] xl:top-[0px]">
                        <div className='absolute xl:w-28 xl:h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food1.png")] bg-contain bg-cover bg-no-repeat bg-center' />
                    </div>
                    <div className="relative float-left xl:left-[60px] xl:top-[110px]">
                        <div className='absolute xl:w-28 xl:h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food2.png")] bg-contain bg-cover bg-no-repeat bg-center' />
                    </div>
                    <div className="relative float-left xl:left-[120px] xl:top-[0px]">
                        <div className='absolute xl:w-28 xl:h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food3.png")] bg-contain bg-cover bg-no-repeat bg-center' />
                    </div>
                    <div className="relative float-left text-xs w-24 xl:right-[20px] xl:top-[115px]">
                        Pureed meat, chicken, eggs, tofu
                    </div>
                </div>
                <div
                    className="h-64 w-1/2 mx-2"
                    data-cy="section2-foods-group2"
                >
                    <div className="relative float-left xl:left-[0px] xl:top-[0px]">
                        <div className='absolute xl:w-28 xl:h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food4.png")] bg-contain bg-cover bg-no-repeat bg-center' />
                    </div>
                    <div className="relative float-left xl:left-[60px] xl:top-[110px]">
                        <div className='absolute xl:w-28 xl:h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food5.png")] bg-contain bg-cover bg-no-repeat bg-center' />
                    </div>
                    <div className="relative float-left xl:left-[120px] xl:top-[0px]">
                        <div className='absolute xl:w-28 xl:h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food6.png")] bg-contain bg-cover bg-no-repeat bg-center' />
                    </div>
                    <div className="relative float-left text-xs w-24 xl:right-[20px] xl:top-[115px]">
                        Pureed beans, lentils or Dahl
                    </div>
                </div>
                <div
                    className="h-64 w-1/5"
                    data-cy="section2-foods-group3"
                >
                    <div className="relative float-right xl:right-[90px] xl:top-[50px]">
                        <div className='absolute xl:w-28 xl:h-28 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food7.png")] bg-contain bg-cover bg-no-repeat bg-center' />
                    </div>
                    <div className="relative float-left text-xs w-32 xl:left-[20px] xl:top-[170px] md:right-[0px] md:top-[0px] xs:right-[0px] xs:top-[0px]">
                        Pureed green vegetables
                    </div>
                </div>
            </div>
            <div className="xl:hidden flex justify-center items-center">
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
                    data-cy="section2-foods-display"
                >
                    <div
                        className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center"
                        data-cy="section2-foods-group0"
                    >
                        <div className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food0.png")] bg-contain bg-cover bg-no-repeat bg-center' />
                        <span className="w-40 text-center pt-8 text-sm">
                            Fortified iron cereals mixed with breastmilk or
                            formula
                        </span>
                    </div>
                    <div
                        className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center"
                        data-cy="section2-foods-group1"
                    >
                        <div className="flex gap-x-0 -mb-2">
                            <div className='xs:w-24 xs:h-24 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food1.png")] bg-contain bg-cover bg-no-repeat bg-center' />
                            <div className='xs:w-24 xs:h-24 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food2.png")] bg-contain bg-cover bg-no-repeat bg-center' />
                        </div>
                        <div className='xs:w-24 xs:h-24 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food3.png")] bg-contain bg-cover bg-no-repeat bg-center' />

                        <span className="w-40 text-center pt-2 text-sm">
                            Pureed meat, chicken, eggs, tofu
                        </span>
                    </div>
                    <div
                        className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center"
                        data-cy="section2-foods-group2"
                    >
                        <div className="flex gap-x-0 -mb-2">
                            <div className='xs:w-24 xs:h-24 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food4.png")] bg-contain bg-cover bg-no-repeat bg-center' />
                            <div className='xs:w-24 xs:h-24 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food5.png")] bg-contain bg-cover bg-no-repeat bg-center' />
                        </div>
                        <div className='xs:w-24 xs:h-24 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food6.png")] bg-contain bg-cover bg-no-repeat bg-center' />

                        <span className="w-40 text-center pt-2 text-sm">
                            Pureed beans, lentils or Dahl
                        </span>
                    </div>
                    <div
                        className="h-64 flex-shrink-0 w-full flex flex-col justify-center items-center snap-center"
                        data-cy="section2-foods-group3"
                    >
                        <div className='xs:w-32 xs:h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food7.png")] bg-contain bg-cover bg-no-repeat bg-center' />
                        <span className="w-40 text-center pt-8 text-sm">
                            Pureed green vegetables
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
                className="font-forma mb-0"
                data-cy="section2-further-info"
            >
                {messages.formatMessage({ id: 'furtherInfo' })}
            </p>
            <TextArrowButton
                topText="Start them right"
                bottomText="Tasmanian Government Department of Health"
                link="https://www.health.tas.gov.au/sites/default/files/2021-12/Start_Them_Right_booklet_DoHTasmania2019.pdf"
            />
        </div>
    );

    const section3Content = (
        <div
            className="xs:p-4 md:p-8 xl:py-28 xl:px-24 overflow-hidden h-96"
            data-cy="section3-content"
        >
            <p
                className="font-forma xs:text-sm md:text-base xl:text-lg xl:w-3/5 xs:w-full"
                data-cy="section3-text"
            >
                {formatText(
                    messages.formatMessage({ id: 'stage2ModalContent3Text' })
                )}
            </p>
            <div className="relative float-right xl:right-[250px] xl:bottom-[240px] xs:right-[230px] xs:bottom-[15px]">
                <div
                    data-cy="section3-baby"
                    className='absolute xl:w-96 xl:h-96 xs:w-80 xs:h-80 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-img1.jpg")] bg-contain bg-cover bg-no-repeat bg-bottom'
                />
            </div>
        </div>
    );

    const section4Content = (
        <div
            className="xs:p-4 md:p-8 xl:py-16 xl:px-24"
            data-cy="section4-content"
        >
            <p
                className="font-forma xs:text-sm md:text-base xl:text-lg"
                data-cy="section4-text"
            >
                {formatText(
                    messages.formatMessage({ id: 'stage2ModalContent4Text' })
                )}
            </p>
            <div
                className="flex gap-x-8 justify-center items-center mb-2"
                data-cy="section4-babies"
            >
                <div
                    data-cy="section4-baby1"
                    className='xs:w-32 xs:h-32 md:w-40 md:h-40 xl:w-48 xl:h-48 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-baby0.png")] bg-contain bg-cover bg-no-repeat bg-center'
                />
                <div
                    data-cy="section4-baby2"
                    className='xs:w-32 xs:h-32 md:w-40 md:h-40 xl:w-48 xl:h-48 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-baby1.png")] bg-contain bg-cover bg-no-repeat bg-center'
                />
            </div>
            <p
                className="font-forma mb-0"
                data-cy="section4-further-info"
            >
                {messages.formatMessage({ id: 'furtherInfo' })}
            </p>
            <TextArrowButton
                topText="Start them right"
                bottomText="Tasmanian Government Department of Health"
                link="https://www.health.tas.gov.au/sites/default/files/2021-12/Start_Them_Right_booklet_DoHTasmania2019.pdf"
            />
        </div>
    );

    const modalContent = [
        {
            title: 'Gagging',
            content: section0Content,
        },
        {
            title: 'Common food allergens',
            content: section1Content,
        },
        {
            title: 'Iron foods',
            content: section2Content,
        },
        {
            title: 'Preventing fussy eating',
            content: section3Content,
        },
        {
            title: 'Baby-led weaning',
            content: section4Content,
        },
    ];

    const getBrowserContent = () => {
        return (
            <div className="flex-col items-center mt-8">
                <div className="w-full flex flex-row gap-x-1 h-[50px]">
                    {modalContent.map((item, index: number) => {
                        return (
                            <div
                                className={`tab text-center leading-4 text-white font-omnes p-2 w-1/5 h-full ${
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
        <div data-cy="modal-stg2">
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

export default Stage2Modal;
