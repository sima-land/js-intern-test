import { connect } from 'react-redux';

import * as actions from '../actions/search-actions';

import SearchForm from '../components/search-form';

const searchText = (words, searchText) => {
    const searchTextLow = (searchText || '').toLowerCase() 
    const filtredWords = [];

    if (searchTextLow === '') return filtredWords
    for (let i = 0; i < words.length; i++) {
        if (words[i].toLowerCase().indexOf(searchTextLow) == 0) {
            filtredWords.push(words[i])
        }
        if (filtredWords.length == 5) {
            break
        }
    }

    return filtredWords
    
}


const mapStateToProps = (state) => {
    const words = state.search.words;
    
    return {
        filtredWords: searchText(words, state.search.searchText)
    }
    
}

const mapDispatchToProps = (dispatch) => ({
    searchInput: (searchText) => dispatch(actions.searchInput(searchText))
});

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default SearchContainer;
