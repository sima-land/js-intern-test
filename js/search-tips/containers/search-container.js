import {connect} from 'react-redux';

import * as actions from '../actions/search-actions';

import SearchForm from '../components/search-form';
import {getSearchString, getSearchTips, getWords} from '../selectors/search-selectors';
import {ActionCreator} from '../actions/search-actions';

const mapStateToProps = state => ({
    searchString: getSearchString(state),
    tips: getSearchTips(state)
});

const mapDispatchToProps = {
    onSearchStringChange: ActionCreator.changeSearchString
};

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default SearchContainer;