import React from 'react';
import { MenuItem } from 'react-bootstrap';


export default class SearchTips extends React.Component{
    
    render() {
    	const words = this.props.words;
    	return (  
	    	<ul className={"search-tips dropdown-menu " + (words.length > 0 ? 'open' : '')}>
			{words.map((word, index) => {
			    return (<MenuItem  onSelect={this.handleClick.bind(this, word)}  key={index}>{word}</MenuItem>);
			})}
	    	</ul>
	    )
    } 

    handleClick(word){
    	this.props.onSelect(word);
    }
    
}

