import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { HeaderDropdownContent } from '../utils/HeaderDropdownContent';
import CategoryButton from './CategoryButton';

interface HeaderCategoryContainersInterface {
    colorbarSide: 'top' | 'bottom';
    isHamburger: boolean;
    closeNavbar?: () => void;
}

export interface CategoryDropdownButtonInterface {
    title: string;
    navigationFunction: () => void;
}

/**
 * This interface is used to define the dropdown button for each category
 * @param title the title of the button
 * @param navigationFunction the function that is called when the button is clicked
 */
export interface CategoryDropdownButtonInterface {
    title: string;
    navigationFunction: () => void;
}

/**
 * This function returns the category button for each category for web and mobile view (with hamburger)
 * @returns category buttons
 * @param colorbarSide the side on which the color bar is displayed
 * @param isHamburger whether the hamburger menu is displayed
 */
function HeaderCategoryContainers(props: HeaderCategoryContainersInterface) {
    const { colorbarSide, isHamburger, closeNavbar } = props;
    const messages = useIntl();

    const [categoryHover, setCategoryHover] = useState(false);
    const [dropdownHover, setDropdownHover] = useState(false);
    const [dropdownContent, setDropdownContent] = useState<
        CategoryDropdownButtonInterface[]
    >([]);

    const [healthProfessionalsAccordion, setHealthProfessionalsAccordion] =
        useState(false);
    const [parentsAndFamiliesAccordion, setParentsAndFamiliesAccordion] =
        useState(false);
    const [
        earlyChildhoodEducatorsAccordion,
        setEarlyChildhoodEducatorsAccordion,
    ] = useState(false);
    const [growGoToolboxAccordion, setGrowGoToolboxAccordion] = useState(false);

    useEffect(() => {
        if (healthProfessionalsAccordion) {
            setParentsAndFamiliesAccordion(false);
            setEarlyChildhoodEducatorsAccordion(false);
            setGrowGoToolboxAccordion(false);
        }
    }, [healthProfessionalsAccordion]);

    useEffect(() => {
        if (parentsAndFamiliesAccordion) {
            setHealthProfessionalsAccordion(false);
            setEarlyChildhoodEducatorsAccordion(false);
            setGrowGoToolboxAccordion(false);
        }
    }, [parentsAndFamiliesAccordion]);

    useEffect(() => {
        if (earlyChildhoodEducatorsAccordion) {
            setHealthProfessionalsAccordion(false);
            setParentsAndFamiliesAccordion(false);
            setGrowGoToolboxAccordion(false);
        }
    }, [earlyChildhoodEducatorsAccordion]);

    useEffect(() => {
        if (growGoToolboxAccordion) {
            setHealthProfessionalsAccordion(false);
            setParentsAndFamiliesAccordion(false);
            setEarlyChildhoodEducatorsAccordion(false);
        }
    }, [growGoToolboxAccordion]);

    return (
        <div className="flex justify-center">
            {!isHamburger && (
                <div className="w-2/5 flex">
                    <CategoryButton
                        title={''}
                        icon="goGrowLogo"
                        color="primaryBlueDark"
                        colorbarSide={colorbarSide}
                        page="growAndGo"
                        closeNavbar={closeNavbar}
                    />
                </div>
            )}
            <div className={`flex ${isHamburger ? 'w-full' : 'w-3/5'}`}>
                <div className="flex max-xl:flex-col xl:flex-row w-full relative">
                    <CategoryButton
                        key="healthProfessionals-header"
                        title={messages.formatMessage({
                            id: 'healthProfessionals',
                        })}
                        icon="health-professional"
                        color="secondaryYellow"
                        colorbarSide={colorbarSide}
                        CategoryDropdownButtonInfo={HeaderDropdownContent(
                            'healthProfessionals'
                        )}
                        setCategoryHover={setCategoryHover}
                        dropdownHover={dropdownHover}
                        setDropdownContent={setDropdownContent}
                        page="healthProfessionals"
                        closeNavbar={closeNavbar}
                        isHamburger={isHamburger}
                        accordionOpen={healthProfessionalsAccordion}
                        setAccordionOpen={setHealthProfessionalsAccordion}
                    />
                    <CategoryButton
                        key="parentsAndFamilies-header"
                        title={messages.formatMessage({
                            id: 'parentsAndFamilies',
                        })}
                        icon="parents"
                        color="secondaryRed"
                        colorbarSide={colorbarSide}
                        CategoryDropdownButtonInfo={HeaderDropdownContent(
                            'parentsAndFamilies'
                        )}
                        setCategoryHover={setCategoryHover}
                        dropdownHover={dropdownHover}
                        setDropdownContent={setDropdownContent}
                        page="parentsAndFamilies"
                        closeNavbar={closeNavbar}
                        isHamburger={isHamburger}
                        accordionOpen={parentsAndFamiliesAccordion}
                        setAccordionOpen={setParentsAndFamiliesAccordion}
                    />
                    <CategoryButton
                        key="earlyChildhoodEducators-header"
                        title={messages.formatMessage({
                            id: 'earlyChildhoodEducators',
                        })}
                        icon="ecec"
                        color="secondaryGreen"
                        colorbarSide={colorbarSide}
                        CategoryDropdownButtonInfo={HeaderDropdownContent(
                            'earlyChildhoodEducation'
                        )}
                        setCategoryHover={setCategoryHover}
                        dropdownHover={dropdownHover}
                        setDropdownContent={setDropdownContent}
                        page="earlyChildhoodEducation"
                        closeNavbar={closeNavbar}
                        isHamburger={isHamburger}
                        accordionOpen={earlyChildhoodEducatorsAccordion}
                        setAccordionOpen={setEarlyChildhoodEducatorsAccordion}
                    />
                    <CategoryButton
                        key="aboriginalAndTorresStraitIslander-header"
                        title={messages.formatMessage({
                            id: 'aboriginalAndTorresStraitIslander',
                        })}
                        icon="indigenous"
                        color="secondaryOrange"
                        colorbarSide={colorbarSide}
                        page="aboriginalAndTorresStraitIslander"
                        closeNavbar={closeNavbar}
                        isHamburger={isHamburger}
                    />
                    <CategoryButton
                        key="multiculturalResources-header"
                        title={messages.formatMessage({
                            id: 'multiculturalResources',
                        })}
                        icon="translate"
                        color="secondaryPink"
                        colorbarSide={colorbarSide}
                        page="multiculturalResources"
                        closeNavbar={closeNavbar}
                        isHamburger={isHamburger}
                    />
                    <CategoryButton
                        key="growGoToolbox-header"
                        title={messages.formatMessage({
                            id: 'growGoToolbox',
                        })}
                        icon="toolbox"
                        color="primaryBlue"
                        colorbarSide={colorbarSide}
                        setCategoryHover={setCategoryHover}
                        dropdownHover={dropdownHover}
                        setDropdownContent={setDropdownContent}
                        CategoryDropdownButtonInfo={HeaderDropdownContent(
                            'growGoToolbox'
                        )}
                        page="growGoToolbox"
                        closeNavbar={closeNavbar}
                        isHamburger={isHamburger}
                        accordionOpen={growGoToolboxAccordion}
                        setAccordionOpen={setGrowGoToolboxAccordion}
                    />
                    {(categoryHover || dropdownHover) && !isHamburger && (
                        <div
                            id="categoryDropdown"
                            className={`flex flex-col bg-white z-[100] w-full absolute top-full
                        max-mymd:mr-16 mymd:mr-20 xl:mr-36 shadow-[4px_6px_6px_#00000054]`}
                            onMouseEnter={() => setDropdownHover(true)}
                            onMouseLeave={() => setDropdownHover(false)}
                        >
                            {dropdownContent?.map(
                                (CategoryDropdownButtonInfo) => (
                                    <div
                                        key={CategoryDropdownButtonInfo.title}
                                        id={CategoryDropdownButtonInfo.title
                                            .replaceAll(' ', '-')
                                            .replaceAll('&', 'and')
                                            .replaceAll(':', '')
                                            .toLowerCase()}
                                        className="cursor-pointer pl-4 pt-3 pb-2 border border-formBorderGrey hover:bg-lightGrey"
                                        onClick={() => {
                                            setDropdownHover(false);
                                            setCategoryHover(false);
                                            CategoryDropdownButtonInfo.navigationFunction();
                                        }}
                                    >
                                        <h4
                                            className={`text-base font-normal text-black`}
                                        >
                                            {CategoryDropdownButtonInfo.title}
                                        </h4>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
                {!isHamburger && (
                    <CategoryButton
                        title={''}
                        icon={''}
                        color="primaryBlueDark"
                        colorbarSide={colorbarSide}
                        closeNavbar={closeNavbar}
                    />
                )}
            </div>
        </div>
    );
}

export default HeaderCategoryContainers;
