import { connect } from 'react-redux';

import { search } from '../actions/search-actions';

import SearchForm from '../components/search-form';

function mapStateToProps(state) {
    return { value: state.search.value, tips: state.search.tips }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      search: val => {
        dispatch(search(val))
      }
    }
  }
  
  const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchForm)