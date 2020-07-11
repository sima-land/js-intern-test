import { connect } from 'react-redux';

import { search } from '../redux/actions/search-actions';

import SearchForm from '../components/search-form/search-form';

const mapStateToProps = (state) => ({
  words: state.search.words,
  currentSearch: state.search.currentSearch,
});

const mapDispatchToProps = {
  search,
};

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm);

export default SearchContainer;
