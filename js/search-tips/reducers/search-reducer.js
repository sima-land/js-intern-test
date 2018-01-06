import * as types from "../actions/types";
export const search = (state = "", action) => {
  switch (action.type) {
    case types.SEARCH_GOODS:
      return action.payload;
    default:
      return state;
  }
};
export const words = (state = {}) => {
  return state;
};

export const filteredGoods = state => {
  let filteredWords = [];
  let words = state.words;
  let query = state.search;
  words.forEach(function(word) {
    if (query != "" && word.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
      filteredWords.push(word);
    }
  });
  return filteredWords.slice(0, 5);
};
