import {createStore} from 'redux';
import reducer from '../reducers';
import data from '../data/words';
import search from "../reducers/search-reducer";

// let preloadedState = {
//     search: {
//         words: data
//     }
// };


//const store = createStore(reducer, preloadedState);
const store = createStore(reducer);


window.store = store;

// export {preloadedState};

export default store;
