import React from 'react';

const SearchTips = ({hints}) => {

    const elements = hints.map((item)=>{
        return (
            <span>{item}<br/></span>
        )
    })
    return (
        <div className="search-tips">
            { elements }
        </div>
    )

};

export default SearchTips;
