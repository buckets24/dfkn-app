import { useCallback, useEffect, useState } from 'react';

/**
 * This hook makes it super easy to utilize media queries in your component logic.
 * (see https://usehooks.com/ for more details and examples)
 *
 * @param queries array of media queries
 * @param values array of corresponding values
 * @param defaultValue
 * @returns {*}
 */
export function useMedia<R extends any>(queries: string[], values: R[], defaultValue?: R): R {
  // Array containing a media query list for each query
  // for the gatsby ssr build time the 'window' object is not available
  const mediaQueryLists = typeof window !== 'undefined' ? queries.map((q: string) => window.matchMedia(q)) : [];

  // Function that gets value based on matching media query
  const getValue = useCallback(() => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    // Return related value or defaultValue if none
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  }, [mediaQueryLists, values, defaultValue]);

  // State and setter for matched value
  const [value, setValue] = useState(getValue());

  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue());
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach((mql) => mql.addListener(handler));
      // Remove listeners on cleanup
      return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
    },

    [mediaQueryLists, getValue] // Empty array ensures effect is only run on mount and unmount
  );

  return value as any;
}
