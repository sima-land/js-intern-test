const search = (state={word:'', data:[]}, action) => {
  let newState;
  switch (action.type) {
    case 'search':
      newState = JSON.parse(JSON.stringify(state));
      newState['word'] = action.payload;
      return newState;

    case 'words':
      newState = JSON.parse(JSON.stringify(state));
      newState['data'] = action.payload;
      return newState;

    default:
      return state;
  }

};

export default search;

