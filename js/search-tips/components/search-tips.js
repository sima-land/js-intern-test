import React from "react";

const SearchTips = props => (
  <div className="search-tips-block">
    <ul class="search-tips-block-list">
      {props.wordsTips.map((item, index) => (
        <li
          key={index}
        >
          <button
            className="search-tips-button"
            onMouseDown={() => props.onTipClickHandler(item)}
          >{item}</button>
        </li>
      ))}
    </ul>
  </div>
);

export default SearchTips;
