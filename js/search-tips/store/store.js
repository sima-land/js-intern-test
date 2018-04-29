import { createStore } from 'redux';
import reducer from '../reducers';
import data from '../data/words';

let preloadedState = {
  search: {
    words: data,
    tips: [],
  }
};


const store = createStore(reducer, preloadedState);

export { preloadedState };

export default store;
