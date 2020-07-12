import React from 'react';

import SearchTips from '../../containers/search-tips-container';

import classes from './style.module.css';

const SearchForm = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <section className={classes.searchForm}>
      <label htmlFor='search' className={classes.searchLabel}>
        Поисковые подсказки
      </label>
      <input
        className={classes.searchInput}
        onChange={handleChange}
        type='search'
        autoComplete={'off'}
        id='search'
      />
      <SearchTips />
    </section>
  );
};

export default SearchForm;
