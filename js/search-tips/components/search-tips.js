import React from 'react';

const SearchTips = (props) => (
  <div className="search-tips">
		{ props.tips.map((tip, i) => <li key={ i }>{ tip }</li>) }
  </div>
);

export default SearchTips;
