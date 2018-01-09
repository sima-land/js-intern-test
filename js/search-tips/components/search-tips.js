import React from 'react';

const SearchTips = props => (
  <div className="search-tips">
    <ul className="tips-list">
      {props.tips.map(tip => (
        <li key={tip} className="tips-item">
          {tip}
        </li>
      ))}
    </ul>
  </div>
);

export default SearchTips;
