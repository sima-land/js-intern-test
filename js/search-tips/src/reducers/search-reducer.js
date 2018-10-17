const search = (state = {}, action) => {
  switch (action.type) {
    case 'SEARCH':
      return { request:action.searchLetters};
    default:
      return state;
  }

};

export default search;