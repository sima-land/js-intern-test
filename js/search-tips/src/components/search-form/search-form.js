import React, { useState } from 'react';
import useInput from '../../hooks/use-input';

import SearchTips from '../../containers/search-tips-container';

import classes from './style.module.css';

const SearchForm = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <section>
      <label htmlFor='search'>Поисковые подсказки</label>
      <input
        className={classes.searchForm}
        onChange={handleChange}
        type='search'
        id='search'
      />
      <SearchTips />
    </section>
  );
};

export default SearchForm;
