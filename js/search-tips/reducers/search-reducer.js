import * as types from '../actions/types';

export const search = (state = '', action) => {
  switch (action.type) {
    case types.SEARCH_GOODS:
      return action.payload;
    default:
      return state;
  }
}; /*редьюсер search кладет в redux-стейт значение инпута, которое получает из payload экшена SEARCH_GOODS*/

export const words = (state = {}) => {
  return state;
}; /*редьюсер words нужен для того чтобы положить в redux-стейт исходный массив подсказок.*/

export const filteredGoods = state => {
  let filteredWords = [];
  let words = state.words;
  let query = state.search;

  for (let word of words) {
    if (
      query != '' &&
      word &&
      word.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      filteredWords.push(word);
    }
    if (filteredWords.length > 5) break; //остановим цикл, если массив подсказок достигннет 5
  }
  return filteredWords;
}; /*селектор filteredGoods берет из стейта массив подсказок и поисковый запрос.
Затем перебирает массив подсказок, и проверяет вхождение запроса в каждый элемент массива.
Если есть вхождение, пушит элемент в массив filtredWords. Селектор возвращает урезаный до 5 элементов массив 
filteredWords*/
