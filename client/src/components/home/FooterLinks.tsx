import { useIntl } from 'react-intl';
/**
 * Renders the footer links
 */

interface ConnectLink {
    linkTitle: string;
    iconCSSId: string;
    link: string;
}
function FooterLinks() {
    const messages = useIntl();
    const connectLinksFirstCol: ConnectLink[] = [
        {
            linkTitle: 'Contact',
            iconCSSId: 'email',
            link: '/contact-us',
        },
        {
            linkTitle: 'Instagram',
            iconCSSId: 'instagram',
            link: 'https://www.instagram.com/grow_and_go_toolbox/?hl=en',
        },
        {
            linkTitle: 'Youtube',
            iconCSSId: 'youtube',
            link: 'https://www.youtube.com/channel/UCiKR69zlIaexFY_lMAv1N6w',
        },
    ];
    const connectLinksSecondCol: ConnectLink[] = [
        {
            linkTitle: 'Facebook',
            iconCSSId: 'facebook',
            link: 'https://www.facebook.com/people/Grow-and-Go-Toolbox/100086539915630/',
        },
        {
            linkTitle: 'Linkedin',
            iconCSSId: 'linkedin',
            link: 'https://www.linkedin.com/company/grow-and-go-toolbox/',
        },
    ];

    return (
        <div
            id="footer-links-container"
            className="bg-lightGrey flex flex-col lg:flex-row py-10 max-sm:block 
                max-mymd:px-16 mymd:px-20 xl:px-36 
                gap-4"
        >
            <div className="flex flex-col gap-4 md:flex-row w-full lg:w-2/3">
                <div
                    id="quick-links-container"
                    className="flex flex-col w-full lg:w-1/2 justify-center items-center justify-between text-left"
                >
                    <h4 className="mb-3 w-full text-primaryBlueDark text-2xl font-omnes">
                        {messages.formatMessage({ id: 'quickLinks' })}
                    </h4>
                    <div className="flex flex-row gap-8 w-full justify-between">
                        <div className="flex flex-col gap-2 w-1/2">
                            <a
                                id="find-a-hp-quick-link"
                                href="/find-a-health-professional"
                                className="no-underline text-black text-md font-light"
                            >
                                {messages.formatMessage({
                                    id: 'FHP',
                                })}
                            </a>
                            <a
                                href="/help"
                                id="help-quick-link"
                                className="no-underline text-black text-md font-light"
                            >
                                {messages.formatMessage({ id: 'help' })}
                            </a>
                            <a
                                href="/about-us"
                                id="about-quick-link"
                                className="no-underline text-black text-md font-light"
                            >
                                {messages.formatMessage({ id: 'aboutUs' })}
                            </a>
                            <a
                                href="/login"
                                id="login-quick-link"
                                className="no-underline text-black text-md font-light"
                            >
                                {messages.formatMessage({ id: 'login' })}
                            </a>
                        </div>
                        <div className="flex flex-col gap-2 w-1/2">
                            {' '}
                            <a
                                href="/upload-a-resource"
                                id="upload-resource-quick-link"
                                className="no-underline text-black text-md font-light"
                            >
                                {messages.formatMessage({
                                    id: 'uploadResource',
                                })}
                            </a>
                            <a
                                href="/terms-of-use"
                                id="terms-of-use-quick-link"
                                className="no-underline text-black text-md font-light"
                            >
                                {messages.formatMessage({ id: 'termsOfUse' })}
                            </a>
                            <a
                                href="/accessibility"
                                id="accessibility-quick-link"
                                className="no-underline text-black text-md font-light"
                            >
                                {messages.formatMessage({
                                    id: 'accessibility',
                                })}
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    id="connect-container"
                    className="flex flex-col w-full lg:w-1/2 justify-center items-center justify-between"
                >
                    <h4 className="mb-3 w-full text-primaryBlueDark text-2xl font-omnes">
                        {messages.formatMessage({ id: 'connect' })}
                    </h4>
                    <div className="flex flex-row gap-8 w-full justify-between">
                        <div
                            id="connect-links-first-three"
                            className="flex flex-col gap-2 w-1/2 justify-between"
                        >
                            {connectLinksFirstCol.map((link) => {
                                return (
                                    <div
                                        className="flex flex-row pb-2"
                                        key={link.linkTitle}
                                        id={link.linkTitle + '-icon-container'}
                                    >
                                        <a
                                            href={link.link}
                                            className="flex justify-center no-underline
                                            text-black text-md font-light"
                                            target={`${
                                                link.linkTitle === 'Contact'
                                                    ? ''
                                                    : '_blank'
                                            }`}
                                        >
                                            <i
                                                className={`contact-icon-${link.iconCSSId} text-[1.5em] 
                                            text-primaryBlueDark mr-5`}
                                            />
                                            {link.linkTitle}
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            id="connect-links-last-three"
                            className="flex flex-col gap-2 w-1/2"
                        >
                            {connectLinksSecondCol.map((link) => {
                                return (
                                    <div
                                        className="flex flex-row max-lg:pr-10 max-sm:pr-12 
                                        md:pr-4 sm:pr-2 pb-2 max-[520px]:pr-4"
                                        key={link.linkTitle}
                                    >
                                        <a
                                            href={link.link}
                                            className="flex justify-center no-underline
                                            text-black text-md font-light"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <i
                                                className={`contact-icon-${link.iconCSSId} text-[1.5em] 
                                            text-primaryBlueDark mr-5`}
                                            />
                                            {link.linkTitle}
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div
                id="logo-container"
                className="flex flex-col w-full lg:w-1/3 max-md:mt-8 justify-center items-center"
            >
                <img
                    className="w-full max-w-[400px] h-auto mt-auto"
                    src={require('../../assets/images/nutbox/logo.png')}
                    alt="grow and go logo logo"
                />
            </div>
        </div>
    );
}
export default FooterLinks;
