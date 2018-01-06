import React from "react";

const SearchTips = props => (
  <div className="search-tips">
    <ul>{props.tips.map(tip => <li key={tip}>{tip}</li>)}</ul>
  </div>
);

export default SearchTips;
