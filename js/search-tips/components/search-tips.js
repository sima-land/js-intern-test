import React from 'react';

const SearchTips = (props) => (
  <div className="search-tips">
    {props.words.map(word => <p>{word}</p>)}
  </div>
);

export default SearchTips;
