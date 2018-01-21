import React from 'react';
import SearchTips from '../components/search-tips';
import { Grid, Row, Col, FormControl, ControlLabel } from 'react-bootstrap';

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
    	<Grid>
	    	<Row className="show-grid">
				<Col sm={6} smOffset={3}>
					<section>
				        <ControlLabel>Поисковые подсказки</ControlLabel>
				        <FormControl 
				        	className="search-input" 
				        	type="search"  
				        	inputRef={(input) => { this.searchInput = input; }} 
				        	value={this.state.searchString}			     
							onChange={this.handleChange} />
				        <SearchTips words={this.props.searchTipsWords} onSelect={this.handleSelect}/>
			     	</section>
				</Col>			
			</Row>	    	
	    </Grid>)
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

