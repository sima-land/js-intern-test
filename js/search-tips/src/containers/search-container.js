import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchAction} from '../actions/search-actions';

import SearchForm from '../components/search-form';

const mapStateToProps = state => ({
  state
});

const matchDispatchToProps = dispatch => {
    return bindActionCreators({searchAction:searchAction},dispatch)
}

const SearchContainer = connect(mapStateToProps, matchDispatchToProps)(SearchForm);

export default SearchContainer;
