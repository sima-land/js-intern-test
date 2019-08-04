import React from 'react';

const SearchTips = (props) => (
   <div className="search-tips">
     {
       props.words.map((item, i)=><div key={"item"+i} className="tip">{item} </div>)
     }
   </div>
);

export default SearchTips;
