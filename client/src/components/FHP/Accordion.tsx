import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import DisplayProfession from './DisplayProfession';
import { HealthProfessional } from './types/HealthProfessional';

interface AccordionInterface {
    professional: HealthProfessional;
}

/**
 * Renders the I need help with... section
 * @param props setPath: the previous page, setTopic: the users selection
 * @returns
 */
function Accordion(props: AccordionInterface) {
    const { professional } = props;
    const [toggleAccordion, setToggleAccordion] = useState<boolean>(false);

    function getProfessionDashed() {
        return professional.profession
            .toLowerCase()
            .replace(/,/g, '')
            .replace(/\s+/g, '-');
    }

    return (
        <div>
            <h2 id={`accordion-heading-${getProfessionDashed()}`}>
                <button
                    type="button"
                    className="flex items-center justify-between py-1 w-full font-[1em] text-left border-b text-white"
                    onClick={() => {
                        setToggleAccordion(!toggleAccordion);
                    }}
                >
                    <span className="font-omnes text-white text-[.7em] max-sm:mr-3 my-3">
                        {professional.profession.replace(
                            /(^\w{1})|(\s+\w{1})/g,
                            (letter) => letter.toUpperCase()
                        )}
                    </span>
                    {toggleAccordion ? (
                        <FontAwesomeIcon
                            className="mb-3 mr-3"
                            icon={faChevronUp}
                            size="xs"
                        />
                    ) : (
                        <FontAwesomeIcon
                            className="mb-3 mr-3"
                            icon={faChevronDown}
                            size="xs"
                        />
                    )}
                </button>
            </h2>
            <div
                id="accordion-body"
                aria-labelledby={`accordion-heading-${getProfessionDashed()}`}
            >
                {toggleAccordion && (
                    <div className="py-3 font-light border-gray-200">
                        <DisplayProfession
                            profession={professional.profession}
                            state={professional.state}
                            professional={professional}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Accordion;
