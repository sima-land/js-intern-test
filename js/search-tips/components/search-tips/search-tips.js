import React from 'react';

import './search-tips.css';

const SearchTips = ({ searchWd }) => (

  <ul className="search-tips">
    {
      searchWd.map((item, idx) => {
        return (
          <li key={idx} className="search-tips__item">
            {item}
          </li>
        )
      })
    }
  </ul>
);  

export default SearchTips;