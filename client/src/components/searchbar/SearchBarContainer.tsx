/**
 * Search bar container component consists of the searchbar within a container with a specified background colour
 * and routes to the search page when the user enters an input.
 *
 * This is used on non search page pages such as the home page.
 */
import SearchBarComponent from './SearchBarComponent';
interface SearchBarContainerInterface {
    backgroundColor: string;
    width?: string;
}

const SearchBarContainer = ({
    backgroundColor,
    width,
}: SearchBarContainerInterface) => {
    return (
        <div
            className={`bg-${backgroundColor} flex justify-center py-12 h-full ${
                width ? width : ''
            }`}
        >
            <SearchBarComponent withBorder={false} />
        </div>
    );
};

export default SearchBarContainer;
