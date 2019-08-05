const search = (state={}, action) => {
  switch (action.type) {
    case 'SET_WORD':
      let newState = JSON.parse(JSON.stringify(state));
      newState['word'] = action.payload;
      return newState;

    default:
      return state;
  }

};

export default search;

