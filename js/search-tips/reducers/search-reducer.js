import {createAction, handleActions} from 'redux-actions';

export const updateSearchTips = createAction('UPDATE_SEARCH_TIPS', (searchString) => (searchString));

const initialState = {
    searchTipsWords: [],
};

const reducer = handleActions({
    [updateSearchTips.toString()]: (state, action) => {
        const searchString = action.payload;
     	const dictionary = state.words;
     	let tips = [];

        if(searchString && searchString !== ''){
		/*	dictionary.some( word =>{
		   		if( word.toLowerCase().startsWith(searchString.toLowerCase())){
		    		tips.push(word);
		    	}
		    	return tips.length >= 5;
			});*/
			tips = dictionary.reduce( (result, word) => {
				if( word.startsWith(searchString) ){
		    		return [...result ,{word, priority: 1}];
		    	}
				if( word.toLowerCase().startsWith(searchString.toLowerCase()) ){
		    		return [...result ,{word, priority: 2}];
		    	}
		    	return result;
			}, [])
        }
        const sortedTips = tips.sort(tipsComparator).slice(0,5).map(tip=>{return tip.word});
        return {
            ...state, searchTipsWords: sortedTips,
        };
    }}, initialState);  
    
  
export default reducer;

const tipsComparator = (first, second) => {
	if( first.priority === second.priority){
		return first.word.localeCompare(second.word);
	}
	return first.priority - second.priority;	
}