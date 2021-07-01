/**
 * Converts the value to currency formatted sting.
 * @param val Number to convert
 * @param useLabelEUR Show "EUR" label for currency instead of "€"
 */
export function formatNumToCurrency(val = 0, useLabelEUR = false): string {
  const currencyStr = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val ?? 0);
  return useLabelEUR ? currencyStr.replace('€', 'EUR') : currencyStr;
}

export function formatNumToPercentage(val = 0): string {
  return `${val.toFixed(2).replace('.', ',')}%`;
}
