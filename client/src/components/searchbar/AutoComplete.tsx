/**
 * Interface for props being passed into the AutoComplete component
 */
interface AutoCompleteInterface {
    suggestion: string;
    suggestionIndex: number;
    getUserSelection: (input: string) => void;
}

/**
 * This is a child component to SearchBar. It handles rendering the pop down
 * suggestions on the search bar when a user is typing. It also handles the
 * onCLick event for when users click on an autosuggestion field. The props are then passed
 * back to the parent component (SearchBar) to then render the resources related to the users input.
 * @param suggestion: possible strings related to the users input
 * the user selects from the autosuggestion
 * @returns JSX element
 */
function AutoComplete({
    suggestion,
    suggestionIndex,
    getUserSelection,
}: AutoCompleteInterface) {
    return (
        <div
            className="p-2 hover:bg-zinc-300 cursor-pointer"
            id={`searchbar-dropdown-suggestion-${suggestionIndex}`}
            onClick={() => {
                getUserSelection(suggestion);
            }}
        >
            {suggestion}
        </div>
    );
}

export default AutoComplete;
