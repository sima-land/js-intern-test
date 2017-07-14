import React from 'react';

const SearchTips = (props) => (
  <section>
    {
      props.tips.map((tip, index) => (
        <div className="search-tips">
          {tip}
        </div>
      ))
    }
  </section>
);

export default SearchTips;
