import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    LinksListModal,
    TabsModal,
    UncategorizedBulletsModal,
    CategorizedBulletsModal,
    ECECMapModal,
} from '../types/Modals';
import { IntlShape, useIntl } from 'react-intl';
import { useState, isValidElement } from 'react';

function renderLinksListModal(modalContent: LinksListModal) {
    return (
        <div className="flex flex-col px-8">
            {modalContent.services.map((publicService, index) => {
                return (
                    <a
                        id="public-service-link-hospital-name"
                        className="text-black font-forma"
                        target={'_blank'}
                        href={publicService.link}
                        rel="noreferrer"
                        key={index}
                    >
                        {publicService.linkLabel}
                    </a>
                );
            })}
        </div>
    );
}

function renderTabsModal(
    modalContent: TabsModal,
    activeTab: number,
    setActiveTab: React.Dispatch<React.SetStateAction<number>>
) {
    return (
        <div>
            <div
                id="info-description"
                className="px-10 text-black font-forma whitespace-pre-line font-normal"
            >
                {modalContent.description}
            </div>
            <div className="tabs flex-col items-center mt-8 whitespace-pre-line">
                <div className="w-full flex flex-row gap-x-0.5 ">
                    {modalContent.tabHeaders.map((header, index) => {
                        return (
                            <div
                                id={
                                    // ignoring eslint since this is used for creating a unique id for testing
                                    header
                                        .replace(/\s/g, '-')
                                        .replace(/[\(\)]/g, '') //eslint-disable-line
                                        .toLowerCase()
                                }
                                className={`tab text-center leading-4 text-white font-omnes p-2 w-1/4 h-auto min-h-20 ${
                                    activeTab === index
                                        ? 'bg-primaryBlue'
                                        : 'bg-primaryBlueDark'
                                }`}
                                onClick={() => setActiveTab(index)}
                                key={index}
                            >
                                {header}
                            </div>
                        );
                    })}
                </div>
                <div
                    id="tab-description"
                    className="max-lg:pl-[2.5rem] lg:pl-[2.5rem] pr-[1.5rem] bg-slate-100 h-[55vh] py-4 overflow-y-scroll no-scrollbar"
                >
                    {modalContent.tabContents[activeTab]}
                </div>
            </div>
        </div>
    );
}

/**
 * This function converts a string into its specified mode
 * Description will return the text
 * List will return bullet points
 * (second FHP page)
 * @param info
 * @returns a bullet point list
 */
function renderUncategorizedBulletsModal(
    modalContent: UncategorizedBulletsModal,
    messages: IntlShape
) {
    const listStyling = 'text-black';
    return (
        <div className="px-4">
            <ul
                className={
                    modalContent.bullets.length > 8
                        ? `${listStyling} grid grid-cols-2`
                        : listStyling
                }
            >
                {modalContent.bullets.map((bullet, index) => {
                    return (
                        <li
                            key={index}
                            className="font-forma list-disc text-black px-2"
                        >
                            {makeStringBold(
                                messages.formatMessage({ id: bullet })
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function renderCategorizedBulletsModal(modalContent: CategorizedBulletsModal) {
    return (
        <div className={`flex flex-wrap pr-8 pl-4`}>
            {modalContent.categories.map((category, index) => {
                return (
                    <div
                        className="w-[250px]"
                        key={index}
                    >
                        <p className="text-black pl-2 font-semibold">
                            {category.categoryName}
                        </p>
                        <ul>
                            {category.topics.map((topic) => {
                                return (
                                    <li
                                        key={topic}
                                        className="font-forma list-disc text-black"
                                    >
                                        {topic}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}

function renderECECMapModal(modalContent: ECECMapModal) {
    return (
        <div className="flex justify-center flex-col px-8">
            <div
                id="state-description"
                className="max-lg:text-base lg:text-lg text-primaryBlueDark text-center my-8"
            >
                {modalContent.stateDescription}
            </div>
            <div className="flex flex-row gap-4 justify-center">
                {modalContent.buttons.map((button, index) => {
                    return (
                        <div
                            id={`modal-button-${index}`}
                            key={index}
                            className="flex"
                        >
                            <button
                                className="bg-primaryBlue btn-primary p-4 shadow-md hover:bg-primaryBlueDark rounded-none w-[30vw] max-w-[300px] min-h-[100px] max-lg:min-h-[150px] text-white font-omnes hover:no-underline max-lg:text-sm"
                                onClick={() =>
                                    window.open(button.link, '_blank')
                                }
                            >
                                {button.linkLabel}
                            </button>
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-row gap-4 justify-center w-full">
                {modalContent.buttons.map((button) => {
                    return (
                        <div className="flex w-[30vw] text-center">
                            <span className="w-full font-forma py-4 text-xs italic justify-center">
                                {button.linkNote}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function renderReactNode(modalContent: React.ReactNode) {
    return modalContent;
}

/**
 * This renders the AHP list of professions bold, leaving other bullet points
 * If the number of points is larger than 9, then the list is split into
 * two columns
 * in regular font
 * @param input
 * @returns
 */
function makeStringBold(input: string) {
    if (input.includes('#')) {
        const splitStr = input.split('#');
        return (
            <span className="font-forma">
                <b className="font-forma">{splitStr[0]}</b>
                {splitStr[1]}
            </span>
        );
    }
    return input;
}

interface IMultiPurposeModal {
    toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    modalContent:
        | LinksListModal
        | TabsModal
        | UncategorizedBulletsModal
        | CategorizedBulletsModal
        | ECECMapModal
        | React.ReactNode;
    modalHeader?: string;
    modalFooter?: string;
    maxModalWidth?: string;
    isTinyBites?: boolean;
    noCloseBtn?: boolean;
}

/**
 * This component renders a modal that handles bullet points which have
 * external links that you can click on or a description. This is for the public services
 * section in the DisplayProfession page
 * @param props type: the type of description format to lay out in
 * (bullet points or paragraphs), setModal: show or hide the modal
 * @returns modal component
 */
function MultiPurposeModal(props: IMultiPurposeModal) {
    const {
        toggleModal,
        modalHeader,
        modalFooter,
        modalContent,
        maxModalWidth,
        isTinyBites,
        noCloseBtn,
    } = props;
    const [activeTab, setActiveTab] = useState(0);
    const messages = useIntl();

    /**
     * The following are a "type guard functions": meaning they receive
     * an object from an unknown type but confirms if they belong to a
     * specified type. Therefore, the any is required.
     */

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isLinksListModal = (content: any): content is LinksListModal => {
        return content && content.services;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isTabsModal = (content: any): content is TabsModal => {
        return (
            content &&
            content.description &&
            content.tabHeaders &&
            content.tabContents
        );
    };

    const isUncategorizedBulletsModal = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: any
    ): content is UncategorizedBulletsModal => {
        return content && content.bullets;
    };

    const isCategorizedBulletsModal = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: any
    ): content is CategorizedBulletsModal => {
        return content && content.categories;
    };

    const isECECMapModal = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: any
    ): content is ECECMapModal => {
        return content && content.stateDescription && content.buttons;
    };

    return (
        <div
            id="modal-background"
            className="bg-[#0000006E] bg-opacity-75 transition-opacity top-0 left-0 w-full z-1 fixed h-full grid place-items-center overflow-scroll no-scrollbar"
            onClick={() => {
                toggleModal(false);
            }}
        >
            <div
                id="modal-container"
                className={`bg-white my-10 flex flex-col pt-3 pb-10 w-[85vw] ${
                    maxModalWidth ? maxModalWidth : 'max-w-[800px]'
                } ${isTabsModal(modalContent) ? 'h-[90vh]' : 'h-auto'}`}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="flex flex-row justify-between pb-3 relative">
                    {modalHeader && (
                        <h3 className="font-sans max-md:text-[1.5em] text-[2em] text-primaryBlueDark px-8 w-11/12">
                            {modalHeader}
                        </h3>
                    )}
                    {!noCloseBtn && (
                        <button
                            id="x-button"
                            className={`text-4xl absolute right-8 ${
                                isTinyBites
                                    ? 'top-2 flex bg-tbSecondaryBlue rounded-full h-8 w-8 items-center justify-center'
                                    : 'top-0 text-primaryBlueDark'
                            }`}
                            onClick={() => {
                                toggleModal(false);
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faXmark}
                                className={`${
                                    isTinyBites ? 'text-white m-0 text-xl' : ''
                                }`}
                            />
                        </button>
                    )}
                </div>
                {isLinksListModal(modalContent) &&
                    renderLinksListModal(modalContent)}
                {isTabsModal(modalContent) &&
                    renderTabsModal(modalContent, activeTab, setActiveTab)}
                {isUncategorizedBulletsModal(modalContent) &&
                    renderUncategorizedBulletsModal(modalContent, messages)}
                {isCategorizedBulletsModal(modalContent) &&
                    renderCategorizedBulletsModal(modalContent)}
                {isECECMapModal(modalContent) &&
                    renderECECMapModal(modalContent)}
                {isValidElement(modalContent) && renderReactNode(modalContent)}
                {modalFooter && (
                    <div className="flex flex-row justify-between pt-3 relative">
                        (
                        <p className="font-sans text-primaryBlueDark w-11/12">
                            {modalFooter}
                        </p>
                        )
                    </div>
                )}
            </div>
        </div>
    );
}
export default MultiPurposeModal;
