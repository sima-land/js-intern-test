export function findWords(arr, value) {

  if (value.length === 0) {
    return [];
  }

  const regex = new RegExp(`^${value}`, 'gi');
  return arr.filter(item => item.match(regex));
  // arr.filter((word) => word.includes(value));
}