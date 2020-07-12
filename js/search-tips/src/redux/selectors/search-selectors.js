import { createSelector } from 'reselect';

export const wordsSelector = (state) => state.search.words;
export const currentSearchSelector = (state) => state.search.currentSearch;

export const searchTipsSelector = createSelector(
  wordsSelector,
  currentSearchSelector,
  (words, search) =>
    search &&
    words
      .filter((word) => word.toLowerCase().startsWith(search))
      .filter((_, idx) => idx < 5)
);

export const searchSelector = createSelector(searchTipsSelector, (tips) => ({
  entities: tips,
  isOpen: !!tips.length,
}));

// export const isOpenSelector = () => createSelector(searchTipsSelector, tips => tips.length !== 0 )
