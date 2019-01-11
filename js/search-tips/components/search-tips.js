import React from 'react';

class SearchTips extends React.Component{
    render(){
        var count = 1;
        const words = this.props.words.filter(word => {
            if(count <=5 && word.toLowerCase().includes(this.props.search.toLowerCase()) && this.props.search){
                count++
                return word.toLowerCase().includes(this.props.search.toLowerCase())
            }else{
                return false
            }
        })
        const wordList = words.map(word => <li key={word}>{word}</li>)
        return (
            <div className="search-tips">
                <ul>{wordList}</ul>
            </div>
        );
    }

}

export default SearchTips;