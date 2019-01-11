import { connect } from 'react-redux';

import {search as actions} from '../actions/search-actions';

import SearchForm from '../components/search-form';

const mapStateToProps = state => ({
    words: state.words,
    search: state.search
});

// const mapDispatchToProps = dispatch => ({
//
// });

const SearchContainer = connect(mapStateToProps, {actions})(SearchForm);

export default SearchContainer;
