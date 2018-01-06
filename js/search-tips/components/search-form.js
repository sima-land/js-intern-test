import React, { Component } from "react";
import SearchTips from "../components/search-tips";

class SearchForm extends Component {
  handleChange = e => {
    this.props.searchGoods(e.target.value);
  };
  render() {
    return (
      <section>
        <h1>Поисковые подсказки</h1>
        <input
          className="search-input"
          type="search"
          onChange={this.handleChange}
        />
        <SearchTips tips={this.props.tips} />
      </section>
    );
  }
}

export default SearchForm;
