import { useNavigate } from 'react-router-dom';
import { CategoryDropdownButtonInterface } from './HeaderCategoryContainers';

interface CategoryButtonInterface {
    title: string;
    icon: string;
    color: string;
    isHamburger?: boolean;
    dropdownHover?: boolean;
    setCategoryHover?: (value: boolean) => void;
    setDropdownContent?: (value: CategoryDropdownButtonInterface[]) => void;
    CategoryDropdownButtonInfo?: CategoryDropdownButtonInterface[];
    page?: string;
    colorbarSide?: 'top' | 'bottom';
    closeNavbar?: () => void;
    accordionOpen?: boolean;
    setAccordionOpen?: (value: boolean) => void;
}

/**
 * Renders a button with an icon and a title
 * @param title - the title of the button
 * @param icon - the icon of the button
 * @param color - the color of the border
 * @param page - the landing page to navigate to
 * @param colorbarSide - the side of the button that will have a colored border
 * @returns the button component
 */
function CategoryButton(props: CategoryButtonInterface) {
    const {
        title,
        icon,
        color,
        CategoryDropdownButtonInfo,
        dropdownHover,
        isHamburger,
        setCategoryHover,
        setDropdownContent,
        page,
        colorbarSide,
        closeNavbar,
        accordionOpen,
        setAccordionOpen,
    } = props;
    const navigate = useNavigate();

    return (
        <>
            <div
                className={`flex max-lg:flex-row flex-col justify-center mt-0 relative ${
                    colorbarSide === 'top' && `border-t-4 border-${color}`
                } ${
                    colorbarSide === 'bottom' && `border-b-8 border-${color}`
                } ${icon === '' && isHamburger && 'hidden'} ${
                    icon === '' && 'max-mymd:pr-16 mymd:pr-20 xl:pr-36 w-auto'
                } ${icon !== '' && 'w-full'}`}
                onMouseEnter={() => {
                    if (
                        setCategoryHover &&
                        setDropdownContent &&
                        CategoryDropdownButtonInfo
                    ) {
                        setCategoryHover(true);
                        setDropdownContent(CategoryDropdownButtonInfo);
                    }
                }}
                onMouseLeave={() => {
                    if (setCategoryHover && !dropdownHover) {
                        setCategoryHover(false);
                    }
                }}
            >
                {icon && (
                    <div
                        id={
                            colorbarSide === 'bottom'
                                ? `desktop-${page}`
                                : `mobile-${page}`
                        }
                        className={`flex w-full h-full
                            ${
                                colorbarSide === 'bottom'
                                    ? 'flex-col'
                                    : 'flex-row pr-4 cursor-pointer'
                            }
                            ${
                                icon === 'translate' || icon === 'indigenous'
                                    ? 'cursor-pointer'
                                    : 'cursor-default'
                            }                        
                            ${
                                icon === 'goGrowLogo'
                                    ? 'justify-center max-mymd:ml-[3.5rem] mymd:ml-[4.5rem] xl:ml-[8.5rem]'
                                    : `justify-start hover:bg-lightGrey items-center`
                            }
                        `}
                        onClick={() => {
                            if (
                                page &&
                                !dropdownHover &&
                                (icon === 'translate' || icon === 'indigenous')
                            ) {
                                navigate(
                                    icon === 'translate'
                                        ? '/?pathway=multicultural-resources'
                                        : '/?pathway=aboriginal-and-torres-strait'
                                );
                                if (closeNavbar) {
                                    closeNavbar();
                                }
                            } else if (
                                accordionOpen !== undefined &&
                                setAccordionOpen
                            ) {
                                setAccordionOpen(!accordionOpen);
                            }
                        }}
                    >
                        {icon !== 'goGrowLogo' && icon !== 'indigenous' && (
                            <i
                                className={`header-icon-${icon} text-${color} m-3 text-[3.5em]`}
                            />
                        )}
                        {icon === 'goGrowLogo' && (
                            <img
                                id="grow-and-go-logo"
                                alt="grow and go logo"
                                src={require('../assets/images/nutbox/logo.png')}
                                className="max-w-[15em] m-3 xs:w-[50vw] cursor-pointer"
                                onClick={() => {
                                    navigate('/?pathway=grow-and-go');
                                }}
                            />
                        )}
                        {icon === 'indigenous' && (
                            <img
                                id="atsi-icon"
                                alt="aboriginal and torres strait icon"
                                src={require('../assets/images/icons/header_svgs/ATSI.png')}
                                className="max-w-[3.5em] m-3 xs:w-[50vw] cursor-pointer"
                                onClick={() => {
                                    navigate(
                                        '/?pathway=aboriginal-and-torres-strait'
                                    );
                                }}
                            />
                        )}
                        {title && (
                            <h6
                                className="w-[120px] font-omnes m-3 
                            text-base font-semibold leading-4 max-xl:text-left xl:text-center text-primaryBlueDark"
                            >
                                {title}
                            </h6>
                        )}
                    </div>
                )}
            </div>
            {isHamburger && accordionOpen && (
                <div>
                    {CategoryDropdownButtonInfo?.map(
                        (CategoryDropdownButtonInfo) => (
                            <div
                                key={CategoryDropdownButtonInfo.title}
                                id={CategoryDropdownButtonInfo.title
                                    .replaceAll(' ', '-')
                                    .replaceAll('&', 'and')
                                    .toLowerCase()}
                                className="cursor-pointer p-2 border border-formBorderGrey hover:bg-lightGrey"
                                onClick={() => {
                                    if (
                                        accordionOpen !== undefined &&
                                        setAccordionOpen
                                    ) {
                                        setAccordionOpen(!accordionOpen);
                                    }
                                    if (closeNavbar) {
                                        closeNavbar();
                                    }
                                    CategoryDropdownButtonInfo.navigationFunction();
                                }}
                            >
                                <h4
                                    className={`text-base font-normal text-black m-0`}
                                >
                                    {CategoryDropdownButtonInfo.title}
                                </h4>
                            </div>
                        )
                    )}
                </div>
            )}
        </>
    );
}

export default CategoryButton;
