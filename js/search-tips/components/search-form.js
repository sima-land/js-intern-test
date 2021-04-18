import React from 'react';
import SearchTips from '../components/search-tips';

const SearchForm =
  ({filtredWords, searchInput}) =>{
    return (
      <section>
        <h1>Поисковые подсказки</h1>
        <input 
          onChange = {(event) => {searchInput(event.target.value)}}
        />
        <SearchTips 
          filtredWords={filtredWords}
        />
      </section>
    );
  }
export default SearchForm;
