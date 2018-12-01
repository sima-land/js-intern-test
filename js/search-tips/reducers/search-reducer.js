const initialState = "There is no such phrase"

const search = (state = initialState, action) => {
  switch (action.type) {
    case 'search':
      return action.filter
    default:
      return state;
  }

};

export default search;
