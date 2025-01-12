import { ReactComponent as Arrow } from '../../../assets/images/icons/svg/right_arrow_svgrepo_com.svg';
import { useIntl } from 'react-intl';

/**
 * This section renders the Feedback Survey button section
 * @returns a feeback survey button
 */
function FeedbackButton() {
    const messages = useIntl();

    return (
        <a
            href="/contact-us"
            className="no-underline text-inherit hover:text-inherit hover:no-underline"
            rel="noreferrer"
        >
            <button
                id="feedback-survey-button"
                className="flex items-center !leading-[1] justify-between gap-10 text-left py-4 pr-4 pl-8 max-w-[400px] mymd:w-[30vw] w-[70vw] transition ease-in-out delay-10 bg-secondaryGreen hover:bg-tertiaryGreen font-medium"
            >
                <span
                    id="feedback-button-label"
                    className="max-lg:text-base xl:text-xl !leading-1"
                >
                    {messages.formatMessage({
                        id: 'contactUs',
                    })}
                </span>
                <div className="ml-2 float-right">
                    <Arrow
                        fill="white"
                        width="2em"
                    />
                </div>
            </button>
        </a>
    );
}

export default FeedbackButton;
