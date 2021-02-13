import React from 'react';

const SearchTips = ({searchTipsArray}) => (
    <div className="search-tips">
        {searchTipsArray.map((tip, index) => {
            return (<div key={tip + Math.random()}> {tip}  </div>)
        })
        }
    </div>
);

export default SearchTips;
