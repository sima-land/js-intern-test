import React from 'react';
import SearchTips from '../components/search-tips';

const SearchForm = ({ search, foundWords }) => {

  const handleChange = (e) => {
    search(e.target.value)
  }

  return (
    <section>
      <h1>Поисковые подсказки</h1>
      <input className="search-input" 
        type="search" 
        onChange={handleChange}/>
      <SearchTips foundWords={foundWords}/>
    </section>
    );
}

export default SearchForm;
