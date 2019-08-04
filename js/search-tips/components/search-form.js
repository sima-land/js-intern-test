import React from 'react';
import SearchTips from '../components/search-tips';


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.filterData = this.filterData.bind(this);
  }
  onChange(e) {
    this.props.setWord(e.target.value);
  };

  filterData() {
    const {word,data} = this.props.search;
    if(word.length==0) return [];
    let counter = 0;
    let filteredArr = [];
    for(let i=0; i<data.length; i++) {
      if(data[i].toLowerCase().indexOf(word.toLowerCase())>-1) {
        filteredArr.push(data[i]);
        if(++counter>5) break;
      }
    }
    return filteredArr;
  }

  render() {
    const {word} = this.props.search;
    console.time();
    let words = this.filterData();
    console.timeEnd();

    return (
      <section>
        <h1>Поисковые подсказки</h1>
        <input className="search-input" type="search" defaultValue={word} onChange={this.onChange} />
        <SearchTips words={words} />
      </section>
    )
  }
}

export default SearchForm;
