import words from '../data/words';

export const SEARCH = 'SEARCH';

export function search(value) {

  let foundWords = [];
  let i = 0;
  
  if(value.length > 0) {
    while(i <= words.length && foundWords.length < 5) {
      if(words[i] && ~words[i].toLowerCase().indexOf(value.toLowerCase())){
        foundWords.push(words[i]);
      }
      i++;
    }
  }

  return {
    type: SEARCH,
    foundWords
  }
}