import React from 'react';
import SearchTips from '../search-tips';

import './search-form.css';

const SearchForm = ({ search, searchWd }) => {

  const handleChange = (e) => {
    search(e.target.value)
  }

  return (
    <div className="container">
      <section>
        <div className="search">
          <h1 className="search__title">Поисковые подсказки</h1>
          <input 
                className="search__input" 
                placeholder="Enter the word"
                type="search" 
                onChange={handleChange}
                />
          <SearchTips searchWd={searchWd}/>
        </div>
      </section>
    </div>
    );
}

export default SearchForm;
