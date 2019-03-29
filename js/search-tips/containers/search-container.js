import { connect } from 'react-redux';

import * as actions from '../actions/search-actions';

import SearchForm from '../components/search-form';

const mapStateToProps = ({search}) => ({
  foundWords: search
});

const mapDispatchToProps = {
  search: actions.search
}

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default SearchContainer;
