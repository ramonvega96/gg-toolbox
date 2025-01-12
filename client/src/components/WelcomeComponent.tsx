import YoutubeEmbed from '../utils/YoutubeEmbed';
import SearchBarContainer from './searchbar/SearchBarContainer';
import MultiPurposeModal from './FHP/modals/MultiPurposeModal';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * WelcomeComponentInterface
 * @param title the title for the left side
 * @param description the description for the left side
 * @param panel the image on the right side
 * @param panelAlt the image alt text
 * @param icon an icon (image) to have on the left side
 * @param borderColor optional border and colour selection (bottom only)
 * @param borderTop booleon for adding border to the top of the section
 * @param search boolean for showing the search bar at the bottom
 *
 */
interface WelcomeComponentInterface {
    title: string;
    description: string;
    panel?: string;
    panelAlt?: string;
    embedYoutubeId?: string;
    icon: string;
    borderColor?:
        | 'secondaryBlue'
        | 'secondaryGreen'
        | 'secondaryRed'
        | 'secondaryOrange'
        | 'secondaryYellow'
        | 'secondaryPink'
        | 'tertiaryGreen';
    borderTop?: boolean;
    search?: boolean;
    modalBtnText?: string;
    modalHeader?: string;
    modalContent?: React.ReactNode;
}

function WelcomeComponent(props: WelcomeComponentInterface) {
    const {
        title,
        description,
        panel,
        panelAlt,
        embedYoutubeId,
        icon,
        borderColor,
        search,
        borderTop,
        modalBtnText,
        modalHeader,
        modalContent,
    } = props;

    const [modal, setModal] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const modalDisplay = searchParams.has('modalDisplay')
            ? searchParams.get('modalDisplay')
            : '';
        modalDisplay === 'open' ? setModal(true) : setModal(false);
        searchParams.delete('modalDisplay');
    }, [searchParams]);

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
                    id="welcome-ggtoolbox-container"
                    className={`flex flex-row bg-primaryBlue`}
                >
                    <div
                        id="left-side-ggtoolbox"
                        className="flex items-center xs:pl-16 md:pl-20 xl:pl-36 max-md:py-8 xl:pr-16 pr-8 md:w-2/5"
                    >
                        <div className="flex flex-col text-white text-left">
                            {icon && (
                                <div className="w-[8vw] h-[8vw] min-w-[90px] min-h-[90px] max-w-[120px] max-h-[120px] lg:mb-6 mymd:mb-4 sm:mb-2 flex justify-start items-center bg-white rounded-full">
                                    <img
                                        className="h-full w-full"
                                        src={require(
                                            '../assets/images/icons/header_svgs/' +
                                                icon
                                        )}
                                        alt="corresponding section icon"
                                    />
                                </div>
                            )}
                            <h1
                                id="section-title"
                                className="font-omnes font-bold xl:text-3xl md:text-base max-md:text-3xl lg:mb-12 mymd:mb-5 sm:mb-2"
                            >
                                {title}
                            </h1>
                            <span
                                id="section-description"
                                className="font-forma xl:text-xl md:text-sm max-md:text-xl tracking-normal"
                            >
                                {description}
                            </span>
                        </div>
                    </div>
                    {panel && icon && (
                        <div
                            className={`md:flex hidden h-full w-3/5 ${
                                icon !== 'ATSI.png'
                                    ? 'overflow-hidden max-h-[550px]'
                                    : 'justify-end'
                            }`}
                        >
                            <img
                                src={panel}
                                alt={panelAlt}
                                className={`${
                                    icon !== 'ATSI.png'
                                        ? 'object-cover object-top object-center w-full'
                                        : 'w-[45vw]'
                                }`}
                            />
                            {modalBtnText && (
                                <div className="h-0 w-0 relative float-right md:right-[14vw] xl:right-[10vw] top-[1vw]">
                                    <div
                                        className="md:w-28 md:h-28 xl:w-32 xl:h-32 bg-secondaryGreen hover:bg-tertiaryGreen rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                                        onClick={() => setModal(true)}
                                        id="modal-btn"
                                    >
                                        <span className="font-forma font-bold text-white md:text-base xl:text-lg text-center">
                                            {modalBtnText}
                                        </span>
                                    </div>
                                </div>
                            )}
                            {modalContent && (
                                <div className="relative z-[50]">
                                    {modal && (
                                        <MultiPurposeModal
                                            toggleModal={setModal}
                                            modalContent={modalContent}
                                            modalHeader={modalHeader}
                                            maxModalWidth="max-w-[1000px]"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    {embedYoutubeId && (
                        <div
                            id="right-side-video-ggtoolbox"
                            className="w-3/5 md:flex hidden overflow-hidden"
                        >
                            <YoutubeEmbed
                                embedId={embedYoutubeId}
                                paddingBottom="pb-[56.25%]"
                            />
                        </div>
                    )}
                </div>
                {search && (
                    <div className="bg-primaryBlueDark w-screen flex justify-center">
                        <div className="sm:w-3/4 w-5/6">
                            <SearchBarContainer backgroundColor="primaryBlueDark" />
                        </div>
                    </div>
                )}
                <div
                    id="right-side-ggtoolbox-mobile"
                    className="w-full md:hidden overflow-hidden"
                >
                    {modalBtnText && (
                        <div className="h-0 relative float-right right-[5vw] top-[5vw]">
                            <div
                                className="w-24 h-24 bg-secondaryGreen hover:bg-tertiaryGreen rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                                onClick={() => setModal(true)}
                                id="modal-btn-mobile"
                            >
                                <span className="font-forma font-bold text-white text-sm text-center">
                                    {modalBtnText}
                                </span>
                            </div>
                        </div>
                    )}
                    {modalContent && (
                        <div
                            id="about-artwork-modal"
                            className="relative z-[50]"
                        >
                            {modal && (
                                <MultiPurposeModal
                                    toggleModal={setModal}
                                    modalContent={modalContent}
                                    modalHeader={modalHeader}
                                />
                            )}
                        </div>
                    )}
                    {panel && (
                        <img
                            src={panel}
                            alt={panelAlt}
                            className={`object-cover object-top object-center w-full`}
                        />
                    )}
                    {embedYoutubeId && (
                        <YoutubeEmbed
                            embedId={embedYoutubeId}
                            paddingBottom="pb-[56.25%]"
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default WelcomeComponent;
