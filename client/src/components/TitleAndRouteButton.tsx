import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../assets/images/icons/svg/right_arrow_svgrepo_com.svg';

interface TitleAndRouteButtonProps {
    title: string;
    buttonTitle: string;
    text?: string;
    route?: string;
    externalLink?: string;
    backgroundColor?: string;
    buttonColor?: string;
    textColor?: string;
    paddingY?: string;
    borderBottom?: string;
    borderTop?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
}

const TitleAndRouteButton = ({
    title,
    buttonTitle,
    text,
    route,
    externalLink,
    backgroundColor,
    buttonColor,
    textColor,
    paddingY,
    borderBottom,
    borderTop,
    secondaryButtonText,
    secondaryButtonLink,
}: TitleAndRouteButtonProps) => {
    const navigate = useNavigate();

    return (
        <div
            id="title-route-button-container"
            className={`${
                backgroundColor ? `bg-${backgroundColor}` : 'bg-primaryBlue'
            } text-white flex md:flex-row p-20 max-md:flex-col w-full items-center max-xl:px-20 xl:px-36
            ${paddingY ? paddingY : 'py-24'} ${
                borderBottom && `border-b-8 border-${borderBottom}`
            } ${borderTop && `border-t-8 border-${borderTop}`}`}
        >
            <div className="max-md:w-full md:w-1/2">
                <h2
                    id="title-route-large-title"
                    className={`${
                        textColor ? `text-${textColor}` : 'text-white'
                    }
                    font-omnes text-3xl`}
                >
                    {title}
                </h2>
                <h5
                    className={`${
                        textColor ? `text-${textColor}` : 'text-white'
                    } w-full text-left md:text-2xl font-normal mt-3`}
                >
                    {text}
                </h5>
            </div>
            <div className="flex flex-col gap-4 max-md:w-full md:w-1/2 max-md:mt-8">
                <button
                    id="title-route-button"
                    className={`${
                        buttonColor ? `bg-${buttonColor}` : 'bg-tertiaryGreen'
                    } px-6 py-4 flex justify-between items-center
                hover:bg-primaryBlueDark md:ml-36 text-xl text-left`}
                    onClick={() => {
                        if (route) {
                            window.scrollTo(0, 0);
                            setTimeout(() => {
                                navigate(route);
                            }, 200);
                        } else if (externalLink)
                            window.open(externalLink, '_blank');
                    }}
                >
                    {buttonTitle}
                    <Arrow
                        className="ml-4"
                        fill="white"
                        width="2em"
                    />
                </button>
                {secondaryButtonText && secondaryButtonLink && (
                    <button
                        id="title-route-button"
                        className={`${
                            buttonColor
                                ? `bg-${buttonColor}`
                                : 'bg-tertiaryGreen'
                        } px-6 py-4 flex justify-between items-center
                hover:bg-primaryBlueDark md:ml-36 text-xl`}
                        onClick={() => {
                            window.open(secondaryButtonLink, '_blank');
                        }}
                    >
                        {secondaryButtonText}
                        <Arrow
                            className="ml-4"
                            fill="white"
                            width="2em"
                        />
                    </button>
                )}
            </div>
        </div>
    );
};

export default TitleAndRouteButton;
