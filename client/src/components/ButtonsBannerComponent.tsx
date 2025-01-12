interface ButtonsBannerComponentInterface {
    title: string;
    description: string;
    panel: string;
    panelAlt: string;
    topButton: JSX.Element;
    bottomButton?: JSX.Element;
    borderColor?:
        | 'secondaryBlue'
        | 'secondaryGreen'
        | 'secondaryRed'
        | 'secondaryOrange'
        | 'secondaryYellow'
        | 'secondaryPink'
        | 'tertiaryGreen';
    borderTop?: boolean;
}

function ButtonsBannerComponent(props: ButtonsBannerComponentInterface) {
    const {
        title,
        description,
        panel,
        panelAlt,
        borderColor,
        topButton,
        bottomButton,
        borderTop,
    } = props;

    return (
        <>
            <div
                className={`flex flex-col ${
                    borderColor &&
                    `border-b-8 border-${borderColor} ${
                        borderTop && 'border-t-8'
                    }`
                }`}
            >
                <div
                    id="right-side-ggtoolbox-mobile"
                    className="w-full md:hidden overflow-hidden"
                >
                    <img
                        src={panel}
                        alt={panelAlt}
                        className={`object-cover object-top object-center w-full`}
                    />
                </div>
                <div
                    id="welcome-ggtoolbox-container"
                    className="flex bg-primaryBlue max-h-[800px]"
                >
                    <div
                        id="left-side-ggtoolbox"
                        className="flex flex-col text-white justify-center md:w-2/5 xs:pl-16 md:pl-20 xl:pl-36 pr-16 py-5"
                    >
                        <h1 className="font-omnes text-left font-bold xl:text-3xl md:text-base max-md:text-3xl lg:mb-12 mymd:mb-5 sm:mb-2">
                            {title}
                        </h1>
                        <span className="font-forma text-left xl:text-xl md:text-sm max-md:text-xl tracking-normal">
                            {description}
                        </span>
                        <div
                            id="buttons-container"
                            className="flex flex-col"
                        >
                            {topButton}
                            {bottomButton}
                        </div>
                    </div>
                    <div
                        id="right-side-ggtoolbox"
                        className="w-3/5 md:flex hidden overflow-hidden"
                    >
                        {panel && (
                            <img
                                src={panel}
                                alt={panelAlt}
                                className={`object-cover object-top object-center w-full`}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ButtonsBannerComponent;
