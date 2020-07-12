import { SEARCH } from '../constants';

export const onSearch = (inputValue) => ({
  type: SEARCH,
  payload: { inputValue },
});
