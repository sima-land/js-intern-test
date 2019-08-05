import { connect } from 'react-redux';

import {setWord} from '../actions/search-actions';

import SearchForm from '../components/search-form';

const mapStateToProps = state => {
  const {word, data} = state.search;
  const filteredArr = [];

  if(word.length>0) {
    console.time();
    for(let i=0, counter=0; i<data.length; i++) {
      if(data[i].toLowerCase().indexOf(word.toLowerCase())>-1) {
        filteredArr.push(data[i]);
        if(++counter>5) break;
      }
    }
    console.timeEnd();
  }

  state.search.filtered = filteredArr;
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
