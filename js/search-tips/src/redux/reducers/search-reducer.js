import { SEARCH } from '../constants';
import data from '../../data/words';

const initialState = {
  words: data,
  currentSearch: '',
};

const search = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH:
      return {
        ...state,
        currentSearch: payload.inputValue,
      };
    default:
      return state;
  }
};

export default search;
