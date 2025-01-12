/**
 * Search bar component is the search bar itself with the search icon and the autosuggester
 */
import { BaseSyntheticEvent, useEffect, useState, useContext } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { getResourcesTags } from '../../utils/NetworkCalls';
import AutoComplete from './AutoComplete';
import { HomePathwayContext } from '../../utils/HomeContext';
import { useSearchParams } from 'react-router-dom';

interface SearchBarComponentInterface {
    withBorder: boolean;
}

const SearchBarComponent = ({ withBorder }: SearchBarComponentInterface) => {
    const messages = useIntl();
    const navigate = useNavigate();
    const { path } = useContext(HomePathwayContext);
    const [allTags, setAllTags] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [searchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState<string>(
        searchParams.get('tagname') || ''
    );

    /**
     * This handles the change in input from the search bar
     * It also handles the dynamic handelling of the autosuggester
     * @param event the users search query
     */
    const handleSearchChange = (event: BaseSyntheticEvent) => {
        const input = event.target.value;
        setInputValue(input);

        if (input) {
            searchParams.set('tagname', input);
            setSuggestions(
                allTags.filter((tag) =>
                    tag.toLowerCase().includes(input.toLowerCase())
                )
            );
        } else {
            searchParams.delete('tagname');
            setSuggestions([]);
        }
    };

    const fetchTags = async () => {
        const res = await getResourcesTags();
        setAllTags(res.payload);
    };

    const cleanSearchParams = () => {
        searchParams.delete('modalDisplay');
        searchParams.delete('pathway');
        searchParams.delete('scrollTo');
    };

    const audienceMappings: Record<string, string> = {
        aboriginalAndTorresStrait:
            'Aboriginal And Torres Strait Islander Peoples',
        healthProfessionals: 'Health Professionals',
        parentsAndFamilies: 'Parents And Families',
        earlyChildhoodEducation: 'Education Professionals',
    };

    const buildUrl = (tagName?: string) => {
        if (tagName) {
            searchParams.set('tagname', tagName);
            setInputValue(tagName);
        }

        if (path === 'aboriginalAndTorresStrait') {
            searchParams.set('cultures', audienceMappings[path]);
        } else {
            const audience = audienceMappings[path] || '';
            if (audience) searchParams.set('audiences', audience);
        }

        cleanSearchParams();
        return `/search?${searchParams.toString()}`;
    };

    useEffect(() => {
        setInputValue(searchParams.get('tagname') || '');
        fetchTags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setInputValue(searchParams.get('tagname') || '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        <div
            className={`w-full ${withBorder ? 'border border-black' : ''}`}
            id="search-bar"
        >
            <div className="flex flex-col align-center h-12">
                <div className="flex flex-row">
                    <div className="w-full h-12 bg-white flex flex-row items-center">
                        <input
                            id="search-bar-input"
                            type="text"
                            className="border-none shadow-none h-12 w-full bg-white pl-4"
                            placeholder={messages.formatMessage({
                                id: 'searchTheSite',
                            })}
                            onChange={(e) => handleSearchChange(e)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    navigate(buildUrl());
                                    setSuggestions([]);
                                }
                            }}
                            onClick={(e) => handleSearchChange(e)}
                            onBlur={() => {
                                setTimeout(() => {
                                    setSuggestions([]);
                                }, 200);
                            }}
                            value={searchParams.get('tagname') || inputValue}
                        />
                        {searchParams.get('tagname') && (
                            <div
                                id="search-bar-clear"
                                className="px-3 cursor-pointer"
                                onClick={() => {
                                    searchParams.delete('tagname');
                                    setInputValue('');
                                }}
                            >
                                <i className="fa-solid fa-times text-2xl text-gray-400 hover:text-black"></i>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-success w-12 border-none"
                        onClick={() => {
                            navigate(buildUrl());
                            setSuggestions([]);
                        }}
                        id="search-icon-button"
                    >
                        <i
                            className="fa-solid fa-magnifying-glass"
                            style={{ color: 'white' }}
                        ></i>
                    </button>
                </div>
                <div
                    className={`${
                        suggestions.length > 0 ? '' : 'hidden'
                    } relative`}
                >
                    <div className="absolute z-10 rounded-md bg-white pt-1 pb-1 shadow-md mt-1 w-full">
                        {suggestions
                            .slice(0, 20)
                            .map((singleSuggestion, index) => {
                                return (
                                    <div key={singleSuggestion}>
                                        <AutoComplete
                                            suggestion={singleSuggestion}
                                            suggestionIndex={index}
                                            getUserSelection={(suggestion) => {
                                                navigate(buildUrl(suggestion));
                                                setSuggestions([]);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBarComponent;
