import { combineReducers } from 'redux';

import search from './search-reducer';
import words from "./words-reducer";

const reducer = combineReducers({
    words,
    search
});

export default reducer;

