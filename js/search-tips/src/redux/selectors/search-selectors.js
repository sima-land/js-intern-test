import { createSelector } from 'reselect';

import { highlight } from './utils';

export const wordsSelector = (state) => state.search.words;
export const currentSearchSelector = (state) =>
  state.search.currentSearch.toLowerCase();

export const searchTipsSelector = createSelector(
  wordsSelector,
  currentSearchSelector,
  (words, search) =>
    search &&
    words
      .filter((word) => word.toLowerCase().startsWith(search))
      .filter((_, idx) => idx < 5)
      .map((word) => highlight(word, search, (str) => `<b>${str}</b>`))
);

export const searchSelector = createSelector(searchTipsSelector, (tips) => ({
  entities: tips || [],
  isOpen: !!tips.length,
}));
