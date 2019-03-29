import words from '../data/words';

export const SEARCH = 'SEARCH';

export function search(value) {

  let foundWords = [];
  let i = 0;
  
  if(value.length > 0) {
    const regexp = new RegExp(`^${value}`, 'i');
    while(i <= words.length && foundWords.length < 5) {
      if(words[i] && words[i].match(regexp)){
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