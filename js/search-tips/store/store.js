import {compose, createStore} from 'redux';
import reducer from '../reducers';

const store = createStore(reducer, compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
));

export default store;
