import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';

interface FormDropdownProps {
    dropdownOpen: boolean;
    setDropdownOpen: (dropdownOpen: boolean) => void;
    dropdownSelected: string;
    setDropdownSelected: (dropdownSelected: string) => void;
    dropdownContent: string[];
    onchange: (dropdownSelected: string) => void;
    id: string;
}

const FormDropdown = ({
    dropdownOpen,
    setDropdownOpen,
    dropdownSelected,
    setDropdownSelected,
    dropdownContent,
    onchange,
    id,
}: FormDropdownProps) => {
    const messages = useIntl();

    return (
        <div className="w-full relative">
            <button
                type="button"
                className={`shadow-none bg-white flex flex-row h-12 pl-2 w-full items-center border-[1px] 
        border-formBorderGrey ${dropdownOpen ? 'show' : 'collapsed'}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                id={id}
            >
                <h2 className="accordion-header text-black font-normal flex text-base flex-row items-center w-full justify-between">
                    {dropdownSelected ||
                        messages.formatMessage({ id: 'selectOne' })}
                </h2>
                <span className="pr-8">
                    <FontAwesomeIcon
                        icon={dropdownOpen ? faChevronUp : faChevronDown}
                        className="text-primaryBlueDark"
                    />
                </span>
            </button>
            <div
                className={`${
                    dropdownOpen ? '' : 'hidden'
                } w-full bg-white text-black font-normal border-[1px] border-formBorderGrey 
                absolute z-[15] rounded-md shadow-md`}
            >
                {dropdownContent?.map((content, index) => (
                    <div
                        className={`w-full hover:bg-lightGrey text-black px-6 py-3 text-base text-left cursor-pointer ${
                            index !== 0 ? 'border-t' : ''
                        }`}
                        onClick={() => {
                            setDropdownSelected(content);
                            onchange(content);
                            setDropdownOpen(false);
                        }}
                        key={index}
                        id={`dropdown-option-${index}`}
                    >
                        {content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormDropdown;
