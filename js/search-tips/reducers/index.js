import { combineReducers } from "redux";

import { search, words } from "./search-reducer";

const reducer = combineReducers({
  search,
  words
});

export default reducer;
