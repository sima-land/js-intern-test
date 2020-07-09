import React from 'react';
import SearchTips from './search-tips';
import '../styles/index.css';

const SearchForm = () =>
  {
    console.log('done'); 
    return (
    <section>
      <h1>Поисковые пакsи</h1>
      <input className="search-input" type="search"/>
      <SearchTips />
    </section>
    )
  } 

export default SearchForm;
