import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

/**
 * Props for back button
 * setPath and path are a state variable for setting the path the back button
 * will go to
 */
interface NavigationButtonsInterface {
    setPath?(path: string): void;
    path?: string;
}

/**
 * This function renders the go back feature on help pages
 * @param props
 * @returns JSX element
 */
function NavigationButtons(props: NavigationButtonsInterface) {
    const { setPath, path } = props;
    const navigate = useNavigate();
    const messages = useIntl();

    return (
        <div className="flex flex-row relative">
            {path && setPath && (
                <div
                    className="absolute flex flex-col right-40 max-lg:right-16 top-16 max-md:text-2xl max-md:top-5 text-4xl cursor-pointer mr-2"
                    onClick={() => {
                        setPath(path);
                    }}
                >
                    <button id="go-back">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <span className="font-omnes text-white text-base">
                        {messages.formatMessage({ id: 'goBack' })}
                    </span>
                </div>
            )}
            <div
                className="absolute flex flex-col right-20 max-lg:right-4 top-16 max-md:text-2xl max-md:top-5 text-4xl cursor-pointer"
                onClick={() => {
                    navigate(-1);
                }}
            >
                <button id="exit-button">
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <span className="font-omnes text-white text-base">
                    {messages.formatMessage({ id: 'close' })}
                </span>
            </div>
        </div>
    );
}

export default NavigationButtons;
