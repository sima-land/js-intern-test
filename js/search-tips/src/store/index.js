import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import data from '../data/words';
import search from './search/reducer';
import monitorReducersEnhancer from '../enhancers/monitorReducers'
import loggerMiddleware from '../middlewares/logger'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  search
});

const initialState = {
  search: {
    words: data
  }
};

export default function configureStore() {
  // const middlewares = [loggerMiddleware, thunkMiddleware];
  // const middlewareEnhancer = applyMiddleware(...middlewares);
  //
  // const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  // const composedEnhancers = composeWithDevTools(...enhancers);
// debugger;
//   return createStore(rootReducer, initialState, composedEnhancers)
  return createStore(rootReducer, initialState)
}