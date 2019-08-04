import { connect } from 'react-redux';

import {setWord} from '../actions/search-actions';

import SearchForm from '../components/search-form';

const mapStateToProps = state => {
  return {
    search: state.search
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setWord: (word) => dispatch(setWord(word))
  }
};


const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default SearchContainer;
