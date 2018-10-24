import {createStore} from 'redux';
import reducer from '../reducers';
import data from '../data/words';

let preloadedState = {
    words: data,
    filter: ''
};

const store = createStore(reducer, preloadedState);

export default store;
