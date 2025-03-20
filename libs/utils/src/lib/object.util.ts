/**
 * @description Check if an object is empty
 * @param value value to check
 * @returns boolean true if the object is empty, false otherwise
 */
export function isObject(value: any) {
  return value !== null && typeof value === 'object';
}
