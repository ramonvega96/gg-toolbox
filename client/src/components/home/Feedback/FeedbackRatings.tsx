/* eslint-disable max-len */
import { ReactComponent as ThumbsUp } from '../../../assets/images/icons/Thumbs-up.svg';
import { ReactComponent as ThumbsDown } from '../../../assets/images/icons/Thumbs-down.svg';
import { useState } from 'react';

const updateLocalStorage = (
    add: boolean,
    itemId: number | string,
    listName: string
) => {
    const storedValue = localStorage.getItem(listName);

    const storedArray = storedValue ? JSON.parse(storedValue) : [];

    let updatedArray;

    if (add) {
        if (!storedArray.includes(itemId)) {
            updatedArray = [...storedArray, itemId];
        } else {
            return;
        }
    } else {
        updatedArray = storedArray.filter(
            (item: number | string) => item !== itemId
        );
    }

    localStorage.setItem(listName, JSON.stringify(updatedArray));
};

const itemInLocalStorage = (itemId: number | string, listName: string) => {
    const storedValue = localStorage.getItem(listName);
    if (storedValue) {
        let parsedValue;
        try {
            parsedValue = JSON.parse(storedValue);
        } catch (error) {
            return false;
        }
        if (Array.isArray(parsedValue)) {
            if (parsedValue.includes(itemId)) {
                return true;
            }
        }
    }
    return false;
};

export const handleFeedbackChange = async (
    newFeedback: boolean | null,
    itemId: number | string,
    likedItemsList: string,
    dislikedItemsList: string,
    asyncFunc: (item: string | number, caseNum: number) => Promise<void>
) => {
    const updateFeedback = async (
        listToUpdate: string,
        listToRemove: string
    ) => {
        if (itemInLocalStorage(itemId, listToRemove)) {
            updateLocalStorage(false, itemId, listToRemove);
            await asyncFunc(itemId, newFeedback ? 5 : 3);
        } else if (!itemInLocalStorage(itemId, listToUpdate)) {
            await asyncFunc(itemId, newFeedback ? 0 : 1);
        }
        if (newFeedback !== null) {
            updateLocalStorage(true, itemId, listToUpdate);
        }
    };

    switch (newFeedback) {
        case true:
            await updateFeedback(likedItemsList, dislikedItemsList);
            break;
        case false:
            await updateFeedback(dislikedItemsList, likedItemsList);
            break;
        case null:
            if (itemInLocalStorage(itemId, likedItemsList)) {
                updateLocalStorage(false, itemId, likedItemsList);
                await asyncFunc(itemId, 2);
            } else if (itemInLocalStorage(itemId, dislikedItemsList)) {
                updateLocalStorage(false, itemId, dislikedItemsList);
                await asyncFunc(itemId, 4);
            }
            break;
        default:
            break;
    }
};

export const getItemFeedback = (
    itemId: number | string,
    likedItemsList: string,
    dislikedItemsList: string
) => {
    if (itemInLocalStorage(itemId, likedItemsList)) {
        return true;
    } else if (itemInLocalStorage(itemId, dislikedItemsList)) {
        return false;
    } else return null;
};

/**
 * Props for FeedbackButtonInterface
 */
interface FeedbackRatingsInterface {
    mode: string;
    feedback: boolean | null;
    setFeedback: (feedbackVal: boolean | null) => void;
}

/**
 * This section renders the Feedback ratings (thumbs up and down)
 * @param mode: either display in footer or resource card mode
 * @param feedback the current selected response from the user
 * @param setFeedback useState function for setting the users input
 * @returns
 */
function FeedbackRatings(props: FeedbackRatingsInterface) {
    const { feedback, setFeedback, mode } = props;
    const [likeHover, setLikeHover] = useState<boolean>(false);
    const [dislikeHover, setDislikeHover] = useState<boolean>(false);
    return (
        <div
            id="feedback-buttons"
            className={`flex ${
                mode === 'footer' ? 'gap-4 -mt-4 mymd:mt-0' : 'gap-2 '
            }`}
        >
            <button
                data-cy={`feedback-${mode}-like`}
                onClick={() => {
                    setFeedback(feedback ? null : true);
                }}
            >
                <ThumbsUp
                    fill={
                        feedback
                            ? '#1E9B50'
                            : `${
                                  mode === 'footer'
                                      ? 'white'
                                      : likeHover
                                      ? 'primaryBlue'
                                      : 'lightGrey'
                              }`
                    }
                    width={mode === 'footer' ? '3em' : '2em'}
                    height={mode === 'footer' ? '3em' : '2em'}
                    onMouseEnter={() => {
                        setLikeHover(true);
                    }}
                    onMouseLeave={() => {
                        setLikeHover(false);
                    }}
                />
            </button>
            <button
                data-cy={`feedback-${mode}-dislike`}
                onClick={() => {
                    setFeedback(
                        feedback ? false : feedback === null ? false : null
                    );
                }}
            >
                <ThumbsDown
                    fill={
                        feedback === false
                            ? '#DE4B36'
                            : `${
                                  mode === 'footer'
                                      ? 'white'
                                      : dislikeHover
                                      ? 'primaryBlue'
                                      : 'lightGrey'
                              }`
                    }
                    width={mode === 'footer' ? '3em' : '2em'}
                    height={mode === 'footer' ? '3em' : '2em'}
                    onMouseEnter={() => {
                        setDislikeHover(true);
                    }}
                    onMouseLeave={() => {
                        setDislikeHover(false);
                    }}
                />
            </button>
        </div>
    );
}

export default FeedbackRatings;
