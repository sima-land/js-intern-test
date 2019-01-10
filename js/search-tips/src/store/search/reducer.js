import {textEdit} from './action';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case textEdit().type:
            return {
                ...state,
            };
        default:
            return state;
    }
}
