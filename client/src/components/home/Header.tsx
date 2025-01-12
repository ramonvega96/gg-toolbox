import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import HeaderCategoryContainers from '../HeaderCategoryContainers';
import HeaderHamburger from '../HeaderHamburger';
interface HeaderInterface {
    toggleBanner: boolean;
}

/**
 * Nutbox header includes the tabs
 * @returns JSX element
 */
function Header(props: HeaderInterface) {
    const messages = useIntl();
    const navigate = useNavigate();
    const { toggleBanner } = props;
    return (
        <div className={'max-xl:sticky max-xl:top-0 w-full z-[40] bg-white'}>
            {toggleBanner && (
                <div
                    id="header-banner"
                    className="flex flex-row w-full bg-primaryBlueDark py-3 max-mymd:px-4 mymd:px-20 xl:px-36"
                >
                    <div
                        className="text-sm text-white text-center max-xl:w-full"
                        id="header-banner-text"
                    >
                        <p className="m-0">
                            {messages.formatMessage({
                                id: 'verifiedTextHeader',
                            })}
                        </p>
                    </div>
                    <div className="hidden xl:flex flex-row ml-auto gap-12 text-sm justify-center text-white bg-primaryBlueDark">
                        <button
                            id="help-button"
                            onClick={() => {
                                navigate('/help');
                            }}
                        >
                            {messages.formatMessage({ id: 'help' })}
                        </button>
                        <button
                            id="contact-button"
                            onClick={() => {
                                navigate('/contact-us');
                            }}
                        >
                            {messages.formatMessage({ id: 'contact' })}
                        </button>
                        <button
                            id="follow-us-button"
                            onClick={() => {
                                window.open(
                                    'https://linktr.ee/growandgotoolbox',
                                    '_blank'
                                );
                            }}
                        >
                            {messages.formatMessage({ id: 'followUs' })}
                        </button>
                    </div>
                </div>
            )}
            <HeaderHamburger />

            <div
                id="desktop-navBar"
                className="max-xl:hidden"
            >
                <HeaderCategoryContainers
                    colorbarSide="bottom"
                    isHamburger={false}
                />
            </div>
        </div>
    );
}

export default Header;
