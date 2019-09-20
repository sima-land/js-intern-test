import words from '../data/words';

export const SEARCH = 'SEARCH';

export function search(value) {

  const searchWd = [];
  
  if(value.length > 0) {

    const regexp = new RegExp(`^${value}`, 'i');  

    for(let i = 0; i <= words.length && searchWd.length < 5; i++) {

      if(words[i] && words[i].match(regexp)){

        searchWd.push(words[i]);
      }
    }
  }

  return {
    type: SEARCH,
    searchWd
  }
}