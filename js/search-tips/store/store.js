import { createStore } from 'redux';
import reducer from '../reducers';
import data from '../data/words';

let preloadedState = {
  words: data
};

const store = createStore(
  reducer,
  preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { preloadedState };

export default store;
