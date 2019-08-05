import React from 'react';
import SearchTips from '../components/search-tips';


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.props.setWord(e.target.value);
  };

  render() {
    const {word, filtered} = this.props.search;
    return (
      <section>
        <h1>Поисковые подсказки</h1>
        <input className="search-input" type="search" defaultValue={word} onChange={this.onChange} />
        <SearchTips words={filtered} />
      </section>
    )
  }
}

export default SearchForm;
