import { useIntl } from 'react-intl';
import TextArrowButton, {
    TextArrowButtonInterface,
} from '../../sharedComponents/TextArrowButton';
import AccordionBodyLayout, { AccordionBody } from './AccordionBodyLayout';
import { useEffect, useState } from 'react';
import Accordion from './Accordion';
import { useSearchParams } from 'react-router-dom';

export interface IAccordion extends AccordionBody {
    title: string;
}

interface IModalLayout {
    heading: string;
    subHeading: string;
    description: string;
    modalBody: IAccordion[];
    bottomBanner?: JSX.Element;
    additionalFooterBtns?: TextArrowButtonInterface[];
}

const formatItalicsText = (input: string): JSX.Element[] => {
    const parts: JSX.Element[] = [];
    const regex = /__(.*?)__/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(input)) !== null) {
        const textBefore = input.substring(lastIndex, match.index);
        if (textBefore) {
            parts.push(<span key={lastIndex}>{textBefore}</span>);
        }

        const italicsText = match[1];
        if (italicsText) {
            parts.push(<em key={match.index}>{italicsText}</em>);
        }

        lastIndex = regex.lastIndex;
    }

    const textAfter = input.substring(lastIndex);
    if (textAfter) {
        parts.push(<span key={lastIndex}>{textAfter}</span>);
    }

    return parts;
};

const formatBoldText = (input: string): JSX.Element[] => {
    const parts: JSX.Element[] = [];
    const regex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(input)) !== null) {
        const textBefore = input.substring(lastIndex, match.index);
        if (textBefore) {
            parts.push(
                <span key={lastIndex}>{formatItalicsText(textBefore)}</span>
            );
        }

        const boldText = match[1];
        if (boldText) {
            parts.push(
                <strong key={match.index}>{formatItalicsText(boldText)}</strong>
            );
        }

        lastIndex = regex.lastIndex;
    }

    const textAfter = input.substring(lastIndex);
    if (textAfter) {
        parts.push(<span key={lastIndex}>{formatItalicsText(textAfter)}</span>);
    }

    return parts;
};

const formatUL = (text: string, index: number) => {
    return (
        <div key={index}>
            <ul className="list-disc">
                {text.split('[]').map((bulletContent, liIndex) => {
                    if (bulletContent)
                        return (
                            <li key={liIndex}>
                                <p className={`font-roboto text-base mb-0`}>
                                    {formatBoldText(bulletContent)}
                                </p>
                            </li>
                        );
                    return null;
                })}
            </ul>
        </div>
    );
};

export const formatText = (text: string) => {
    return (
        <div>
            {text.split('\n').map((paragraphContent, index) => {
                if (paragraphContent.includes('[]'))
                    return formatUL(paragraphContent, index);
                else {
                    return (
                        <p
                            className={`font-roboto text-base`}
                            key={index}
                        >
                            {formatBoldText(paragraphContent)}
                        </p>
                    );
                }
            })}
        </div>
    );
};

function ModalLayout({
    heading,
    subHeading,
    description,
    modalBody,
    bottomBanner,
    additionalFooterBtns,
}: IModalLayout) {
    const messages = useIntl();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeContentIndex, setActiveContentIndex] = useState<number>(
        searchParams.has('acc')
            ? parseInt(searchParams.get('acc') as string)
            : -1
    );

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams);
        if (activeContentIndex > -1) {
            newParams.set('acc', String(activeContentIndex));
        } else {
            newParams.delete('acc');
        }
        setSearchParams(newParams);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeContentIndex]);

    return (
        <div>
            <div className="px-12">
                <h1 className="font-gelica font-bold xs:text-xl xl:text-2xl text-tbSecondaryBlue mb-4">
                    {messages.formatMessage({
                        id: heading,
                    })}
                </h1>
                <div className="flex mb-8">
                    <div className="border-b-8 border-tblightGreen w-full" />
                    <div className="border-b-8 border-tbYellow w-full" />
                    <div className="border-b-8 border-tbDarkPink w-full" />
                    <div className="border-b-8 border-tbDarkRed w-full" />
                </div>
                {subHeading && (
                    <h1 className="font-gelica font-bold xs:text-base xl:text-xl text-tbSecondaryBlue mb-4">
                        {messages.formatMessage({
                            id: subHeading,
                        })}
                    </h1>
                )}
                {description &&
                    formatText(
                        messages.formatMessage({
                            id: description,
                        })
                    )}
            </div>
            <div className="px-12 pt-4">
                <div className="m-0 h-[1px] bg-tbTertiaryBlue" />
            </div>
            <div className="pb-8">
                {modalBody.map((item: IAccordion, index: number) => {
                    return (
                        <Accordion
                            key={index}
                            title={
                                <p className="font-roboto font-bold text-tbTertiaryBlue text-left text-lg m-0">
                                    {messages.formatMessage({
                                        id: item.title,
                                    })}
                                </p>
                            }
                            content={
                                <div>
                                    <div className="w-full bg-slate-100 px-12 py-8">
                                        <AccordionBodyLayout
                                            {...modalBody[index]}
                                        />
                                    </div>
                                    <div className="px-12">
                                        <div className="m-0 h-[1px] bg-tbTertiaryBlue" />
                                    </div>
                                </div>
                            }
                            index={index}
                            activeIndex={activeContentIndex}
                            setActiveIndex={setActiveContentIndex}
                        />
                    );
                })}
            </div>
            <div className="flex h-2">
                <div className="bg-tblightGreen w-full" />
                <div className="bg-tbYellow w-full" />
                <div className="bg-tbDarkPink w-full" />
                <div className="bg-tbDarkRed w-full" />
            </div>
            {bottomBanner && (
                <div className="bg-tbModalGray px-12 py-4 overflow-hidden">
                    <div className="xs:hidden md:block h-0 relative float-right left-[100px] bottom-[90px]">
                        <div
                            className={`w-[300px] h-[314px] bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/tb-bottomBanner.png")] bg-contain bg-no-repeat`}
                        />
                    </div>
                    <div className="xs:w-full md:w-3/4">{bottomBanner}</div>
                </div>
            )}
            <div className="bg-tbPrimaryBlue px-12 py-4">
                <div className="xs:w-full md:w-3/4">
                    {additionalFooterBtns &&
                        additionalFooterBtns.map((btn, index) => (
                            <TextArrowButton
                                key={index}
                                topText={btn.topText}
                                bottomText={btn.bottomText}
                                link={btn.link}
                                coloursStyling="bg-tbTeal hover:bg-tbDarkTeal"
                                invertedFont={true}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ModalLayout;
