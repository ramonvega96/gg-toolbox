import { ReactComponent as Arrow } from '../../assets/images/icons/svg/right_arrow_svgrepo_com.svg';
import { useNavigate } from 'react-router-dom';

interface ISplitSection {
    fcBgColor: string;
    fcTitle: string;
    fcText: string;
    fcBtnText: string;
    fcBtnPath: string;

    scBgColor: string;
    scTitle: string;
    scText: string;
    scBtnText: string;
    scBtnPath: string;

    textColor?: string;
    btnStyle?: string;
    borderColor?: string;
}

/**
 *
 * @returns JSX element
 */
function SplitSection(props: ISplitSection) {
    const {
        fcBgColor,
        fcTitle,
        fcText,
        fcBtnText,
        fcBtnPath,
        scBgColor,
        scTitle,
        scText,
        scBtnText,
        scBtnPath,
        textColor,
        btnStyle,
        borderColor,
    } = props;
    const navigate = useNavigate();

    return (
        <div
            id="split-section"
            className={`flex
                mymd:flex-row 
                flex-col
                ${borderColor && `border-b-8 border-${borderColor}`}`}
        >
            <div
                id="first-container"
                className={`bg-${fcBgColor} flex flex-grow flex-col relative ${
                    textColor ? textColor : 'text-white'
                } mymd:pb-28 max-mymd:px-16 mymd:px-20 xl:px-36 mdsm:pt-16 mdsm:pb-20 p-12 w-full`}
            >
                <div className="mb-12 relative z-[2]">
                    <h2 className="lg:mb-8 mymd:mb-6 mb-4 font-omnes xs:text-base md:text-3xl lg:leading-10">
                        {fcTitle}
                    </h2>
                    <span
                        id="fc-text"
                        className="text-base lg:text-xl leading-8"
                    >
                        {fcText}
                    </span>
                </div>
                <button
                    id="fc-btn"
                    className={`${
                        btnStyle
                            ? btnStyle
                            : 'bg-primaryBlue hover:bg-primaryBlueDark'
                    } p-6 flex absolute bottom-8 justify-between items-center max-w-[400px] mymd:w-[30vw] w-[70vw]`}
                    onClick={() => {
                        window.scrollTo(0, 0);
                        setTimeout(() => {
                            navigate(fcBtnPath);
                        }, 200);
                    }}
                >
                    <span
                        id="fc-btn-text"
                        className="max-lg:text-base xl:text-xl"
                    >
                        {fcBtnText}
                    </span>
                    <Arrow
                        className="ml-2"
                        fill="white"
                        width="2em"
                    />
                </button>
            </div>
            <div
                id="second-container"
                className={`bg-${scBgColor} flex-grow flex-col relative ${
                    textColor ? textColor : 'text-white'
                } mymd:pb-28 max-mymd:px-16 mymd:px-20 xl:px-36 mdsm:pt-16 mdsm:pb-20 p-12 w-full`}
            >
                <div className="mb-12 relative z-[2]">
                    <h2 className="lg:mb-8 mymd:mb-6 mb-4 font-omnes xs:text-base md:text-3xl lg:leading-10">
                        {scTitle}
                    </h2>
                    <span
                        id="sc-text"
                        className="text-base lg:text-xl leading-8"
                    >
                        {scText}
                    </span>
                </div>
                <button
                    id="sc-btn"
                    className={`${
                        btnStyle
                            ? btnStyle
                            : 'bg-primaryBlue hover:bg-primaryBlueDark'
                    } p-6 flex absolute bottom-8 justify-between items-center max-w-[400px] mymd:w-[30vw] w-[70vw] text-left`}
                    onClick={() => {
                        window.scrollTo(0, 0);
                        setTimeout(() => {
                            navigate(scBtnPath);
                        }, 200);
                    }}
                >
                    <span
                        id="sc-btn-text"
                        className="max-lg:text-base xl:text-xl"
                    >
                        {scBtnText}
                    </span>
                    <Arrow
                        className="ml-2"
                        fill="white"
                        width="2em"
                    />
                </button>
            </div>
        </div>
    );
}

export default SplitSection;
