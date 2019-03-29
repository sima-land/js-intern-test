import React from 'react';

const SearchTips = ({ foundWords }) => (
  <ul className="search-tips">
    {
      foundWords.map((item, idx) => {
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
