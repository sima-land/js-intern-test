import { createStore } from 'redux';
import reducer from '../reducers';
import data from '../data/words';

const store = createStore(reducer);

store.dispatch({
  type:'GET_DATA',
  payload: data
});


export default store;
