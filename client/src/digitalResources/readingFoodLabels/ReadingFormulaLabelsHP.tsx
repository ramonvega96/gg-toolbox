import { useIntl } from 'react-intl';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import TextArrowButton from '../sharedComponents/TextArrowButton';
import Accordion from '../../components/Accordion';
import { useState } from 'react';

function ReadingFormulaLabelsHP() {
    const messages = useIntl();
    const [typesActiveContentIndex, setTypesActiveContentIndex] =
        useState<number>(-1);
    const [ingredientsActiveContentIndex, setIngredientsActiveContentIndex] =
        useState<number>(-1);

    const descriptionBanner = (
        <div className="flex md:gap-12 bg-primaryBlue xs:py-8 xl:py-16 flex-col md:flex-row max-mymd:px-16 mymd:px-20 xl:px-36">
            <div className="w-full text-white flex flex-col">
                <h1 className="font-omnes font-bold xl:text-3xl md:text-2xl xs:text-xl mb-2">
                    {messages.formatMessage({
                        id: 'descriptionBannerTitle',
                    })}
                </h1>
                <h1 className="font-omnes font-bold xl:text-2xl md:text-xl xs:text-base mb-8">
                    {messages.formatMessage({
                        id: 'descriptionBannerSubtitle',
                    })}
                </h1>
                <p className="font-forma xl:text-xl md:text-base xs:text-sm">
                    {messages.formatMessage({
                        id: 'descriptionBannerP1',
                    })}
                </p>
            </div>
            <div className="w-full text-white">
                <p className="font-forma xl:text-xl md:text-base xs:text-sm mb-4">
                    {messages.formatMessage({
                        id: 'descriptionBannerP2',
                    })}
                </p>
                <TextArrowButton
                    topText="Download the PDF"
                    link="https://indd.adobe.com/view/04ee9473-0038-4a6b-acc8-5a8f4c4c180b"
                />
            </div>
        </div>
    );

    const formatTextReferencesHighlights = (input: string) => {
        const regex = /\{([^}]+)\}\[([^,]+),([^]+?)\]/g;
        let match;
        const parts: JSX.Element[] = [];
        let lastIndex = 0;

        while ((match = regex.exec(input)) !== null) {
            const textBefore = input.substring(lastIndex, match.index);
            if (textBefore) {
                parts.push(
                    <span
                        className="font-forma xl:text-xl md:text-base xs:text-sm"
                        key={lastIndex}
                    >
                        {textBefore}
                    </span>
                );
            }

            const anchorText = match[1];
            const anchorSup = match[2];
            const anchorHref = match[3];

            if (anchorText && anchorSup && anchorHref) {
                parts.push(
                    <a
                        className="font-forma xl:text-xl md:text-base xs:text-sm"
                        key={match.index}
                        target="_blank"
                        href={anchorHref}
                        rel="noreferrer"
                    >
                        {anchorText}
                        <sup>{anchorSup}</sup>
                    </a>
                );
            }

            lastIndex = regex.lastIndex;
        }

        const textAfter = input.substring(lastIndex);
        if (textAfter) {
            parts.push(
                <span
                    className="font-forma xl:text-xl md:text-base xs:text-sm"
                    key={lastIndex}
                >
                    {textAfter}
                </span>
            );
        }

        return parts;
    };

    const formatReferencesHighlights = (
        textBullets: string[],
        divKey: number
    ) => {
        return (
            <div key={divKey}>
                {formatTextReferencesHighlights(textBullets[0])}
                <ul className="list-disc">
                    {textBullets.map((bulletContent, index) => {
                        if (index !== 0)
                            return (
                                <li key={index}>
                                    {formatTextReferencesHighlights(
                                        bulletContent
                                    )}
                                </li>
                            );
                        return null;
                    })}
                </ul>
            </div>
        );
    };

    const formatReference = (input: string, pKey: number) => {
        const regex = /\[([^,]+)\]/g;
        const match = regex.exec(input);
        const lastIndex = regex.lastIndex;
        const textAfter = input.substring(lastIndex);
        if (match)
            return (
                <p
                    className="font-forma break-words xl:text-xl md:text-base xs:text-sm"
                    key={pKey}
                >
                    <sup>{match[1]}</sup>
                    {textAfter}
                </p>
            );
    };

    const buildAccordionStandarContent = (
        description: string,
        indication: string,
        referencesHighlights: string[]
    ) => (
        <div className="text-primaryBlueDark">
            <h1 className="font-forma font-bold xl:text-2xl md:text-xl xs:text-lg">
                Description:
            </h1>
            <p className="font-forma xl:text-xl md:text-base xs:text-sm">
                {description}
            </p>
            <h1 className="font-forma font-bold xl:text-2xl md:text-xl xs:text-lg">
                Potential indication: {indication}
            </h1>
            <div>
                {referencesHighlights.map((highlight, index) =>
                    formatReferencesHighlights(highlight.split('*'), index)
                )}
            </div>
        </div>
    );

    const buildAccordionReferenceContent = (references: string[]) => (
        <div className="text-primaryBlueDark">
            <h1 className="font-forma font-bold xl:text-2xl md:text-xl xs:text-lg">
                References:
            </h1>
            <div>
                {references.map((reference, index) =>
                    formatReference(reference, index)
                )}
            </div>
        </div>
    );

    const typesAccordionContents = [
        {
            title: messages.formatMessage({ id: 'RFLHPA5Title' }),
            description: messages.formatMessage({ id: 'RFLHPA5Description' }),
            indication: messages.formatMessage({ id: 'RFLHPA5Indication' }),
            highlights: [
                messages.formatMessage({ id: 'RFLHPA5Highlight1' }),
                messages.formatMessage({ id: 'RFLHPA5Highlight2' }),
            ],
        },
        {
            title: messages.formatMessage({ id: 'RFLHPA7Title' }),
            description: messages.formatMessage({ id: 'RFLHPA7Description' }),
            indication: messages.formatMessage({ id: 'RFLHPA7Indication' }),
            highlights: [messages.formatMessage({ id: 'RFLHPA7Highlight1' })],
        },
        {
            title: messages.formatMessage({ id: 'RFLHPA3Title' }),
            description: messages.formatMessage({ id: 'RFLHPA3Description' }),
            indication: messages.formatMessage({ id: 'RFLHPA3Indication' }),
            highlights: [
                messages.formatMessage({ id: 'RFLHPA3Highlight1' }),
                messages.formatMessage({ id: 'RFLHPA3Highlight2' }),
            ],
        },
        {
            title: messages.formatMessage({ id: 'RFLHPA1Title' }),
            description: messages.formatMessage({ id: 'RFLHPA1Description' }),
            indication: messages.formatMessage({ id: 'RFLHPA1Indication' }),
            highlights: [
                messages.formatMessage({ id: 'RFLHPA1Highlight1' }),
                messages.formatMessage({ id: 'RFLHPA1Highlight2' }),
                messages.formatMessage({ id: 'RFLHPA1Highlight3' }),
            ],
        },
        {
            title: messages.formatMessage({ id: 'RFLHPA2Title' }),
            description: messages.formatMessage({ id: 'RFLHPA2Description' }),
            indication: messages.formatMessage({ id: 'RFLHPA2Indication' }),
            highlights: [
                messages.formatMessage({ id: 'RFLHPA2Highlight1' }),
                messages.formatMessage({ id: 'RFLHPA2Highlight2' }),
                messages.formatMessage({ id: 'RFLHPA2Highlight3' }),
            ],
        },
        {
            title: messages.formatMessage({ id: 'RFLHPA4Title' }),
            description: messages.formatMessage({ id: 'RFLHPA4Description' }),
            indication: messages.formatMessage({ id: 'RFLHPA4Indication' }),
            highlights: [
                messages.formatMessage({ id: 'RFLHPA4Highlight1' }),
                messages.formatMessage({ id: 'RFLHPA4Highlight2' }),
            ],
        },
        {
            title: messages.formatMessage({ id: 'RFLHPA6Title' }),
            description: messages.formatMessage({ id: 'RFLHPA6Description' }),
            indication: messages.formatMessage({ id: 'RFLHPA6Indication' }),
            highlights: [
                messages.formatMessage({ id: 'RFLHPA6Highlight1' }),
                messages.formatMessage({ id: 'RFLHPA6Highlight2' }),
                messages.formatMessage({ id: 'RFLHPA6Highlight3' }),
                messages.formatMessage({ id: 'RFLHPA6Highlight4' }),
                messages.formatMessage({ id: 'RFLHPA6Highlight5' }),
                messages.formatMessage({ id: 'RFLHPA6Highlight6' }),
            ],
        },
        {
            title: messages.formatMessage({ id: 'RFLHPA8Title' }),
            description: messages.formatMessage({ id: 'RFLHPA8Description' }),
            indication: messages.formatMessage({ id: 'RFLHPA8Indication' }),
            highlights: [
                messages.formatMessage({ id: 'RFLHPA8Highlight1' }),
                messages.formatMessage({ id: 'RFLHPA8Highlight2' }),
                messages.formatMessage({ id: 'RFLHPA8Highlight3' }),
                messages.formatMessage({ id: 'RFLHPA8Highlight4' }),
            ],
        },
        {
            title: 'References',
            references: [
                messages.formatMessage({ id: 'RFLHPRef1' }),
                messages.formatMessage({ id: 'RFLHPRef2' }),
                messages.formatMessage({ id: 'RFLHPRef3' }),
                messages.formatMessage({ id: 'RFLHPRef4' }),
                messages.formatMessage({ id: 'RFLHPRef5' }),
                messages.formatMessage({ id: 'RFLHPRef6' }),
                messages.formatMessage({ id: 'RFLHPRef7' }),
                messages.formatMessage({ id: 'RFLHPRef8' }),
                messages.formatMessage({ id: 'RFLHPRef9' }),
                messages.formatMessage({ id: 'RFLHPRef10' }),
                messages.formatMessage({ id: 'RFLHPRef11' }),
                messages.formatMessage({ id: 'RFLHPRef12' }),
                messages.formatMessage({ id: 'RFLHPRef13' }),
                messages.formatMessage({ id: 'RFLHPRef14' }),
                messages.formatMessage({ id: 'RFLHPRef15' }),
                messages.formatMessage({ id: 'RFLHPRef16' }),
                messages.formatMessage({ id: 'RFLHPRef17' }),
                messages.formatMessage({ id: 'RFLHPRef18' }),
            ],
        },
    ];

    const ingredientsAccordionContents = [
        {
            title: messages.formatMessage({ id: 'RFLHPA9Title' }),
            description: messages.formatMessage({ id: 'RFLHPA9Description' }),
            indication: messages.formatMessage({ id: 'RFLHPA9Indication' }),
            highlights: [
                messages.formatMessage({ id: 'RFLHPA9Highlight1' }),
                messages.formatMessage({ id: 'RFLHPA9Highlight2' }),
                messages.formatMessage({ id: 'RFLHPA9Highlight3' }),
                messages.formatMessage({ id: 'RFLHPA9Highlight4' }),
            ],
        },
        {
            title: messages.formatMessage({ id: 'RFLHPA10Title' }),
            description: messages.formatMessage({ id: 'RFLHPA10Description' }),
            indication: messages.formatMessage({ id: 'RFLHPA10Indication' }),
            highlights: [messages.formatMessage({ id: 'RFLHPA10Highlight1' })],
        },
        {
            title: 'References',
            references: [
                messages.formatMessage({ id: 'RFLHPRef19' }),
                messages.formatMessage({ id: 'RFLHPRef20' }),
                messages.formatMessage({ id: 'RFLHPRef21' }),
                messages.formatMessage({ id: 'RFLHPRef22' }),
                messages.formatMessage({ id: 'RFLHPRef23' }),
                messages.formatMessage({ id: 'RFLHPRef24' }),
            ],
        },
    ];

    return (
        <div>
            <Header toggleBanner={true} />
            {descriptionBanner}
            <div className="my-8 max-mymd:px-16 mymd:px-20 xl:px-36">
                <h1 className="font-forma xs:w-4/5 md:w-3/5 border-b-4 border-primaryBlueDark xl:text-2xl md:text-xl xs:text-lg">
                    Formula Types:
                </h1>
                {typesAccordionContents.map((item, index: number) => {
                    return (
                        <Accordion
                            key={index}
                            title={
                                <p className="font-omnes font-bold text-left xs:text-base md:text-xl my-0">
                                    {item.title}
                                </p>
                            }
                            content={
                                <div className="w-full bg-slate-100 xs:p-4 md:p-12 xl:p-24">
                                    {item.description &&
                                        item.indication &&
                                        item.highlights &&
                                        buildAccordionStandarContent(
                                            item.description,
                                            item.indication,
                                            item.highlights
                                        )}
                                    {item.references &&
                                        buildAccordionReferenceContent(
                                            item.references
                                        )}
                                </div>
                            }
                            index={index}
                            activeIndex={typesActiveContentIndex}
                            setActiveIndex={setTypesActiveContentIndex}
                        />
                    );
                })}
            </div>
            <div className="my-8 max-mymd:px-16 mymd:px-20 xl:px-36">
                <h1 className="font-forma xs:w-4/5 md:w-3/5 border-b-4 border-primaryBlueDark xl:text-2xl md:text-xl xs:text-lg">
                    Added Ingredients:
                </h1>
                {ingredientsAccordionContents.map((item, index: number) => {
                    return (
                        <Accordion
                            key={index}
                            title={
                                <p className="font-omnes font-bold text-left xs:text-base md:text-xl my-0">
                                    {item.title}
                                </p>
                            }
                            content={
                                <div className="w-full bg-slate-100 xs:p-4 md:p-12 xl:p-24">
                                    {item.description &&
                                        item.indication &&
                                        item.highlights &&
                                        buildAccordionStandarContent(
                                            item.description,
                                            item.indication,
                                            item.highlights
                                        )}
                                    {item.references &&
                                        buildAccordionReferenceContent(
                                            item.references
                                        )}
                                </div>
                            }
                            index={index}
                            activeIndex={ingredientsActiveContentIndex}
                            setActiveIndex={setIngredientsActiveContentIndex}
                        />
                    );
                })}
            </div>
            <Footer pageAnalitycsId="reading-formula-labels-hp-page" />
        </div>
    );
}

export default ReadingFormulaLabelsHP;
