import UpButton from '../UpButton';
import { useIntl } from 'react-intl';
import FooterLinks from './FooterLinks';
import { useEffect, useState } from 'react';
import FeedbackButton from './Feedback/FeedbackButton';
import FeedbackRatings, {
    getItemFeedback,
    handleFeedbackChange,
} from './Feedback/FeedbackRatings';
import ProudlySupported from './ProudlySupported';
import { ReactComponent as Noodle } from '../../assets/images/graphics/Noodle-2.svg';
import FooterArtwork from '../../assets/images/footer/FooterArtwork.png';
import { updatePageUserScore } from '../../utils/NetworkCalls';

/**
 * Props for Footer
 * feedbackOnly: toggles a feedback style footer display
 */
interface FooterInterface {
    pageAnalitycsId: string;
    feedbackOnly?: boolean;
    noNoodle?: boolean;
    proudlySupported?: boolean;
    quickLinksOnly?: boolean;
}

/**
 * Renders the bottom footer (not including the clickable links, see FooterLinks)
 * Currently this component is being used for the "Was this page helpful section?"
 * @param feedbackOnly
 * @returns a footer component
 */
function Footer(props: FooterInterface) {
    const {
        pageAnalitycsId,
        feedbackOnly,
        noNoodle,
        proudlySupported,
        quickLinksOnly,
    } = props;
    const messages = useIntl();
    const [feedback, setFeedback] = useState<boolean | null>();

    useEffect(() => {
        setFeedback(
            getItemFeedback(pageAnalitycsId, 'likedPages', 'dislikedPages')
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    useEffect(() => {
        if (feedback !== undefined)
            handleFeedbackChange(
                feedback as boolean | null,
                pageAnalitycsId,
                'likedPages',
                'dislikedPages',
                updatePageUserScore as (
                    item: string | number,
                    caseNum: number
                ) => Promise<void>
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [feedback]);

    return (
        <div className="bottom-0 w-full">
            <div
                id="footer-content"
                className="bottom-0 w-full shadow-[0px_-8px_1px_.1rem_#ff9233,0px_8_1px_.1rem_#ff9233] overflow-hidden"
            >
                <div
                    id="feedback-footer-container"
                    className={`flex mymd:flex-row flex-col ${
                        feedbackOnly ? 'bg-primaryBlue' : 'bg-primaryBlueDark'
                    } ${
                        quickLinksOnly ? 'hidden' : ''
                    } text-white max-mymd:px-16 mymd:px-20 xl:px-36 max-lg:py-16 pt-4 pb-16`}
                >
                    <div
                        id="feedback-title-ratings-button-container"
                        className="flex items-center mymd:flex-row flex-col mymd:w-1/2 w-full mymd:pr-20 xl:pr-36"
                    >
                        <h2
                            id="feedback-title-text"
                            className="font-omnes text-left text-base xs:text-2xl md:text-3xl mymd:mr-4 xs:mb-8 xl:mb-0"
                        >
                            {messages.formatMessage({
                                id: 'wasThisPageHelpful',
                            })}
                        </h2>
                        {feedback !== undefined && (
                            <FeedbackRatings
                                mode="footer"
                                feedback={feedback}
                                setFeedback={setFeedback}
                            />
                        )}
                    </div>
                    <span
                        id="description-button-container"
                        className="mymd:w-1/2 w-full mymd:text-xl sm:text-base content-center mymd:pl-20 xl:pl-36
                        max-sm:mt-2 max-sm:mb-10 mymd:mt-12 lg:mt-10 font-normal font-forma mt-8
                        "
                    >
                        {messages.formatMessage({
                            id: 'feedbackDescription',
                        })}
                        <div
                            id="feedback-button"
                            className="mt-10"
                        >
                            <FeedbackButton />
                        </div>
                    </span>
                </div>
                {proudlySupported && <ProudlySupported />}
                {!feedbackOnly && (
                    <>
                        <FooterLinks />
                        <div
                            id="acknowledgement-custodian-container"
                            className="flex items-center justify-center w-full bg-primaryBlue py-10 min-h-[350px]"
                        >
                            <div className="flex flex-col justify-center items-center">
                                <div
                                    id="flags"
                                    className="flex flex-row gap-4 mb-4"
                                >
                                    <img
                                        alt="traditional owners flag"
                                        src={require('../../assets/images/footer/tradtional_flag.png')}
                                    />
                                    <img
                                        alt="torres strait flag"
                                        src={require('../../assets/images/footer/flag-torres-strait.png')}
                                    />
                                    <img
                                        alt="pride flag"
                                        src={require('../../assets/images/footer/pride-progress-flag.png')}
                                    />
                                </div>
                                <div
                                    id="footer-text"
                                    className="w-full text-center text-white px-[20vw]"
                                >
                                    <p
                                        id="acknowledgment-text"
                                        className="font-thin"
                                    >
                                        {messages.formatMessage({
                                            id: 'acknowledgment',
                                        })}
                                    </p>
                                    <p
                                        id="inclusion-text"
                                        className="font-thin"
                                    >
                                        {messages.formatMessage({
                                            id: 'inclusion',
                                        })}
                                    </p>
                                    <hr style={{ borderTop: '2px solid' }}></hr>
                                </div>
                            </div>
                        </div>
                        <div className="h-0 max-mymd:hidden relative float-right bottom-[25rem] mymd:right-[-340px] xl:right-[-290px] 2xl:right-[-220px]">
                            <img
                                className="h-[540px]"
                                src={FooterArtwork}
                                alt="Aboriginal footer artwork"
                            />
                        </div>
                    </>
                )}
                {!noNoodle && (
                    <div className="h-0">
                        {/* Noodle for tablet */}
                        <Noodle
                            className="relative pointer-events-none transform -rotate-[10deg] max-mymd:hidden xl:hidden bottom-[25rem] right-[170px]"
                            width="700px"
                            height="650px"
                        />
                        {/* Noodle for browser */}
                        <Noodle
                            className="relative pointer-events-none transform -rotate-[10deg] max-xl:hidden bottom-[47rem] right-[295px]"
                            width="900px"
                            height="880px"
                        />
                    </div>
                )}
            </div>
            <UpButton />
        </div>
    );
}

export default Footer;
