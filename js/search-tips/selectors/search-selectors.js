import {createSelector} from 'reselect';

const MAX_TIPS_COUNT = 5;

export const getSearchString = (state) => {
    return state.search.searchString;
};

export const getWords = (state) => {
    return state.search.words;
};

export const getSearchTips = createSelector([getWords, getSearchString], (words, searchString) => {
    if (searchString === '') {
        return [];
    }

    const regExp = new RegExp(`${searchString}`,'gi');

    return (words.filter((word) => regExp.test(word))).slice(0, MAX_TIPS_COUNT);
});