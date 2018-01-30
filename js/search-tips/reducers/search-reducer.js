const search = (state = {}, action) => {
  switch (action.type) {
    case 'search':
      let words = state.words || [];
      let tips = [];
      let query = action.payload.trim();
      if (query.length > 0) {
        for (let i = 0; i < words.length && tips.length < 5; i++) {
          if (words[i]
          && words[i].toLowerCase().indexOf(query.toLowerCase()) === 0) {
            tips.push(words[i]);
          }
        }
      }
      return Object.assign({}, state, { tips });
    default:
      return state;
  }

};

export default search;
