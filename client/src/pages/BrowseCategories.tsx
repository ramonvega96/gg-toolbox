import { useState } from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import BrowseCard from '../components/browse/BrowseCard';
import Accordion from '../components/Accordion';
import LocalIcon from '../components/localIcon/LocalIcon';
import { useIntl } from 'react-intl';
import categorylist from '../assets/json/browseCards.json';
import SearchBarContainer from '../components/searchbar/SearchBarContainer';
import {
    IconAttributes,
    IconContent,
} from '../components/localIcon/IconContent';

/**
 * This function creates the browse page. It contains the standard header, standard footer, search
 * component and a list of accordions containing browse cards.
 * The data used to create the browse cards and accordions is found in the categorylist JSON file.
 * @returns The browse page based on the categorylist JSON
 */
function BrowseCategories() {
    const messages = useIntl();
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    const browseList = Object.entries(categorylist).map(
        ([key, category], index) => {
            const icon = IconContent.find(
                (icon: IconAttributes) => key === icon.key
            );
            if (!icon)
                return (
                    <div>
                        <h1>No categories</h1>
                    </div>
                );
            return (
                <div
                    className="pt-4 w-full"
                    key={`accordion-${index}`}
                >
                    <Accordion
                        title={
                            <div className="flex flex-row items-center">
                                <div>
                                    {LocalIcon({
                                        icon: icon.key,
                                        width: '5em',
                                        fill: 'blue',
                                    })}
                                </div>
                                <h2
                                    id={`category-accordion-${icon.key}`}
                                    className="font-omnes text-left sm:text-2xl text-xl font-extrabold pl-8 my-0"
                                >
                                    {category.title}
                                </h2>
                            </div>
                        }
                        content={
                            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 py-8 px-2">
                                {category.cards.map((browseCard, cardIndex) => (
                                    <BrowseCard
                                        key={`browsecard-${index}-${cardIndex}`}
                                        {...browseCard}
                                    />
                                ))}
                            </div>
                        }
                        index={index}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />
                </div>
            );
        }
    );
    return (
        <div>
            <Header toggleBanner={true} />
            <div className="flex bg-primaryBlue pb-12 pt-20 flex-col lg:flex-row">
                <div className="w-full text-left text-white flex flex-col max-mymd:px-12 mymd:px-20 xl:pl-36 xl:pr-0">
                    <h1 className="font-omnes pb-12 text-4xl text-white max-mdsm:text-2xl">
                        {messages.formatMessage({
                            id: 'BrowseCategoriesTitle',
                        })}
                    </h1>
                    <h5 className="w-full text-left md:text-2xl font-normal">
                        {messages.formatMessage({
                            id: 'BrowseCategoriesDescription',
                        })}
                    </h5>
                </div>
                <div className="justify-center w-full max-mymd:px-12 mymd:px-20 xl:px-36">
                    <SearchBarContainer
                        backgroundColor="primaryBlue"
                        width="w-full"
                    />
                </div>
            </div>
            <div className="justify-center items-center flex flex-col pt-8 pb-32 max-mymd:px-12 mymd:px-20 xl:px-36">
                {browseList}
            </div>
            <Footer pageAnalitycsId="browse-g&g-categories-page" />
        </div>
    );
}

export default BrowseCategories;
