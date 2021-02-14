import data from '../data/words'

const UPDATE_INPUT_STRING = 'SEARCH/UPDATE_INPUT_STRING'
const ADD_IN_INPUT_STRING_FOUND_WORD = 'SEARCH/ADD_IN_INPUT_STRING_FOUND_WORD'


const searchState = {
    words: data,
    searchTipsArray: [],
    inputString: '',
    currentCursorPosition: 0,
    additionalLineForOutput: ''

}

const search = (state = searchState, action) => {
    switch (action.type) {
        case UPDATE_INPUT_STRING:

            let newArray = []
            let [StartOfSearchWord, EndOfSearchWord] = findThePositionOfTheWordInTheString(action.newText, action.currentCursorPosition)

            const searchWord = action.newText.substring(StartOfSearchWord, EndOfSearchWord + 1)

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
            const newTextWithoutSpaces = action.newText.substring(0, action.currentCursorPosition).split(' ').join('')
            const amountSpacesInNewText = action.newText.substring(0, action.currentCursorPosition).length - newTextWithoutSpaces.length

            return Object.assign({}, state, {inputString: action.newText}, {searchTipsArray: newArray},
                {currentCursorPosition: action.currentCursorPosition},
                {
                    additionalLineForOutput: action.scrollWidthOverflow === 0
                        ? newTextWithoutSpaces + ';'.repeat(amountSpacesInNewText * 0.68)
                        : 'а'.repeat(148)
                }
            )

        case ADD_IN_INPUT_STRING_FOUND_WORD:
            [StartOfSearchWord, EndOfSearchWord] = findThePositionOfTheWordInTheString(state.inputString, state.currentCursorPosition)
            const inputStringStart = state.inputString.substr(0, StartOfSearchWord)
            const newTextForInputString = inputStringStart
                + action.foundWord
                + state.inputString.substr(EndOfSearchWord + 1, state.inputString.length);

            return Object.assign({}, state, {inputString: newTextForInputString},
                {currentCursorPosition: inputStringStart.length + action.foundWord.length})

        default:
            return state
    }

}

export default search

//ActionCreators
export const updateInputStringAC = (value, currentCursorPosition, scrollWidthOverflow) => ({
    type: UPDATE_INPUT_STRING,
    newText: value,
    currentCursorPosition,
    scrollWidthOverflow,
})

export const addInInputStringFoundWordAC = (foundWord) => ({
    type: ADD_IN_INPUT_STRING_FOUND_WORD,
    foundWord,
})

// functions
function findThePositionOfTheWordInTheString(newText, currentCursorPosition) {

    const currentLengthText = newText.length
    // Базовые условия быстрого выхода, нет слова для поиска
    if (currentLengthText === 0) {
        return [-1, -1]
    }
    if (currentCursorPosition === currentLengthText && newText.charAt(currentCursorPosition - 1) === ' ') {
        return [-1, -1]
    }
    if (newText.charAt(currentCursorPosition) === ' ' && newText.charAt(currentCursorPosition - 1) === ' ') {
        return [-1, -1]
    }

    // Ищем первую позицию для слова поиска
    let StartOfSearchWord = 0
    for (let i = currentCursorPosition - 1; i >= 0; i--) {
        if (newText.charAt(i) === ' ') {
            StartOfSearchWord = i + 1
            break
        }
    }

    let EndOfSearchWord = currentLengthText - 1
    for (let i = StartOfSearchWord; i < currentLengthText; i++) {
        const currentChar = newText.charAt(i)
        if (currentChar === ' ') {
            EndOfSearchWord = i - 1
            break
        }
    }
    return [StartOfSearchWord, EndOfSearchWord]

}