import React from 'react';
import PropTypes from 'prop-types';
import classes from './style.module.css';

const SearchTip = ({ tip }) => {
  return (
    <div className={classes.searchTip}>
      <span dangerouslySetInnerHTML={{ __html: tip }} />
    </div>
  );
};

SearchTip.propTypes = {
  tip: PropTypes.string.isRequired,
};

export default SearchTip;
