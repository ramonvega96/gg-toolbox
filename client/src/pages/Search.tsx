import Footer from '../components/home/Footer';
import Header from '../components/home/Header';
import CantFindSection from '../components/searchbar/CantFindSection';
import SearchBar from '../components/searchbar/SearchBar';

function Search() {
    return (
        <div>
            <Header toggleBanner={true} />
            <div className="min-h-fit">
                <div className="flex justify-center pt-10">
                    <div
                        id="search-results-container"
                        className="w-full mb-24 xl:px-36 md:px-20 xs:px-8"
                    >
                        <SearchBar />
                        <CantFindSection />
                    </div>
                </div>
            </div>
            <Footer pageAnalitycsId="searchbar-page" />
        </div>
    );
}

export default Search;
