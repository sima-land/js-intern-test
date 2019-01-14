const initialState = {
  data: [],
  error: false
}
const search = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH':
      return {
        data: [],
        error: false
      }
    case 'COMPLETE':
      return {
        data: action.data,
        error: false
      }
    case 'FAIL':
      return {
        data: [],
        error: true
      }
    default:
      return state;
  }

};

export default search;
