import { connect } from 'react-redux';

import * as actionsCreators from '../actions/search-actions';

import SearchForm from '../components/search-form';

const mapStateToProps = state => ({
  searchTips: state.search
});

const mapDispatchToProps = dispatch => ({
    search: () => { dispatch(actionsCreators.search()) },
    complete: (data) => { dispatch(actionsCreators.complete(data)) },
    fail: () => { dispatch(actionsCreators.fail()) }
});

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default SearchContainer;
