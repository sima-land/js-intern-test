import React from 'react';
import SearchTips from '../components/search-tips';
class SearchForm extends React.Component{
    render(){
        return(
            <section>
                <h1>Поисковые подсказки</h1>
                <input className="search-input" type="search"onChange={this.changAction.bind(this)} value={this.state.value}/>
                <SearchTips {...this.props} />
            </section>
        )
    }
    changAction(val){
        this.props.actions(val.nativeEvent.target.value);
    }
}

export default SearchForm;