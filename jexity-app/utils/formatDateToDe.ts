import { format } from 'date-fns-tz';
import { de } from 'date-fns/locale';

const timeZone = 'Europe/Berlin';

export function isDate(date: string): boolean {
  return !isNaN(Date.parse(date));
}

/**
 * Converts an UTC Date string to the formatted date in  'Europe/Berlin' time zone
 * @param dateUtcStr
 * @param pattern date fns pattern.
 * @returns {string}
 */
const formatDateToDe = (dateUtcStr: string | Date, pattern = 'd. MMM yyyy'): string => {
  if (!isDate(typeof dateUtcStr === 'string' ? dateUtcStr : '')) {
    return '';
  }
  const dateUtc = new Date(dateUtcStr);
  return format(dateUtc, pattern, { timeZone, locale: de });
};

export default formatDateToDe;
