/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (obj) {
    const resultObj = {};
    const mapForInvert = new Map(Object.entries(obj));
    mapForInvert.forEach((value, key) => resultObj[value] = key);
    return resultObj;
  }
  return obj;
}
