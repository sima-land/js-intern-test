import React from 'react';
import SearchTips from '../components/search-tips';

export class SearchForm extends React.Component{
  constructor(props) {
		super(props);
	    this.state = {
	      searchString: '',
	    };

        this.handleChange = this.handleChange.bind(this);      
        this.handleSelect = this.handleSelect.bind(this);      
    }
    
    render() {
    	return (  
	    	<section>
	        <h1>Поисковые подсказки</h1>
	        <input 
	        	className="search-input" 
	        	type="search"  
	        	ref={(input) => { this.searchInput = input; }} 
	        	value={this.state.searchString}			     
				onChange={this.handleChange} />
	        <SearchTips words={this.props.searchTipsWords} onSelect={this.handleSelect}/>
	      </section>)
    }

    handleChange(event){
    	const target = event.target;   
	  	
	    this.setState({
	      'searchString': target.value
	    });
	    this.props.updateSearchTips(target.value);
    }  
    handleSelect(newSearchString){    	
	    this.setState({
	      'searchString': newSearchString
	    });
	    this.searchInput.focus();
	    this.props.updateSearchTips();
    }
    
}

