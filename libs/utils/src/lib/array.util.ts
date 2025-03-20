/**
 * @description Check if the array is empty
 * @param array The array to check
 * @returns boolean true if the array is empty, false otherwise
 */
export function isEmptyArray(array: any[]): boolean {
  return !array || array.length === 0;
}
