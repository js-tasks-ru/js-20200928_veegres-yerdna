/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let resultArr = [...arr];
  let collator = new Intl.Collator("ru", {
    sensitivity: "variant",
    caseFirst: "upper",
    localeMatcher: "best fit"
  });

  function compare(a, b) {
    return a.localeCompare(b); //collator.compare(a, b);
  }

  return param === 'asc' ? resultArr.sort(compare) : resultArr.sort(compare).reverse();
}
