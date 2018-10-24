import React from 'react';
import SearchTips from '../components/search-tips';

const SearchForm =
    ({onChangeFilter, hints=[]}) =>
        (
            <section>
                <h1>Поисковые подсказки</h1>
                <input className="search-input" type="search"
                       onChange={(e) => onChangeFilter(e.target.value)}
                />
                <SearchTips hints={hints}/>
            </section>
        );

export default SearchForm;
