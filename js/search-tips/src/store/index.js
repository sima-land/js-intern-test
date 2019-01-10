import { createStore } from 'redux';
import data from '../data/words';

import { combineReducers } from 'redux';

import search from './search/reducer';

const reducer = combineReducers({
  search
});


let preloadedState = {
  words: data
};


const index = createStore(reducer, preloadedState);

export { preloadedState };

export default index;
