import React from 'react';

const SearchTips = (props) => {
    console.log(props)
    let matchingArray = []
    var expr = new RegExp(`${props.store.searchReducer.request}`, 'ig');
    for(var i=0; i < props.store.dataReducer.length; i++){
        if(expr.test(props.store.dataReducer[i])){
            matchingArray.push(props.store.dataReducer[i])
        }
        if(matchingArray.length > 4){
            break
        }
    }
    console.log(matchingArray)
    if(props.store.searchReducer.request == ""){
        matchingArray = []
    }
    function makeRender(){
         return matchingArray.map(function(item){
            return <div>{item}</div>
        })
    }
    return(
        <div className="search-tips">
            {makeRender()}
        </div>
    );
}
export default SearchTips;
