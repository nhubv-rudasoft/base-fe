/**
 * Check if a string is empty
 * @param str string to check
 * @returns boolean true if the string is empty, false otherwise
 */
export function isEmptyString(str: string): boolean {
  return !str || str.length === 0;
}

/**
 * @description Check if a string is null or empty
 * @param str string to check
 * @returns boolean true if the string is null or empty, false otherwise
 */
export function isNullOrEmptyString(str: string): boolean {
  return !str || str.length === 0;
}

/**
 * Get first letter of a string
 * @param str string to get first letter from
 * @param isUpperCase flag to determine if the first letter should be uppercase
 * @returns string first letter of the string
 */
export function firstLetter(str: string, isUpperCase = false): string {
  return isUpperCase ? str.charAt(0).toUpperCase() : str.charAt(0);
}

/**
 * Get last letter of a string
 * @param str string to get last letter from
 * @param isUpperCase flag to determine if the last letter should be uppercase
 * @returns string last letter of the string
 */
export function lastLetter(str: string, isUpperCase = false): string {
  return isUpperCase ? str.charAt(0).toUpperCase() : str.charAt(0);
}

/**
 * Get first and last letter of a string
 * @param str string to get first and last letter from
 * @param isUpperCase flag to determine if the first and last letter should be uppercase
 * @returns string first and last letter of the string
 */
export function firstAndLastLetter(str: string, isUpperCase = false): string {
  return `${firstLetter(str, isUpperCase)}${lastLetter(str, isUpperCase)}`;
}
