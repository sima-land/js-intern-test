import {connect} from 'react-redux';
import * as actions from '../actions/search-actions';
import SearchForm from '../components/search-form';

const getFilteredWords = (array, needle) => {
    if (needle === '')
        return [];
    let itemCount = 0;
    return array.filter(
        (item) => {
            if (itemCount < 5 && item.toLowerCase().includes(needle.toLowerCase())) {
                itemCount++
                return true
            }
        })
}

const mapStateToProps = (state) => {
    return {
        hints: getFilteredWords(state.words, state.filter),

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeFilter: (filter) => {
            dispatch(actions.filterAction(filter))
        }
    }
};

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default SearchContainer;
