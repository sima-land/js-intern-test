import React from 'react';
import { suggestionsRequested } from '../actions/search-actions';

const SearchTips = ({ search: { suggestions } }) => (
  <div className="search-tips">
    <ul>
      {
        suggestionsRequested.length === 0 ?
          null :
          suggestions.slice(0, 5).map((elem, idx) => {
            return <li key={idx} onClick={({ target }) =>
              updateValue(target)}>{elem}</li>;
          })
      }
    </ul>
  </div>
);

export default SearchTips;
