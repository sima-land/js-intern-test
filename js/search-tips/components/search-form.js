import React from 'react'
import PropTypes from 'prop-types'
import SearchTips from '../components/search-tips'

const SearchForm = ({inputString, searchTipsArray, updateInputStringAC}) => (
    <section>
        <h1>Поисковые подсказки</h1>
        <input className="search-input" type="search" value={inputString} onChange={(event) => {
            updateInputStringAC(event.target.value)
        }}/>
        <SearchTips searchTipsArray={searchTipsArray}/>
    </section>
)

SearchForm.propTypes = {
    inputString: PropTypes.string.isRequired,
    searchTipsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateInputStringAC: PropTypes.func.isRequired,
}


export default SearchForm;
