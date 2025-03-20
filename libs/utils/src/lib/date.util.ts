import * as moment from 'moment';

/**
 * @description Get the current date in the specified format
 * @param format format to display the current date, e.g. YYYY-MM-DD HH:mm:ss or YYYY-MM-DD
 *
 * @returns string current date in the specified format
 */
export function formatCurrentDate(format = 'YYYY-MM-DD') {
  return moment().format(format);
}
