import data from '../data/words';

let preloadedState = {
  words: data,
  filter:[]
};

const search = (state = preloadedState, action) => {
  let newState = {};
  switch (action.type) {
    case 'SEARCH': {
      const searchInput_value = action.payload.target.value;
      let search_hint = [];
      if (searchInput_value){
        state.words.forEach((hint) => {
          if (hint.toLowerCase().indexOf(searchInput_value.toLowerCase()) !== -1) {
            search_hint.push(hint)
          };
        });
      };
      newState = Object.assign({}, state, {filter:search_hint.slice(0, 5)});
      return newState;
    }
    default: return state;
  }

};

export default search;
