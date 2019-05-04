import { SEARCH } from "../actions/search-actions"

const search = (state = {}, action) => {
  switch (action.type) {
    case SEARCH:{
      const { value } = action
      const tips = !value.length?[]:state.contents
        .sort()
        .filter((val) => val.toLowerCase().includes(value.toLowerCase() ))
        .slice(0, 5)
      return Object.assign({},state, {value:value, tips:tips} )
    }
    default:{
      return state
    }
  }

};

export default search;

