import { SEARCH } from '../actions/search-actions';

const INIT_STATE = {
  tips: [],
}

const search = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        tips: action.find(state.words, action.playroad),
      };
    default:
      return state;
  }

};

export default search;
