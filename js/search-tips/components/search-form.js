import React from 'react';
import SearchTips from '../components/search-tips';

const SearchForm =
  ({ search, updateSuggestions }) => {
    
    return (
      <section>
        <h1>Поисковые подсказки</h1>
        <input className="search-input" type="search" onChange={(e) => updateSuggestions(e.target.value)} />
        <SearchTips search={search} />
      </section>
    )};

export default SearchForm;
