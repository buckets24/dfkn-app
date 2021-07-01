/**
 * https://stackoverflow.com/questions/49580725/is-it-possible-to-restrict-typescript-object-to-contain-only-properties-defined
 */

type Impossible<K extends keyof any> = {
  [P in K]: never;
};

type NoExtraProperties<T, U extends T = T> = U & Impossible<Exclude<keyof U, keyof T>>;

export default NoExtraProperties;
