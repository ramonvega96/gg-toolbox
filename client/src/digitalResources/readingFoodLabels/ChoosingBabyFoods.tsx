import { useIntl } from 'react-intl';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import ResourceLayout from './sharedComponents/ResourceLayout';
import AllergiesComponent from './sharedComponents/AllergiesComponent';
import { useState } from 'react';
import LabelCarousel from './sharedComponents/LabelCarousel';
import pouchBack from '../../assets/images/digitalResources/choosingBabyFoods/pouch-back.png';
import pouchMeat from '../../assets/images/digitalResources/choosingBabyFoods/baby-food-meat.png';
import pouchDairy from '../../assets/images/digitalResources/choosingBabyFoods/baby-food-dairy.png';
import pouchFruits from '../../assets/images/digitalResources/choosingBabyFoods/baby-food-fruits.png';
import priceTag from '../../assets/images/digitalResources/choosingBabyFoods/price-tag.png';
import nutritionTable from '../../assets/images/digitalResources/choosingBabyFoods/nutrition-table.png';
import { ReactComponent as ThumbsUp } from '../../assets/images/icons/Thumbs-up.svg';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import InfoTooltip from './sharedComponents/InfoTooltip';
import { formatText } from '../lumpyRoadToSolids/stageModalsContent/Stage2Modal';
import TextArrowButton from '../sharedComponents/TextArrowButton';

function ChoosingBabyFoods() {
    const messages = useIntl();
    const [isTurned, setIsTurned] = useState(false);
    const [flavourIndex, setFlavourIndex] = useState(0);

    const flipPouch = () => {
        setIsTurned(!isTurned);
    };

    const nextPouch = () => {
        if (flavourIndex < flavourArr.length - 1)
            setFlavourIndex(flavourIndex + 1);
        else setFlavourIndex(0);
    };

    const previousPouch = () => {
        if (flavourIndex > 0) setFlavourIndex(flavourIndex - 1);
        else setFlavourIndex(flavourArr.length - 1);
    };

    const flavourArr = [
        {
            img: pouchMeat,
            dataTooltipId: 'pouch-0-tooltip',
            dataTooltipText:
                'The name of store-bought baby food can be misleading, with some names suggesting they contain meat or vegetables as a main ingredient. Check the ingredients list, the meat or vegetables should be listed as one of the first ingredients if it is the main ingredient.',
        },
        {
            img: pouchDairy,
            dataTooltipId: 'pouch-1-tooltip',
            dataTooltipText:
                "Dairy-based baby foods can be higher in sugar, but they can be a valuable source of calcium and protein. It's important to strike a balance in your baby's diet to ensure they receive a well-rounded and nutritious mix of foods.",
        },
        {
            img: pouchFruits,
            dataTooltipId: 'pouch-2-tooltip',
            dataTooltipText:
                "Choose store-bought baby foods that have meat and vegetables as the main ingredients, rather than just fruit. As your baby starts eating more solid foods, it's important to give them balanced meals with protein, vegetables, and grains. Just like we wouldn't serve only apples and strawberries for lunch to an older child, a baby also needs a variety of nutrients, not just fruit purees, for a healthy and balanced diet.",
        },
    ];

    const labelsArr = [
        {
            label: 'Natural',
            tooltipText:
                "There is no regulation on using the word 'natural' in any food product. You can call any food 'natural' without it being from nature.",
        },
        {
            label: 'Organic',
            tooltipText:
                "'100% organic', 'made using organic ingredients' or 'certified organic'. Organic products intended for the Australian market don't need to meet a particular standard or be certified to be labeled as 'organic'",
        },
        {
            label: 'Made with',
            tooltipText:
                "This means that the food contains this ingredient. It does not have to be a certain amount of the food; for example, it can contain a very small amount of vegetables and still claim to be 'made with vegetable'.",
        },
        {
            label: 'Source of protein',
            tooltipText:
                "This means that 12% or more of the energy in the food comes from protein. This does not mean it's high-quality protein or the right amount for your baby.",
        },
        {
            label: 'Contains',
            subLabel: 'vitamin or mineral',
            tooltipText:
                'This means that a serve of this food contains 10% or more of the recommended daily amount for that vitamin or mineral.',
        },
        {
            label: 'Good source',
            subLabel: 'of vitamin or mineral',
            tooltipText:
                'This means that a serve of this food contains 25% or more of the recommended daily amount for that vitamin or mineral',
        },
        {
            label: 'No added sugar',
            tooltipText:
                'The food contains no added sugars, honey, malt, or malt extracts. The food can still have sugar from ingredients such as fruit puree, fruit concentration, and fruit juice',
        },
    ];

    const ttcTooltip = (
        <div>
            <p className="text-primaryBlueDark xs:text-xs md:text-sm font-bold">
                Things to consider:
            </p>
            <ul>
                <li className="font-forma list-disc text-primaryBlueDark xs:text-xs md:text-sm mb-2">
                    {formatText(messages.formatMessage({ id: 'ttc1' }))}
                </li>
                <li className="font-forma list-disc text-primaryBlueDark xs:text-xs md:text-sm mb-2">
                    {formatText(messages.formatMessage({ id: 'ttc2' }))}
                </li>
                <li className="font-forma list-disc text-primaryBlueDark xs:text-xs md:text-sm mb-2">
                    {formatText(messages.formatMessage({ id: 'ttc3' }))}
                </li>
                <li className="font-forma list-disc text-primaryBlueDark xs:text-xs md:text-sm mb-2">
                    {formatText(messages.formatMessage({ id: 'ttc4' }))}
                </li>
                <li className="font-forma list-disc text-primaryBlueDark xs:text-xs md:text-sm">
                    {formatText(messages.formatMessage({ id: 'ttc5' }))}
                </li>
            </ul>
        </div>
    );

    const ageTextureTooltip = (
        <div>
            <p className="text-primaryBlueDark xs:text-xs md:text-sm m-0 font-bold">
                Age and texture:
            </p>
            <p className="text-primaryBlueDark xs:text-xs md:text-sm">
                {messages.formatMessage({
                    id: 'ageTexture1',
                })}
            </p>
            <p className="text-primaryBlueDark xs:text-xs md:text-sm">
                {messages.formatMessage({
                    id: 'ageTexture2',
                })}
            </p>
            <p className="text-primaryBlueDark xs:text-xs md:text-sm">
                {messages.formatMessage({
                    id: 'ageTexture3',
                })}
            </p>
            <p className="text-primaryBlueDark xs:text-xs md:text-sm m-0 italic">
                {messages.formatMessage({
                    id: 'ageTexture4',
                })}
            </p>
        </div>
    );

    const tableTooltip = (
        <div>
            <p className="text-primaryBlueDark xs:text-xs md:text-sm m-0 font-bold">
                {messages.formatMessage({
                    id: 'tableTooltip',
                })}
            </p>
        </div>
    );

    const buildBasicTooltip = (title: string, paragraphId: string) => (
        <div>
            <p className="text-primaryBlueDark xs:text-xs md:text-sm m-0 font-bold">
                {title}
            </p>
            <p className="text-primaryBlueDark xs:text-xs md:text-sm m-0">
                {messages.formatMessage({
                    id: paragraphId,
                })}
            </p>
        </div>
    );

    const babyFoodPouch = (
        <div className="p-8 w-full">
            <p
                className="xs:w-full md:w-4/5 xl:w-1/2 text-primaryBlueDark mb-0 xl:text-xl md:text-base xs:text-sm"
                data-cy="resource-instructions"
            >
                {messages.formatMessage({
                    id: 'interactiveInstruction3',
                })}
                <span className="inline-block">
                    <img
                        alt="Info icon"
                        src={require('../../assets/images/digitalResources/readingFormulaLabels/Info.png')}
                        className="xs:w-[16px] md:w-[18px] mx-1"
                    />
                </span>
                {messages.formatMessage({
                    id: 'interactiveInstruction4',
                })}
            </p>
            <div className="w-full flex justify-center items-center xs:mt-8 md:mt-16 xs:pl-44 md:pl-48 xl:pl-24 overflow-hidden">
                <div className="absolute">
                    <div className="relative h-0 xs:bottom-[250px] xs:left-[25px] md:bottom-[310px] md:left-[25px]">
                        <InfoTooltip
                            dataTooltipId="lid-tooltip"
                            tooltipPosition="bottom"
                            dataTooltipText={buildBasicTooltip(
                                'Pouch Lids:',
                                'pouchLids'
                            )}
                            dark={true}
                        />
                    </div>
                    <div className="relative flex gap-2 h-0 xs:bottom-[215px] xs:right-[175px] md:bottom-[265px] md:right-[220px]">
                        <InfoTooltip
                            dataTooltipId="things-to-consider-tooltip"
                            tooltipPosition="bottom"
                            dataTooltipText={ttcTooltip}
                            dark={true}
                        />
                        <p className="text-primaryBlueDark xs:text-xs md:text-sm m-0 w-24">
                            Things to consider
                        </p>
                    </div>
                </div>
                {!isTurned && (
                    <div className="absolute">
                        <div className="relative h-0 w-0 xs:bottom-[165px] xs:right-[190px] md:bottom-[200px] md:right-[235px] xl:bottom-[205px] xl:right-[240px]">
                            <InfoTooltip
                                dataTooltipId="package-size-tooltip"
                                tooltipPosition="bottom"
                                dataTooltipText={buildBasicTooltip(
                                    'Package size:',
                                    'packageSize'
                                )}
                            />
                        </div>
                        <div className="relative h-0 float-left -rotate-12 xs:right-[180px] xs:bottom-[130px] md:right-[220px] md:bottom-[150px] xl:right-[220px]">
                            <img
                                alt="pouch price tag"
                                src={priceTag}
                                className="xs:w-[70px] md:w-[80px]"
                            />
                            <p className="text-primaryBlueDark font-bold text-sm xs:-mt-7 xs:pl-6 md:-mt-8 md:pl-8">
                                $
                            </p>
                        </div>
                        <div className="relative h-0 w-0 float-left xs:right-[130px] xs:bottom-[130px] md:right-[170px] md:bottom-[140px] xl:right-[170px]">
                            <InfoTooltip
                                dataTooltipId="tag-price-tooltip"
                                tooltipPosition="bottom"
                                dataTooltipText={buildBasicTooltip(
                                    'Cost per pouch:',
                                    'costPerPouch'
                                )}
                                dark={true}
                            />
                        </div>
                        <div className="relative h-0 w-0 float-left xs:left-[58px] xs:bottom-[147px] md:left-[65px] md:bottom-[177px] xl:left-[62px]">
                            <InfoTooltip
                                dataTooltipId="age-texture-tooltip"
                                tooltipPosition="bottom"
                                dataTooltipText={ageTextureTooltip}
                                dark={true}
                            />
                        </div>
                        <div className="relative h-0 w-0 float-left xs:left-[25px] md:left-[10px] xl:left-[0px]">
                            <InfoTooltip
                                dataTooltipId={
                                    flavourArr[flavourIndex].dataTooltipId
                                }
                                tooltipPosition="bottom"
                                dataTooltipText={
                                    flavourArr[flavourIndex].dataTooltipText
                                }
                            />
                        </div>
                        <div
                            className="relative flex h-0 w-0 
                            xs:top-[30px] xs:right-[160px] xs:gap-44
                            md:top-[50px] md:right-[195px] xl:right-[190px] md:gap-52"
                        >
                            <button
                                className="text-white"
                                onClick={() => previousPouch()}
                                data-cy="previous-flavour-pouch"
                            >
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    className="xs:text-lg md:text-2xl"
                                />
                            </button>
                            <button
                                className="text-white"
                                onClick={() => nextPouch()}
                                data-cy="next-flavour-pouch"
                            >
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className="xs:text-lg md:text-2xl"
                                />
                            </button>
                        </div>
                        <div className="relative h-0 w-0 xs:top-[90px] xs:right-[55px] md:top-[110px] md:right-[70px] xl:right-[70px]">
                            <LabelCarousel
                                labelsArr={labelsArr}
                                dataTooltipId="pouch-labels-carousel"
                                tooltipPosition="bottom"
                            />
                        </div>
                        <div className="relative h-0 w-0 float-left xs:top-[150px] xs:left-[2px] md:top-[185px] md:left-[2px] xl:left-[1px]">
                            <ThumbsUp
                                fill={'#142E54'}
                                className="xs:w-[55px] xs:h-[55px] md:w-[65px] md:h-[65px]"
                            />
                        </div>
                    </div>
                )}
                {isTurned && (
                    <div className="absolute">
                        <div className="relative h-0 xs:w-[190px] xs:bottom-[150px] xs:right-[60px] md:w-[230px] md:bottom-[185px] md:right-[75px]">
                            <TextArrowButton
                                topText="Help! My child will only eat from pouches!"
                                link="https://growandgotoolbox.com/digital-resources/lumpy-road-to-solids"
                                paddingStyling="px-3 py-1"
                                textStyling="xs:text-xs md:text-sm"
                            />
                        </div>
                        <div className="relative h-0 w-0 xs:bottom-[97px] xs:right-[110px] md:bottom-[117px] md:right-[140px]">
                            <p className="font-forma font-bold text-primaryBlueDark xs:text-[9px] md:text-xs md:mb-1 xs:mb-0 whitespace-nowrap">
                                What to look out for on the ingredients list:
                            </p>
                            <div className="flex gap-1">
                                <div>
                                    <div className="flex gap-1 items-center">
                                        <InfoTooltip
                                            dataTooltipId="meat-content-tooltip"
                                            tooltipPosition="bottom"
                                            dataTooltipText={buildBasicTooltip(
                                                'Meat Content:',
                                                'meatContent'
                                            )}
                                            dark={true}
                                        />
                                        <p className="text-primaryBlueDark xs:text-[9px] md:text-xs m-0 whitespace-nowrap">
                                            Meat Content
                                        </p>
                                    </div>
                                    <div className="flex gap-1 xs:mt-0.5 md:mt-1 items-center">
                                        <InfoTooltip
                                            dataTooltipId="vegetables-priority-tooltip"
                                            tooltipPosition="bottom"
                                            dataTooltipText={buildBasicTooltip(
                                                'Vegetable Priority:',
                                                'vegetablesPriority'
                                            )}
                                            dark={true}
                                        />
                                        <p className="text-primaryBlueDark xs:text-[9px] md:text-xs m-0 whitespace-nowrap">
                                            Vegetables Priority
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex gap-1 items-center">
                                        <InfoTooltip
                                            dataTooltipId="salt-sugar-tooltip"
                                            tooltipPosition="bottom"
                                            dataTooltipText={buildBasicTooltip(
                                                'Minimised sugar and salt:',
                                                'sugarSalt'
                                            )}
                                            dark={true}
                                        />
                                        <p className="text-primaryBlueDark xs:text-[9px] md:text-xs m-0 whitespace-nowrap">
                                            Minimised Sugar and Salt
                                        </p>
                                    </div>
                                    <div className="flex gap-1 xs:mt-0.5 md:mt-1 items-center">
                                        <InfoTooltip
                                            dataTooltipId="iron-rich-tooltip"
                                            tooltipPosition="bottom"
                                            dataTooltipText={buildBasicTooltip(
                                                'Iron-rich foods:',
                                                'ironRich'
                                            )}
                                            dark={true}
                                        />
                                        <p className="text-primaryBlueDark xs:text-[9px] md:text-xs m-0 whitespace-nowrap">
                                            Iron-rich foods
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-0 w-0 xs:bottom-[30px] xs:right-[116px] md:bottom-[30px] md:right-[140px]">
                            <p className="font-forma font-bold text-primaryBlueDark xs:text-[9px] md:text-[12px] xs:w-[92px] md:w-32 mb-1">
                                What to look for on the nutrition information
                                panels:
                            </p>
                            <p className="text-primaryBlueDark xs:text-[9px] md:text-[11px] m-0 xs:w-[92px] md:w-32">
                                {messages.formatMessage({
                                    id: 'nutritionTable',
                                })}
                            </p>
                        </div>
                        <div className="relative h-0 float-left xs:right-[23px] xs:bottom-[32px] md:right-[10px] md:bottom-[32px]">
                            <img
                                alt="pouch nutrition table"
                                src={nutritionTable}
                                className="border-2 border-primaryBlueDark xs:min-w-[150px] xs:max-w-[150px] md:min-w-[160px] md:max-w-[160px]"
                            />
                        </div>
                        <div className="relative h-0 w-0 xs:top-[30px] xs:left-[110px] md:top-[30px] md:left-[130px]">
                            <InfoTooltip
                                dataTooltipId="table-tooltip"
                                tooltipPosition="bottom"
                                dataTooltipText={tableTooltip}
                                dark={true}
                            />
                        </div>
                        <div className="relative h-0 w-0 xs:top-[69px] xs:right-[20px] md:top-[80px] md:right-[5px]">
                            <InfoTooltip
                                dataTooltipId="energy-tooltip"
                                tooltipPosition="bottom"
                                dataTooltipText={buildBasicTooltip(
                                    'Energy:',
                                    'energyTooltip'
                                )}
                                dark={true}
                            />
                        </div>
                        <div className="relative h-0 w-0 xs:top-[87px] xs:right-[20px] md:top-[97px] md:right-[5px]">
                            <InfoTooltip
                                dataTooltipId="protein-tooltip"
                                tooltipPosition="bottom"
                                dataTooltipText={buildBasicTooltip(
                                    'Protein:',
                                    'proteinTooltip'
                                )}
                                dark={true}
                            />
                        </div>
                        <div className="relative h-0 w-0 xs:top-[140px] xs:right-[20px] md:top-[155px] md:right-[5px]">
                            <InfoTooltip
                                dataTooltipId="sugars-tooltip"
                                tooltipPosition="bottom"
                                dataTooltipText={buildBasicTooltip(
                                    'Sugar content:',
                                    'sugarsTooltip'
                                )}
                                dark={true}
                            />
                        </div>
                        <div className="relative h-0 w-0 xs:top-[158px] xs:right-[20px] md:top-[172px] md:right-[5px]">
                            <InfoTooltip
                                dataTooltipId="sodium-tooltip"
                                tooltipPosition="bottom"
                                dataTooltipText={buildBasicTooltip(
                                    'Sodium content:',
                                    'sodiumTooltip'
                                )}
                                dark={true}
                            />
                        </div>
                        <div className="relative h-0 w-0 xs:top-[175px] xs:right-[20px] md:top-[189px] md:right-[5px]">
                            <InfoTooltip
                                dataTooltipId="iron-tooltip"
                                tooltipPosition="bottom"
                                dataTooltipText={buildBasicTooltip(
                                    'Iron content:',
                                    'ironTooltip'
                                )}
                                dark={true}
                            />
                        </div>
                    </div>
                )}
                <img
                    alt="baby food pouch"
                    data-cy="interactive-img"
                    src={isTurned ? pouchBack : flavourArr[flavourIndex].img}
                    className="xs:max-w-[500px] xs:min-w-[500px] md:max-w-[610px] md:min-w-[610px]"
                />
            </div>
            <div className="w-full flex justify-end items-end xs:mt-0 xl:-mt-8 xs:pr-0 xl:pr-16 cursor-pointer">
                <img
                    alt="Flip icon"
                    src={require('../../assets/images/digitalResources/readingFormulaLabels/flip.png')}
                    className="xs:w-[70px] xl:w-[100px]"
                    onClick={() => flipPouch()}
                    data-tooltip-id="flip-img-tooltip"
                    data-cy="flip-img-btn"
                    data-tooltip-content={messages.formatMessage({
                        id: isTurned
                            ? 'flipPouchFrontTooltip'
                            : 'flipPouchBackTooltip',
                    })}
                />
                <Tooltip
                    id="flip-img-tooltip"
                    className="text-black font-sans text-base"
                    style={{ backgroundColor: '#F2F2F2', width: '180px' }}
                />
            </div>
        </div>
    );

    return (
        <div>
            <Header toggleBanner={true} />
            <ResourceLayout
                title={messages.formatMessage({
                    id: 'babyFoodsResourceTitle',
                })}
                subtitle={messages.formatMessage({
                    id: 'babyFoodsResourceSubtitle',
                })}
                text={messages.formatMessage({
                    id: 'babyFoodsResourceText',
                })}
                btn1Text="Download the PDF"
                btn1Link="https://indd.adobe.com/view/897dcb94-a2fb-421d-a4e0-d63248fb8df0"
                btn2Text="Download the Cheatsheet"
                btn2Link="https://indd.adobe.com/view/6d944b34-6e5b-4a15-8cdf-224567c620e5"
                btn3Text="Start them right"
                btn3Link="https://www.health.tas.gov.au/sites/default/files/2021-12/Start_Them_Right_booklet_DoHTasmania2019.pdf"
                panel={babyFoodPouch}
            />
            <AllergiesComponent />
            <Footer pageAnalitycsId="choosing-baby-foods-page" />
        </div>
    );
}

export default ChoosingBabyFoods;
