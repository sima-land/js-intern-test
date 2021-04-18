import React from 'react';

const SearchTips = (props) => (
  <div className="search-tips">
    {props.filtredWords.map((word) => 
      <div className="search-item">{ word }</div>
    )} 
  </div>
);

export default SearchTips;


