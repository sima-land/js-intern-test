import { connect } from 'react-redux';

import * as actions from '../actions/search-actions';

import SearchForm from '../components/search-form';

const mapStateToProps = ({ search }) => ({
  search
});

const mapDispatchToProps = dispatch => ({
  updateSuggestions: value => dispatch(actions.suggestionsRequested(value)),
});

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default SearchContainer;
