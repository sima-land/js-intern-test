import React, { Component } from 'react';
import SearchTips from '../components/search-tips';

class SearchForm extends Component {
  handleChange = e => {
    this.props.searchGoods(e.target.value);
  };
  render() {
    const { tips } = this.props;
    return (
      <section>
        <h1>Поисковые подсказки</h1>
        <input
          className="search-input"
          type="search"
          onChange={this.handleChange}
        />
        {tips.length > 0 && <SearchTips tips={tips} />}
      </section>
    );
  }
}

export default SearchForm;
