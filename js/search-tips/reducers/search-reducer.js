const UPDATE_INPUT_STRING = "SEARCH/UPDATE_INPUT_STRING"
import data from '../data/words'


const searchState = {
    words: data,
    searchTipsArray: [],
    inputString: '',
}

const search = (state = searchState, action) => {
    switch (action.type) {
        case UPDATE_INPUT_STRING:
            let newArray = []
            if (action.newText !== '') {
                newArray = state.words.filter((val) => {

                    let regexp = new RegExp(`^${action.newText}`, 'g')

                    // проверяем вхождение в каждом слове
                    return val.split(' ').filter((valWord => {
                        return regexp.test(valWord)
                    }
                    )).length !==0


                    // return regexp.test(val)
//                    let regexp = new RegExp(`^${action.newText.toUpperCase()}`)
                    // return regexp.test(val.toUpperCase())
//                    return val.toUpperCase().indexOf(action.newText.toUpperCase()) !== -1
                })
            }
            return Object.assign({}, state, {inputString: action.newText}, {searchTipsArray: newArray})
        default:
            return state
    }

}

export default search

//ActionCreators
export const updateInputStringAC = (value) => ({type: UPDATE_INPUT_STRING, newText: value})

