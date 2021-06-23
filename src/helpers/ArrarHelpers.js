export function isSimilarTwoArr(arr1, arr2) {
  const n = arr1.length;
  const m = arr2.length;

  // If lengths of array are not equal means
  // array are not equal
  if (n !== m) return false;

  // Sort both arrays
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);

  // Linearly compare elements
  for (let i = 0; i < n; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  // If all elements were same.
  return true;
}
