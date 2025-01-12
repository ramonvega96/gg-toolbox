import { ReactComponent as Arrow } from '../../assets/images/icons/svg/right_arrow_svgrepo_com.svg';

export interface TextArrowButtonInterface {
    topText: string;
    link?: string;
    onClickEffect?: () => void;
    bottomText?: string;
    paddingStyling?: string;
    textStyling?: string;
    coloursStyling?: string;
    invertedFont?: boolean;
    icon?: string;
}

function TextArrowButton(props: TextArrowButtonInterface) {
    const {
        topText,
        link,
        onClickEffect,
        bottomText,
        paddingStyling,
        textStyling,
        coloursStyling,
        invertedFont,
        icon,
    } = props;

    return (
        <button
            id="title-route-button"
            className={`${
                coloursStyling
                    ? coloursStyling
                    : 'bg-secondaryGreen hover:bg-tertiaryGreen'
            } w-full mt-2 flex justify-between items-center text-white ${
                paddingStyling
                    ? paddingStyling
                    : 'xs:px-4 xs:py-2 xl:px-12 xl:py-4'
            }`}
            onClick={() => {
                if (link) window.open(link, '_blank');
                else if (onClickEffect) onClickEffect();
            }}
            data-cy="modal-btn"
        >
            <div className="flex items-center">
                {icon && (
                    <img
                        alt="grow and go logo"
                        src={require(
                            `../../assets/icons/resourceType/${icon}.png`
                        )}
                        className="xs:w-[30px] xs:h-[30px] xl:w-[45px] xl:h-[45px] mr-2 xs:-ml-2 xl:-ml-8"
                    />
                )}
                <div className="flex flex-col justify-center text-left">
                    <p
                        className={`m-0  font-forma ${
                            bottomText && !invertedFont && 'font-bold'
                        } ${
                            textStyling
                                ? textStyling
                                : invertedFont
                                ? 'xs:text-xs md:text-sm'
                                : 'xs:text-sm md:text-base'
                        }`}
                    >
                        {topText}
                    </p>
                    {bottomText && (
                        <p
                            className={`m-0 font-forma ${
                                invertedFont
                                    ? 'xs:text-sm md:text-base font-bold'
                                    : 'xs:text-xs md:text-sm'
                            }`}
                        >
                            {bottomText}
                        </p>
                    )}
                </div>
            </div>
            <Arrow
                className="ml-2"
                fill="white"
                width="2em"
            />
        </button>
    );
}

export default TextArrowButton;
