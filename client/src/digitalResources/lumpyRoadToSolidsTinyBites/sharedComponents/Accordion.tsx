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

function Accordion(props: AccordionInterface) {
    const { title, content, index, activeIndex, setActiveIndex } = props;
    const accordion = useRef<HTMLDivElement>(null);

    return (
        <div
            className="w-full"
            ref={accordion}
        >
            <div className="px-12">
                <button
                    type="button"
                    className={`shadow-none flex flex-row w-full items-center border-b border-tbTertiaryBlue py-4 ${
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
                    <h2 className="accordion-header text-tbTertiaryBlue text-[.7em] flex flex-row items-center w-full">
                        {title}
                    </h2>
                    <span className="px-4">
                        <FontAwesomeIcon
                            icon={
                                index === activeIndex
                                    ? faChevronUp
                                    : faChevronDown
                            }
                            className="text-tbTertiaryBlue"
                            size="1x"
                        />
                    </span>
                </button>
            </div>
            <div className={`${index === activeIndex ? 'show' : 'collapse'}`}>
                {content}
            </div>
        </div>
    );
}

export default Accordion;
