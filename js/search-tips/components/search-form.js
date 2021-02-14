import React from 'react'
import {findDOMNode} from "react-dom"
import PropTypes from 'prop-types'
import SearchTips from '../components/search-tips'

const SearchForm = ({
                        inputString,
                        searchTipsArray,
                        additionalLineForOutput,
                        currentCursorPosition,
                        updateInputStringAC,
                        addInInputStringFoundWordAC,
                    }) => (
    <section className="search-wrapper">
        <h1>Поисковые подсказки</h1>
        <input className="search-input" type="search" value={inputString}
               ref={(component) => {
                   const input = findDOMNode(component)
                   if (input !== null) {
                       input.focus()
                   }
               }}
               onFocus={(event) => {
                   event.target.selectionStart = currentCursorPosition
                   event.target.selectionEnd = currentCursorPosition
                   updateInputStringAC(event.target.value, event.target.selectionStart, event.target.scrollWidth - event.target.clientWidth)
               }}
               onChange={(event) => {
                   updateInputStringAC(event.target.value, event.target.selectionStart, event.target.scrollWidth - event.target.clientWidth)
               }}
               onClick={(event) => {
                   updateInputStringAC(event.target.value, event.target.selectionStart, event.target.scrollWidth - event.target.clientWidth)
               }}
               onKeyUp={(event) => {
                   updateInputStringAC(event.target.value, event.target.selectionStart, event.target.scrollWidth - event.target.clientWidth)
               }}
        />
        <SearchTips searchTipsArray={searchTipsArray} additionalLineForOutput={additionalLineForOutput}
                    addInInputStringFoundWordAC={addInInputStringFoundWordAC}/>
    </section>
)

SearchForm.propTypes = {
    inputString: PropTypes.string.isRequired,
    searchTipsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    additionalLineForOutput: PropTypes.string.isRequired,
    currentCursorPosition: PropTypes.number.isRequired,
    updateInputStringAC: PropTypes.func.isRequired,
    addInInputStringFoundWordAC: PropTypes.func.isRequired,
}

export default SearchForm;
