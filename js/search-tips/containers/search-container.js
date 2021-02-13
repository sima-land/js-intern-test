import {connect} from 'react-redux'
import {updateInputStringAC} from '../reducers/search-reducer'

import * as actions from '../actions/search-actions';

import SearchForm from '../components/search-form';

const mapStateToProps = state => ({

    inputString: state.search.inputString,
    searchTipsArray: state.search.searchTipsArray,
});

const SearchContainer = connect(mapStateToProps, {updateInputStringAC})(SearchForm)

export default SearchContainer;
