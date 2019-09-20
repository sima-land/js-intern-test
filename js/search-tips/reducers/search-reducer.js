import * as actions from '../actions/search-actions';

const search = (state = [], action) => {

  switch (action.type) {

    case actions.SEARCH:
      return [
        ...action.searchWd
      ];
      
    default:
      return state;
  }
};

export default search;