/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const resultArr = [...arr];
  const collator = new Intl.Collator('ru', {caseFirst: "upper"});
  if (param === 'asc') {
    return resultArr.sort((a, b) => collator.compare(a, b));
  } else if (param === 'desc') {
    return resultArr.sort((a, b) => collator.compare(b, a));
  }
  console.error('unknown param');
  return resultArr;
}
