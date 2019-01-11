import {textEdit} from './action';
import {searchByRow} from '../../utils';

let timeout = null;
const TIMEOUT_BEFORE_SEARCH = 500;

export default function reducer(state = {}, action) {
    switch (action.type) {
        case textEdit().type:
            return new Promise((resolve)=> {
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                    resolve(searchByRow(action.payload));
                }, TIMEOUT_BEFORE_SEARCH);
            });
            // delayBeforeSearch(action.payload)
            //     .then((result) => {
            //         return {
            //             ...state,
            //             result,
            //             loading: false
            //         };
            //     })
            //     .catch((error) => {
            //         return {
            //             ...state,
            //             error,
            //             loading: false
            //         }
            //     });
            // break;
            // return {
            //     ...state,
            //     rowForSearch: action.payload,
            //     loading: true
            // };
        default:
            return state;
    }
}
