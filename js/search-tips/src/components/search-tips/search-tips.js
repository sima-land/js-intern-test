import React from 'react';
import PropTypes from 'prop-types';
import SearchTip from './search-tip/search-tip';

import classes from './style.module.css';

const SearchTips = ({ searchResult }) => {
  const { entities, isOpen } = searchResult;
  const tipsList = entities.map((tip, idx) => (
    <SearchTip key={`${tip}__${idx}`} tip={tip} />
  ));

  return isOpen && <div className={classes.searchTips}>{tipsList}</div>;
};

SearchTips.propTypes = {
  searchResult: PropTypes.shape({
    entities: PropTypes.arrayOf(PropTypes.string).isRequired,
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
};

export default SearchTips;
