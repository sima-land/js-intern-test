import {preloadedState} from '../store/store';

const data = (state = {preloadedState}, action) => {
  switch (action.type) {
    case 'data':
      return {preloadedState};
    default:
      return state;
  }

};

export default data;