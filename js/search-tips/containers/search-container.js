import {connect} from 'react-redux'
import {updateInputStringAC, addInInputStringFoundWordAC} from '../reducers/search-reducer'

import SearchForm from '../components/search-form';

const mapStateToProps = state => ({

    inputString: state.search.inputString,
    searchTipsArray: state.search.searchTipsArray,
    additionalLineForOutput: state.search.additionalLineForOutput,
    currentCursorPosition: state.search.currentCursorPosition

});

const SearchContainer = connect(mapStateToProps, {updateInputStringAC, addInInputStringFoundWordAC})(SearchForm)

export default SearchContainer;
