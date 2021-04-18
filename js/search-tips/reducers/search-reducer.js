// const initialState = {
//   searchText: '',
// };

const search = (state = {}, action) => {
  switch (action.type) {
    case 'search':
      return Object.assign({}, state, { 
        searchText: action.payload.searchText
      })
    default:
      return state;
  }

};

export default search;
