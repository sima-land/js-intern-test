const search = (state = {}, action) => {
  switch (action.type) {
    case 'search':
      let words = state.words,
      tips = [],
      q = action.payload;
      if(q.length) {
        tips = words.filter( x => x.toLowerCase().includes(q.toLowerCase()) );
        if(tips.length > 5) tips = tips.slice(0, 5); 
      };

      return { ...state,  tips };

    default:
      return state;
  }

};

export default search;
