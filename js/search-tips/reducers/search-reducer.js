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
            let StartOfSearchWord = action.newText.lastIndexOf(' ', action.currentCursorPosition)
            //let EndOfSearchWord = action.newText.indexOf(' ', action.currentCursorPosition)
            const searchWord = action.newText.substring(StartOfSearchWord + 1 , action.currentCursorPosition)

            if (searchWord !== '') {

                let amountCurentFoundWords = 0
                for (const wordFromArray of state.words) {

                    let regexp = new RegExp(`^${searchWord}`, 'i') // флаг 'i' - поиск без учета регистра

                    // проверяем вхождение в каждом слове
                    if (wordFromArray.split(' ').filter((valWord => {
                            return regexp.test(valWord)
                        }
                    )).length !== 0) {
                        newArray.push(wordFromArray)
                        amountCurentFoundWords++
                    }
                    if (amountCurentFoundWords === 5) break

                }
            }
            return Object.assign({}, state, {inputString: action.newText}, {searchTipsArray: newArray})
        default:
            return state
    }

}

export default search

//ActionCreators
export const updateInputStringAC = (value, currentCursorPosition) => ({
    type: UPDATE_INPUT_STRING,
    newText: value,
    currentCursorPosition
})

