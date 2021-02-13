import React from 'react';

const SearchTips = ({searchTipsArray, additionalLineForOutput}) => (
    <div className="search-box" style={{left: '-70px', top: '82px'}}>
        <span>{additionalLineForOutput}</span>
        <div className="search-tips" >
            {searchTipsArray.map((tip) => {
                return (<div key={tip + Math.random()}> {tip}  </div>)
            })
            }
        </div>
    </div>
);

export default SearchTips;
