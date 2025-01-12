import { useState } from 'react';
import BannerColoredBorder from './BannerColoredBorder';
import CategoryButton from './CategoryButton';
import HeaderCategoryContainers from './HeaderCategoryContainers';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

/**
 * Renders the hamburger menu for small - medium screens which displays the header categories when opened
 * and is hidden when on larger screens
 * @returns the hamburger menu
 */

function HeaderHamburger() {
    const messages = useIntl();
    const navigate = useNavigate();
    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <>
            {/* The following contains the hamburger menu*/}
            <div className="flex justify-between xl:hidden">
                <div className="flex py-2">
                    <CategoryButton
                        title={''}
                        icon="goGrowLogo"
                        color={''}
                        page="growAndGo"
                    />
                </div>
                <button
                    id="hamburger-button"
                    className="outline-none mobile-menu-button pr-8"
                    onClick={() => setNavbarOpen(!navbarOpen)}
                >
                    <i className="fa-solid fa-bars fa-3x text-primaryBlueDark"></i>
                </button>
            </div>
            <div className="xl:hidden">
                <BannerColoredBorder />
            </div>

            {/* The following contains the hamburger content*/}
            <div
                id="modal-background"
                className={`xl:hidden bg-[#0000006E] bg-opacity-75 overflow-auto
                transition-opacity top-0 w-full z-50 fixed h-full grid ${
                    navbarOpen ? '' : 'hidden'
                }`}
                onClick={() => setNavbarOpen(!navbarOpen)}
            >
                <div
                    className={`xl:hidden max-w-[400px] w-[70%] absolute top-0 right-0 z-[50] h-screen 
                    bg-white`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-column justify-center bg-white">
                        {/* div to close the hamburger menu */}
                        <div className="flex justify-end bg-white">
                            <button
                                className="outline-none mobile-menu-button mr-6 mt-6"
                                onClick={() => setNavbarOpen(!navbarOpen)}
                            >
                                <i className="fa-solid fa-x text-primaryBlueDark w-4 h-4"></i>
                            </button>
                        </div>
                        <div
                            className="pb-2"
                            id="burguer-options"
                        >
                            <div
                                className="py-2 px-4 cursor-pointer hover:bg-lightGrey text-primaryBlueDark"
                                id="burguer-help"
                                onClick={() => {
                                    navigate('/help');
                                    setNavbarOpen(!navbarOpen);
                                }}
                            >
                                {messages.formatMessage({ id: 'help' })}
                            </div>
                            <div
                                className="py-2 px-4 cursor-pointer hover:bg-lightGrey text-primaryBlueDark"
                                id="burguer-contact"
                                onClick={() => {
                                    navigate('/contact-us');
                                    setNavbarOpen(!navbarOpen);
                                }}
                            >
                                {messages.formatMessage({ id: 'contact' })}
                            </div>
                            <div
                                className="py-2 px-4 cursor-pointer hover:bg-lightGrey text-primaryBlueDark"
                                id="burguer-follow-us"
                                onClick={() => {
                                    window.open(
                                        'https://linktr.ee/growandgotoolbox',
                                        '_blank'
                                    );
                                    setNavbarOpen(!navbarOpen);
                                }}
                            >
                                {messages.formatMessage({ id: 'followUs' })}
                            </div>
                        </div>
                        <HeaderCategoryContainers
                            colorbarSide="top"
                            isHamburger={true}
                            closeNavbar={() => setNavbarOpen(!navbarOpen)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderHamburger;
