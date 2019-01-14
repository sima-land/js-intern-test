import React from 'react';

const SearchTips = (props) => (
  <div className="search-tips">
      <ul>
          {props.tips.map((tip) => {
              return (
                  <li>{tip}</li>
              )
          })}
      </ul>
  </div>
);

export default SearchTips;
