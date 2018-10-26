import React from 'react';
import { connect } from 'react-redux';
import SearchTips from '../components/search-tips';

const SearchForm = ({search, filter}) => (
  <section>
    <h1>Поисковые подсказки</h1>
    <input className="search-input" onChange={evt => search(evt)} type="search"/>
    {(filter.length !== 0) ? <SearchTips filter={filter}/> : null}
  </section>
);

export default connect(
  state => ({
    filter:state.search.filter
  }),
  dispatch => ({
    search: (payload) => {
      dispatch({ type: 'SEARCH', payload:payload });
    },
  })
)(SearchForm);
