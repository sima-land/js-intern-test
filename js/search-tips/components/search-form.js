import React from 'react';
import PropTypes from 'prop-types';
import SearchTips from '../components/search-tips';

const SearchForm =
  ({searchString, onSearchStringChange, tips}) => {
      const handleInputChange = (evt) => {
          onSearchStringChange(evt.target.value);
      };

      return (
        <section>
            <h1>Поисковые подсказки</h1>
            <input onChange={handleInputChange} value={searchString} className="search-input" type="search"/>
            {tips.length > 0 && <SearchTips tips={tips}/>}
        </section>
      );
  };

SearchForm.propTypes = {
    searchString: PropTypes.string.isRequired,
    onSearchStringChange: PropTypes.func.isRequired,
    tips: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default SearchForm;
