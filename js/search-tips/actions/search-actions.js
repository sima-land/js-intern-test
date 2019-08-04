export const onInputChange = value => {
  return {
    type: "INPUT_CHANGE",
    payload: value
  };
};

export const onTipClick = tipsText => {
  return {
    type: "TIPS_CLICK",
    payload: tipsText
  };
};
