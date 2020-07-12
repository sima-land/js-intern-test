import React from 'react';

import classes from './style.module.css';

const SearchTip = ({ tip }) => {
  return (
    <div className={classes.searchTip}>
      <span dangerouslySetInnerHTML={{ __html: tip }} />
    </div>
  );
};

export default SearchTip;
