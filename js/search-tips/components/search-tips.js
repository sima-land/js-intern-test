import React from 'react';


export default class SearchTips extends React.Component{
    constructor(props) {
		super(props); 
            
    }
    
    render() {
    	const words = this.props.words;
    	return (  
	    	<div className="search-tips">
			{words.map((word, index) => {
			    return (<div onClick={this.handleClick.bind(this, word)}  key={index}>{word}</div>);
			})}
	    	</div>
	    )
    } 

    handleClick(word){
    	this.props.onSelect(word);
    }
    
}

