import { useContext } from 'react';
import { PathwayContext } from '../../utils/Contexts';
import { useIntl } from 'react-intl';
import NavigationButtons from './NavigationButtons';

/**
 * This renders the first page a user sees when they click on the FHP button
 * Find a Health Professional introduction page
 * @returns FHP first page
 */
function IntroPage() {
    const messages = useIntl();
    // change the current pathway based on what button the user selects
    const { setPath } = useContext(PathwayContext);
    return (
        <div className="w-full h-full">
            <NavigationButtons />
            <div
                id="FHP-start-page-container"
                className="xs:pt-[26vw] mdsm:pt-[23vw] md:pt-[8vw] 2xl:pt-[12vw] xs:ml-8 sm:ml-12 md:ml-32 lg:ml-44 w-3/4 md:w-2/4 flex justify-center flex-col"
            >
                <h1 className="font-omnes pb-10 xs:text-3xl md:text-5xl">
                    {messages.formatMessage({ id: 'FHP' })}
                </h1>
                <h5 className=" text-base font-normal pb-14 md:pb-20 2xl:pb-32 xs:w-full w-3/5 lg:w-1/2">
                    {messages.formatMessage({ id: 'FHPDescription' })}
                </h5>
                <h4 className="font-bold pb-10 xs:text-base text-xl xs:w-full w-2/3 lg:w-1/2">
                    {messages.formatMessage({ id: 'FHPQuestion' })}
                </h4>
                <div
                    id="fhp-intro-btn-container"
                    className="font-omnes flex gap-4 pb-14 lg:w-3/5 xs:w-full"
                >
                    <button
                        id="next-button"
                        className=" bg-white !leading-1 hover:!bg-lightGrey text-primaryBlueDark xs:p-2 sm:w-1/3 xs:w-[35vw] xs:text-sm md:text-[1rem] h-20 rounded-none"
                        onClick={() => {
                            setPath('informationPage');
                        }}
                    >
                        {messages.formatMessage({ id: 'FHP' })}{' '}
                    </button>
                    <a
                        id="helpline-button"
                        className="bg-white hover:!bg-lightGrey !leading-1 text-primaryBlueDark no-underline font-omnes md:text-[1rem] xs:text-sm xs:p-2 sm:w-1/3 h-20 xs:w-[35vw] grid place-items-center text-center rounded-none hover:text-primaryBlueDark"
                        href="https://raisingchildren.net.au/grown-ups/services-support/about-services-support/helplines/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {messages.formatMessage({ id: 'helpLinesBtn' })}
                    </a>
                </div>
                <p
                    id="emergency-text"
                    className="text-white underline font-bold font-forma xs:text-base md:text-2xl"
                >
                    {messages.formatMessage({ id: 'call000' })}
                </p>
            </div>
        </div>
    );
}

export default IntroPage;
