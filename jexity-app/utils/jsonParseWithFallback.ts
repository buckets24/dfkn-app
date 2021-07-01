export type JSONParse = typeof JSON.parse;

// eslint-disable-next-line @typescript-eslint/ban-types
export const jsonParseWithFallback = (json: string | null | undefined, fallback = {}): ReturnType<JSONParse> | {} => {
  /**
   * Maybe we should add type guards
   */

  try {
    if (!json) {
      return fallback;
    }
    return JSON.parse(json);
  } catch (e) {
    return fallback;
  }
};
