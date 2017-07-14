const SEARCH = 'search';

export const search = (text) => ({
  type: SEARCH,
  payload: text
});
