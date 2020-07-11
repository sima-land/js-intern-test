import { SEARCH } from '../constants';

export const search = (inputValue) => ({
  type: SEARCH,
  payload: { inputValue },
});
