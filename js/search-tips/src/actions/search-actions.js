const searchAction = (userSearch) => {
    console.log(userSearch);
    return{
        type: 'SEARCH',
        searchLetters: userSearch
    }
    
}

export default searchAction