import React from 'react';
import { connect } from 'react-redux';

const SearchTips = ({filter}) => (
  <div className="search-tips">
    {filter.map(hint => <p>{hint}</p>)}
  </div>
);

export default SearchTips;
