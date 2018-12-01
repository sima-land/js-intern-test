import { createStore } from 'redux';
import reducer from '../reducers';
import data from '../data/words';

let preloadedState = {
  words: data,
  search: {}
};


const store = createStore(reducer);

export { preloadedState };

export default store;
