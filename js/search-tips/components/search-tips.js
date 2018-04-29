import React from 'react';

const SearchTips = (props) => (
  <div className="search-tips">
    {
      props.tips.map((tip, i) => <p key={i.toString()}>{tip}</p>)
    }
  </div>
);

export default SearchTips;
