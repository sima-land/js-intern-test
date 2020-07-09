import { connect } from 'react-redux';

import * as actions from '../redux/actions/search-actions';

import SearchForm from '../components/search-form';

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({

});

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default SearchContainer;
