/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const resultArr = [...arr];
  const collator = new Intl.Collator('ru', {caseFirst: "upper"});

  function compare(a, b) {
    return collator.compare(a, b); //a.localeCompare(b);
  }

  return param === 'asc' ? resultArr.sort(compare) : resultArr.sort(compare).reverse();
}
