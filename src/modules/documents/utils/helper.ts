import { format } from 'date-fns-tz';
import { de } from 'date-fns/locale';

const timeZone = 'Europe/Berlin';

export function isDate(date: string): boolean {
  return !isNaN(Date.parse(date));
}

export function formatDate(dateUtcStr: string, pattern = 'd. MMMM yyyy'): string {
  if (!isDate(dateUtcStr)) {
    return '';
  }
  const dateUtc = new Date(dateUtcStr);
  return format(dateUtc, pattern, { timeZone, locale: de });
}
