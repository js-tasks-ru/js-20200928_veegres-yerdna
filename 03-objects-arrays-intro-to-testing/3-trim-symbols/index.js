/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return '';
  }
  if (size === undefined) {
    return string;
  }
  let resultString = '';
  let prevChar;
  let repeatCount = 0;
  for (let i = 0; i < string.length; i++) {
    if (prevChar === string[i]) {
      repeatCount += 1;
    } else {
      repeatCount = 0;
    }
    if (repeatCount < size) {
      resultString += string[i];
    }
    prevChar = string[i];
  }
  return resultString;
}
