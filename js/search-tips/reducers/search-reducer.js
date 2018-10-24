const search = (state = {}, action) => {
    switch (action.type) {
        case 'FILTER_CHANGE':
            if(action.value === '')
                return state
            return Object.assign({}, state, {
                filter: action.filter
            });
        default:
            return state;
    }
};

export default search;
