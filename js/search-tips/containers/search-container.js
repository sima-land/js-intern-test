import { connect } from 'react-redux';

import * as actions from '../actions/search-actions';

import SearchForm from '../components/search-form';

const mapStateToProps = state => ({
    tips: state.search.tips || []
});

const mapDispatchToProps = dispatch => ({
    changeAction: (text) => dispatch(actions.search(text))
});

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default SearchContainer;
