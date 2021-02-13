import React from 'react'
import PropTypes from 'prop-types'
import SearchTips from '../components/search-tips'

const SearchForm = ({
                        inputString,
                        searchTipsArray,
                        updateInputStringAC,
                        additionalLineForOutput,
                    }) => (
    <section className="search-wrapper">
        <h1>Поисковые подсказки</h1>
        <input className="search-input" type="search" autoFocus value={inputString}
               onChange={(event) => {
                   updateInputStringAC(event.target.value, event.target.selectionStart)}}
               onClick={(event) => {
                   updateInputStringAC(event.target.value, event.target.selectionStart)}}
               onKeyDown={(event) => {
                   updateInputStringAC(event.target.value, event.target.selectionStart)}}
        />
        <SearchTips searchTipsArray={searchTipsArray} additionalLineForOutput={additionalLineForOutput}/>
    </section>
)

SearchForm.propTypes = {
    inputString: PropTypes.string.isRequired,
    searchTipsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateInputStringAC: PropTypes.func.isRequired,
    additionalLineForOutput: PropTypes.string.isRequired,
}


export default SearchForm;
