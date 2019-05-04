import { SEARCH } from "../actions/search-actions"

const search = (state = {}, action) => {
  switch (action.type) {
    case SEARCH:{
      const { value } = action
      const tips = !value.length?[]:state.contents
        .sort()
        .filter(val => val.includes(value))
        .slice(0, 5)
        console.log(Object.assign({},state, {value:value, tips:tips} ))
      return Object.assign({},state, {value:value, tips:tips} )
    }
    default:{
      return state
    }
  }

};

export default search;

