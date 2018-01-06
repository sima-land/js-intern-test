import * as types from "../actions/types";
export const search = (state = "", action) => {
  switch (action.type) {
    case types.SEARCH_GOODS:
      return action.payload;
    default:
      return state;
  }
};
export const words = (state = {}) => {
  return state;
};

export const filteredGoods = state => {
  return state.search;
};
