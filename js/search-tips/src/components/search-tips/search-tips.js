import React from 'react';
import SearchTip from './search-tip/search-tip';

import classes from './style.module.css';

const SearchTips = ({ searchResult }) => {
  const { entities, isOpen } = searchResult;
  const tipsList = entities.map((tip) => <SearchTip key={tip} tip={tip} />);

  return isOpen && <div className={classes.searchTips}>{tipsList}</div>;
};

export default SearchTips;
