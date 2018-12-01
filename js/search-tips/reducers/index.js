import { combineReducers } from 'redux';

import search from './search-reducer';
import words from './words';

const reducer = combineReducers({
  search,
  words
});

export default reducer;
