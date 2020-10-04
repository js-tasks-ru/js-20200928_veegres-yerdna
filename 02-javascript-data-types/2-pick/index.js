/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const resultObject = {};
  for (const [key, value] of Object.entries(obj)) {
    if (fields.join().includes(key)) {
      resultObject[key] = value;
    }
  }
  return resultObject;
};
