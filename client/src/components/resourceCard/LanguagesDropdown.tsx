import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import { TranslatedVersion } from './types/Resource';

interface LanguagesDropdownProps {
    translatedVersions: TranslatedVersion[];
    resourceId: number;
    onChange: (translatedVersion: TranslatedVersion) => void;
}

const LanguagesDropdown = ({
    translatedVersions,
    resourceId,
    onChange,
}: LanguagesDropdownProps) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');

    const messages = useIntl();

    return (
        <div
            className="w-full relative cursor-pointer"
            tabIndex={0}
            onBlur={() => setDropdownOpen(false)}
        >
            <div
                className={`flex flex-row justify-between items-center ${
                    dropdownOpen ? 'show' : 'collapsed'
                }`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <div className="text-xs font-thin text-slate-800">
                    {selectedLanguage
                        ? selectedLanguage
                        : messages.formatMessage({ id: 'availableLanguages' })}
                </div>
                <span className="text-xs font-thin text-slate-800">
                    <FontAwesomeIcon
                        icon={dropdownOpen ? faChevronUp : faChevronDown}
                    />
                </span>
            </div>
            <div
                id={`resource-languages-dropdown-${resourceId}`}
                className={`${
                    dropdownOpen ? '' : 'hidden'
                } min-w-full bg-white absolute z-[30] rounded-md shadow-[4px_6px_6px_#00000054]`}
            >
                {translatedVersions.map((translatedVersion, index) => (
                    <div
                        className="cursor-pointer 
                            text-black pl-2 py-1 
                            text-left text-xs 
                            font-thin text-slate-800 
                            hover:bg-lightGrey"
                        onClick={() => {
                            onChange(translatedVersion);
                            setDropdownOpen(false);
                            setSelectedLanguage(
                                translatedVersion.language
                                    .split(' ')
                                    .map(
                                        (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                    )
                                    .join(' ')
                            );
                        }}
                        id={`resource-language-option-${index}-${resourceId}`}
                        key={index}
                    >
                        {translatedVersion.language
                            .split(' ')
                            .map(
                                (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(' ')}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguagesDropdown;
