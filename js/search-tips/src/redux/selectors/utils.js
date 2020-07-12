export const highlight = (string, substr, handler) => {
  return string.replace(new RegExp(substr, 'gi'), handler);
};
