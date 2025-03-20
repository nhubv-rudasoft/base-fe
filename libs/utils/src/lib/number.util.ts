/**
 * @description format a number to a currency string with a specified locale
 * @param number number to format
 * @param locale locale to use for formatting
 * @param currency currency to use for formatting
 * @returns string formatted currency string
 */

export function formatCurrency(number: number, locale = 'en-US', currency = 'USD'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);
}
