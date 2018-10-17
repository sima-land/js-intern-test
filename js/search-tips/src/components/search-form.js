import React from 'react';
import SearchTips from '../components/search-tips';
import store from '../store/store'
import searchAction from '../actions/search-actions'
const SearchForm =
  (props) =>{
      console.log(props)
      const displ = function(){
          let value = document.getElementById('valueInput').value
          console.log(value)
          store.dispatch(searchAction(value))
      }
    return (
      <section>
        <h1>Поисковые подсказки </h1>
        <input onInput={displ} className="search-input" type="search" id='valueInput'/>
        <SearchTips store={props.state}/>
      </section>
    )};

export default SearchForm;
