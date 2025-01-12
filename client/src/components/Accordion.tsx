import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

interface AccordionInterface {
    title: string | JSX.Element;
    content: string | JSX.Element;
    index: number;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}

/**
 * This component creates an expandable accordion. This component should be used
 * in cases where there will be multiple exclusive accordions (i.e. a list of
 * accordions where only 1 can be open at a time)
 * @param props
 * props contains the following:
 *    title - a string or JSX.Element that appears in the accordion header
 *    content - a string or JSX.Element that appears when the accordion is expanded
 *    index - the index of the accordion in the list
 *    activeIndex - the index relating the currently open accordion
 *    setActiveIndex - a function that is passed into this component to set the current expanded song
 * @returns an accordion component
 */
function Accordion(props: AccordionInterface) {
    const { title, content, index, activeIndex, setActiveIndex } = props;
    const accordion = useRef<HTMLDivElement>(null);

    return (
        <div
            className="w-full"
            ref={accordion}
        >
            <div className="border-b border-primaryBlueDark">
                <button
                    type="button"
                    className={`shadow-none flex flex-row py-2 w-full items-center ${
                        index === activeIndex ? 'show' : 'collapsed'
                    }`}
                    onClick={() => {
                        if (index === activeIndex) {
                            setActiveIndex(-1);
                        } else {
                            setActiveIndex(index);
                        }
                    }}
                    data-cy="accordion-btn"
                >
                    <h2 className="accordion-header text-primaryBlueDark text-[.7em] flex flex-row items-center w-full">
                        {title}
                    </h2>
                    <span className="px-4">
                        <FontAwesomeIcon
                            icon={
                                index === activeIndex
                                    ? faChevronUp
                                    : faChevronDown
                            }
                            className="text-primaryBlueDark"
                            size="2x"
                        />
                    </span>
                </button>
                <div
                    className={`${
                        index === activeIndex
                            ? 'show border-t border-primaryBlueDark'
                            : 'collapse'
                    }`}
                >
                    <div className="accordion-body p-0">
                        <div className="flex items-center">{content}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Accordion;
