import { connect } from 'react-redux';

import * as actions from '../actions/search-actions';

import SearchForm from '../components/search-form';

const mapStateToProps = state => ({
  words: state.words,
  filter: state.search
});

const mapDispatchToProps = dispatch => ({
  filterWord: (text) => {
    dispatch(actions.filter(text))
  }
}); 

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default SearchContainer;
