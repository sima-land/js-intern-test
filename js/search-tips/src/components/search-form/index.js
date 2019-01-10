import React from 'react';
import SearchTips from '../search-tips';

import style from './style.css';

export default class SearchForm extends React.Component {
    render() {
        return(
            <section>
                <h1 className={style.header}>Поисковые подсказки</h1>
                <input className="search-input" type="search" onChange={this.props.onChangeInputValue}/>
                <SearchTips />
            </section>
        );
    }
}

