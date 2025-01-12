import { useIntl } from 'react-intl';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import ResourceLayout from './sharedComponents/ResourceLayout';
import AllergiesComponent from './sharedComponents/AllergiesComponent';
import tinFront from '../../assets/images/digitalResources/readingFormulaLabels/formula-tin-front.png';
import tinBack from '../../assets/images/digitalResources/readingFormulaLabels/formula-tin-back.png';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import LabelCarousel from './sharedComponents/LabelCarousel';

function ReadingFormulaLabels() {
    const messages = useIntl();
    const [isTurned, setIsTurned] = useState(false);

    const flipTin = () => {
        setIsTurned(!isTurned);
    };

    const firstLabelArr = [
        {
            label: 'Lactose free',
            tooltipText:
                'If your baby has lactose intolerance, lactose-free formulas are just for them. Make sure to use them with advice from a health professional.',
        },
        {
            label: 'Anti-Reflux (AR)',
            subLabel: 'or Thickened',
            tooltipText:
                'You might use anti-reflux or thickened formula if your baby has mild reflux. Check with a health professional before using these formulas because if your baby has severe reflux, they will need other treatments. Be mindful that once prepared this type of formula may continue to thicken over time.',
        },
        {
            label: 'Partially',
            subLabel: 'Hydrolysed',
            tooltipText:
                'The proteins in this formula are partly broken down. Infant formula companies claim that this formula is gentler on the stomach and can help with constipation and colic, but there is little evidence to support this. This infant formula does not prevent allergies, so speak to a health professional if you are worried about allergies.',
        },
        {
            label: 'Extensively',
            subLabel: 'Hydrolysed',
            tooltipText:
                'The proteins in this formula are partly broken down. This infant formula is for babies with medical conditions like severe allergies and intolerances. These usually need a prescription and should only be used under a doctor’s advice.',
        },
        {
            label: 'Elemental',
            subLabel: 'or Amino acid',
            tooltipText:
                'The proteins in this formula are completely broken down. Amino acid formulas are for tricky health issues where the child can’t absorb nutrients properly. These need a prescription and should only be used with a doctor’s advice.',
        },
        {
            label: 'Premium/Gold',
            tooltipText:
                'These formulas have extra ingredients like prebiotics, probiotics, and healthy fats, which can help with growth and development. But don’t worry, babies who have regular infant formula also grow and develop just fine.',
        },
        {
            label: 'Organic',
            tooltipText:
                'These formulas are made from organic cow’s milk. You can choose this if you want, but there’s no clear evidence that it’s better for your baby.',
        },
        {
            label: 'A2',
            tooltipText:
                'A2 formula is made from cow’s milk with just the A2 beta-casein protein. Infant formula companies say it’s easier on the tummy and might help with colic, but there’s not a lot of evidence to support this statement.',
        },
        {
            label: "Goat's milk",
            tooltipText:
                'Goat’s milk formula is an alternative to cow’s milk, but it is not lactose- free. Do not use this formula if your baby has a cow’s milk protein allergy, they might also react to goat’s milk formula.',
        },
        {
            label: 'Soy based',
            subLabel: 'Formula',
            tooltipText:
                'This formula is made from soybeans made into a milk. If your baby can’t have cow’s or goat’s milk formula or are lactose intolerant, soy-based formula is a suitable alternative. Seek advice from a health professional if your baby has a cow’s milk protein allergy, as they might also react to soy-based formula.',
        },
        {
            label: 'Rice based',
            subLabel: 'Formula',
            tooltipText:
                'This formula is made with rice protein and is for babies with cow’s milk or soy protein allergies or those who can’t handle lactose. Talk to a health professional before using this formula.',
        },
        {
            label: 'Constipation',
            tooltipText:
                'Some infant formulas claim to ease constipation and contain ingredients like sn-2 palmitate, ß-palmitic acid, or low lactose to make stools softer. Limited research suggests these ingredients might help with constipation. If your baby has persistent or severe constipation, it’s best to speak with a health professional for advice.',
        },
    ];

    const secondLabelArr = [
        {
            label: 'Probiotics',
            tooltipText:
                'These are friendly bacteria that help with digestion.',
        },
        {
            label: 'Prebiotics',
            tooltipText: 'These are food for probiotics and good gut bacteria.',
        },
        {
            label: 'Symbiotics',
            tooltipText: 'These have both prebiotics and probiotics.',
        },
        {
            label: 'Human',
            subLabel: 'Milk Oligosaccharides',
            tooltipText:
                'Some formulas also try to mimic breast milk by adding artificial human milk oligosaccharides – a type of sugar found in breast milk – but there’s not much proof they’re super helpful.',
        },
    ];

    const thirdLabelArr = [
        {
            label: 'One',
            tooltipText:
                'Stage 1, or newborn infant formula, is for babies 0-6 months.',
        },
        {
            label: 'Two',
            tooltipText:
                'Follow-on or stage 2 formulas are made for babies over six months old and contain different amounts of nutrients. Follow-on formula should not be given to babies under six months old as it does not include the right nutrition. It is okay to use stage 1 formula from 6 to 12 months, but by then, your baby should also start eating solids.',
        },
        {
            label: 'Three',
            tooltipText:
                'Stage 3 formulas (toddler milk) are rarely needed. After 12 months, your baby can switch to plain cow’s milk, breast milk, or water as a drink.',
        },
    ];

    const formulaTin = (
        <div className="p-8 w-full">
            <p
                className="xs:w-full md:w-3/5 xl:w-1/2 text-primaryBlueDark mb-0 xl:text-xl md:text-base xs:text-sm"
                data-cy="resource-instructions"
            >
                {messages.formatMessage({
                    id: 'interactiveInstruction1',
                })}
                <span className="inline-block">
                    <img
                        alt="Info icon"
                        src={require('../../assets/images/digitalResources/readingFormulaLabels/Info.png')}
                        className="xs:w-[16px] md:w-[18px] mx-1"
                    />
                </span>
                {messages.formatMessage({
                    id: 'interactiveInstruction2',
                })}
            </p>
            <div className="w-full flex justify-center items-center mt-8">
                {!isTurned && (
                    <div className="absolute">
                        <div className="relative flex gap-2 items-center justify-center xs:top-[0px] md:-top-[25px] xl:-top-[40px]">
                            <div className="flex flex-col items-center">
                                <h1 className="font-omnes text-white xs:text-xl xl:text-2xl m-0">
                                    Formula Brand
                                </h1>
                                <h1 className="font-omnes text-white xs:text-4xl xl:text-5xl m-0">
                                    Formula Name
                                </h1>
                            </div>
                        </div>
                        <div
                            className="relative xs:top-[20px] md:top-[30px] xl:top-[35px]"
                            data-cy="label-carousel-1"
                        >
                            <LabelCarousel
                                labelsArr={firstLabelArr}
                                dataTooltipId="tin-carousel-1"
                                tooltipPosition="top"
                            />
                        </div>
                        <div
                            className="relative xs:top-[25px] md:top-[40px] xl:top-[50px]"
                            data-cy="label-carousel-2"
                        >
                            <LabelCarousel
                                labelsArr={secondLabelArr}
                                dataTooltipId="tin-carousel-2"
                                tooltipPosition="bottom"
                            />
                        </div>
                        <div className="relative xs:top-[65px] xs:right-[80px] md:top-[105px] md:right-[110px] xl:top-[140px] xl:right-[140px]">
                            <div
                                className="flex flex-col justify-center items-center"
                                data-cy="label-carousel-3"
                            >
                                <h1 className="font-omnes text-white xs:text-xl xl:text-2xl m-0">
                                    Stage
                                </h1>
                                <LabelCarousel
                                    labelsArr={thirdLabelArr}
                                    dataTooltipId="tin-carousel-3"
                                    tooltipPosition="top"
                                />
                            </div>
                        </div>
                    </div>
                )}
                {isTurned && (
                    <div className="absolute">
                        <div className="relative h-0 xs:bottom-[128px] xs:right-[70px] md:bottom-[170px] md:right-[95px] xl:bottom-[213px] xl:right-[115px]">
                            <p className="font-forma font-bold text-primaryBlueDark xs:text-[9px] md:text-[11px] xl:text-[14px] xs:w-[92px] md:w-28 xl:w-40 mb-1">
                                How to prepare:
                            </p>
                            <div className="xs:hidden md:flex items-center justify-center gap-4 mb-1">
                                <img
                                    alt="puzzle icon"
                                    src={require('../../assets/images/digitalResources/readingFormulaLabels/puzzle.png')}
                                    className="xs:w-[6px] md:w-[25px] xl:w-[40px]"
                                />
                                <img
                                    alt="meal icon"
                                    src={require('../../assets/images/digitalResources/readingFormulaLabels/meal.png')}
                                    className="xs:w-[6px] md:w-[25px] xl:w-[40px]"
                                />
                                <img
                                    alt="nutrients icon"
                                    src={require('../../assets/images/digitalResources/readingFormulaLabels/nutrients.png')}
                                    className="xs:w-[6px] md:w-[25px] xl:w-[40px]"
                                />
                            </div>
                            <p className="text-primaryBlueDark xs:text-[7px] md:text-[9px] xl:text-[11px] m-0 xs:w-[120px] md:w-40 xl:w-48">
                                {messages.formatMessage({
                                    id: 'tinBack1',
                                })}
                            </p>
                        </div>
                        <div className="relative h-0 xs:-bottom-[25px] xs:right-[70px] md:-bottom-[32px] md:right-[95px] xl:-bottom-[40px] xl:right-[115px]">
                            <p className="font-forma font-bold text-primaryBlueDark xs:text-[8px] md:text-[11px] xl:text-[14px] xs:w-[92px] md:w-28 xl:w-40 xs:mb-1 md:mb-0">
                                Ingredients:
                            </p>
                            <p className="text-primaryBlueDark xs:text-[6px] md:text-[9px] xl:text-[11px] m-0 xs:w-[120px] md:w-40 xl:w-48">
                                {messages.formatMessage({
                                    id: 'tinBack2',
                                })}
                            </p>
                        </div>
                        <div className="relative h-0 xs:bottom-[125px] xs:-right-[75px] md:bottom-[165px] md:-right-[95px] xl:bottom-[210px] xl:-right-[115px]">
                            <p className="font-forma font-bold text-primaryBlueDark xs:text-[9px] md:text-[11px] xl:text-[14px] xs:w-[110px] md:w-36 xl:w-44 mb-1">
                                Nutritional information:
                            </p>
                            <p className="font-forma font-bold text-primaryBlueDark xs:text-[9px] md:text-[10px] xl:text-[13px] xs:w-[92px] md:w-28 xl:w-44 mb-1">
                                Energy
                            </p>
                            <p className="text-primaryBlueDark xs:text-[7px] md:text-[9px] xl:text-[11px] m-0 xs:w-[110px] md:w-36 xl:w-48">
                                {messages.formatMessage({
                                    id: 'tinBack3',
                                })}
                            </p>
                            <p className="font-forma font-bold text-primaryBlueDark xs:text-[9px] md:text-[10px] xl:text-[13px] xs:w-[92px] md:w-28 xl:w-44 mb-1 mt-3">
                                Protein
                            </p>
                            <p className="text-primaryBlueDark xs:text-[7px] md:text-[9px] xl:text-[11px] m-0 xs:w-[110px] md:w-36 xl:w-48">
                                {messages.formatMessage({
                                    id: 'tinBack4',
                                })}
                            </p>
                        </div>
                    </div>
                )}
                <img
                    data-cy="interactive-img"
                    alt="baby formula tin"
                    src={isTurned ? tinBack : tinFront}
                    className="xs:w-[300px] md:w-[400px] xl:w-[500px]"
                />
            </div>
            <div className="w-full flex justify-end items-end xs:mt-0 xl:-mt-8 xs:pr-0 xl:pr-16 cursor-pointer">
                <img
                    alt="Flip icon"
                    src={require('../../assets/images/digitalResources/readingFormulaLabels/flip.png')}
                    className="xs:w-[70px] md:w-[100px]"
                    onClick={() => flipTin()}
                    data-tooltip-id="flip-img-tooltip"
                    data-cy="flip-img-btn"
                    data-tooltip-content={messages.formatMessage({
                        id: isTurned
                            ? 'flipTinFrontTooltip'
                            : 'flipTinBackTooltip',
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
                    id: 'tinsResourceTitle',
                })}
                subtitle={messages.formatMessage({
                    id: 'tinsResourceSubtitle',
                })}
                text={messages.formatMessage({
                    id: 'tinsResourceText',
                })}
                btn1Text="Download the PDF"
                btn1Link="https://indd.adobe.com/view/640601dc-e9ff-49a1-949f-e486ef643430"
                btn2Text="Download the Cheatsheet"
                btn2Link="https://indd.adobe.com/view/32523d56-990e-448f-9187-9ee4200aea7f"
                btn3Text="Infant formula: Making, storing and transporting it"
                btn3Link="https://raisingchildren.net.au/newborns/breastfeeding-bottle-feeding/bottle-feeding/formula-making-storing-transporting"
                panel={formulaTin}
            />
            <AllergiesComponent />
            <Footer pageAnalitycsId="reading-formula-labels-page" />
        </div>
    );
}

export default ReadingFormulaLabels;
