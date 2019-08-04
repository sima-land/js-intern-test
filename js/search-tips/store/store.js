import { createStore, applyMiddleware  } from 'redux';
import reducer from '../reducers';
import data from '../data/words';

const store = createStore(reducer);

store.dispatch({
  type:'words',
  payload: data
});


export default store;
