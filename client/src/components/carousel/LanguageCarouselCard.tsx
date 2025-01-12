import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface LanguageCarouselCardProps {
    name: string;
    label: string;
}

/**
 * Renders a card used in the carousel grid which has a foreign langauge on the front and
 * the english translation on hover and redirects to the search page with the language
 *
 * @param name: the name of the language in the native language
 * @param label: the name of the language in english
 */
const LanguageCarouselCard = ({
    name: languageNative,
    label: languageEnglish,
}: LanguageCarouselCardProps) => {
    const navigate = useNavigate();

    const [hover, setHover] = useState(false);

    return (
        <div
            className="flex font-omnes bg-white text-primaryBlueDark text-xl justify-center text-center items-center transition ease-in-out delay-10 hover:!bg-lightGrey whitespace-pre-wrap w-72 h-40 border-[0.25px] border-black shadow-[0px_3px_2px_#00000054] cursor-pointer"
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
            onClick={() => {
                navigate(`/search?languages=${languageEnglish}`);
            }}
        >
            {languageNative}
            {hover && `\n(${languageEnglish})`}
        </div>
    );
};

export default LanguageCarouselCard;
