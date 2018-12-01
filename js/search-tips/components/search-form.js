import React from 'react';
import SearchTips from '../components/search-tips';

const SearchForm =
  (props) => {
    function handleInput(event) {
      props.filterWord(event.target.value);
    }
    function getFiltredWords(words, filter) {
      return words.filter((word) => word.indexOf(filter) > -1).slice(0,5);
    }
    return (
      <section>
        <h1>Поисковые подсказки</h1>
        <input className="search-input" type="search" onChange={handleInput}/>
        <SearchTips words={getFiltredWords(props.words, props.filter)}/>
      </section>
    );
  };
export default SearchForm;
