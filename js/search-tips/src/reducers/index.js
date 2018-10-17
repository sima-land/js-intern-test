import { combineReducers } from 'redux';

import search from './search-reducer';
import data from './data-reducer';
//import searchAction from './search-actions'

const reducer = combineReducers({
  searchReducer:search,
    dataReducer: data
});

export default reducer;
