import React from 'react';
import PropTypes from 'prop-types';

const SearchTips = ({tips}) => (
  <div className="search-tips">
      {tips.map((tip) => <p>{tip}</p>)}
  </div>
);

SearchTips.propTypes = {
    tips: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default SearchTips;
