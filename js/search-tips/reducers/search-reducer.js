import { findWords } from '../utils';

const search = (state = {}, action) => {
  switch (action.type) {
    case 'search':
      return {
        words: state.words,
        suggestions: findWords(state.words, action.payload) || [],
        value: action.payload
      };
    default:
      return state;
  }

};

export default search;
