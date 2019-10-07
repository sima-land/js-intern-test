export const suggestionsRequested = (value) => {
  return {
    type: 'search',
    payload: value
  };
};