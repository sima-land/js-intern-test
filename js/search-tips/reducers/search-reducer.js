import data from "../data/words";

const initialValue = {
  showTips: false,
  wordsTips: [],
  inputSearchValue: ""
};

const findTips = inputValue => {
  if (!inputValue.length) {
    return [];
  }
  let index = 0;
  let wordsTips = [];
  let valueCheck = new RegExp(`^${inputValue}`);
  while (index < data.length && wordsTips.length !== 5) {
    if (valueCheck.test(data[index])) {
      wordsTips.push(data[index]);
    }
    index++;
  }
  return wordsTips;
};

const search = (state = initialValue, action) => {
  switch (action.type) {
    case "INPUT_CHANGE": {
      const wordsTips = findTips(action.payload);
      return {
        ...state,
        wordsTips,
        showTips: Boolean(wordsTips.length),
        inputSearchValue: action.payload
      };
    }
    case "TIPS_CLICK":
      return {
        ...state,
        showTips: false,
        inputSearchValue: action.payload
      };
    default:
      return state;
  }
};

export default search;
