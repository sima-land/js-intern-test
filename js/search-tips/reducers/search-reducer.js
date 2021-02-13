const UPDATE_INPUT_STRING = "SEARCH/UPDATE_INPUT_STRING"
import data from '../data/words'


const searchState = {
    words: data,
    searchTipsArray: [],
    inputString: '',
    additionalLineForOutput: ''

}

const search = (state = searchState, action) => {
    switch (action.type) {
        case UPDATE_INPUT_STRING:

            let newArray = []
            let [StartOfSearchWord, EndOfSearchWord] = findThePositionOfTheWordInTheString(action.newText, action.currentCursorPosition)
            console.log(StartOfSearchWord, EndOfSearchWord)

            const searchWord = action.newText.substring(StartOfSearchWord + 1, EndOfSearchWord)

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
            // Расчет позиции searchTips
            return Object.assign({}, state, {inputString: action.newText}, {searchTipsArray: newArray},
                {additionalLineForOutput: action.currentCursorPosition < 174 ? action.newText.substring(0, action.currentCursorPosition) : 'а'.repeat(174)})

        default:
            return state
    }

}

export default search

//ActionCreators
export const updateInputStringAC = (value, currentCursorPosition) => ({
    type: UPDATE_INPUT_STRING,
    newText: value,
    currentCursorPosition,
})


// function
function findThePositionOfTheWordInTheString(newText, currentCursorPosition) {
    let StartOfSearchWord = newText.lastIndexOf(' ', currentCursorPosition) + 1
    let EndOfSearchWord = 0
    for (let i = currentCursorPosition; i < newText.length; i++) {
        const currentChar = newText.charAt(i)
        if (currentChar === ' ') {
            EndOfSearchWord = i
            break
        }
    }
    if (EndOfSearchWord === 0) {
        EndOfSearchWord = newText.length - 1
    }

    return [StartOfSearchWord, EndOfSearchWord]

}