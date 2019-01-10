import React from 'react';
import SearchTips from '../search-tips';

import style from './style.css';

const SearchForm =
  () =>
    (
      <section>
        <h1 className={style.header}>Поисковые подсказки</h1>
        <input className="search-input" type="search"/>
        <SearchTips />
      </section>
    );

export default SearchForm;
