import React, { useState } from 'react';
import useInput from '../../hooks/use-input';

import SearchTips from '../search-tips/search-tips';

import classes from './style.module.css';

const SearchForm = ({ search, words, currentSearch }) => {
  console.log('curr search state', currentSearch);
  const handleChange = (e) => {
    // searchText.onChange(e);
    search(e.target.value);
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
