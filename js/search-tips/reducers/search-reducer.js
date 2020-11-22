import {ActionType} from '../actions/search-actions';
import {extend} from '../utils';
import data from '../data/words';

let initialState = {
  words: data,
  searchString: ''
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_SEARCH_STRING:
      return extend(state, {searchString: action.payload});
    default:
      return state;
  }

};

export default search;