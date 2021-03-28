export type CamelizeString<T extends PropertyKey> = T extends string
  ? string extends T ? string
  : T extends `${infer F}_${infer R}` ? `${F}${Capitalize<CamelizeString<R>>}`
  : T
  : T;

export type Camelize<T> = {
  [K in keyof T as CamelizeString<K>]: Camelize<T[K]>;
};

type SnakelizeString<T extends PropertyKey> = string extends T ? string
  : T extends `${infer F}${infer U}${infer R}`
    ? `${F extends Uppercase<F> ? "_" : ""}${Lowercase<F>}${U extends
      Uppercase<U> ? "_" : ""}${Lowercase<U>}${SnakelizeString<R>}`
  : T extends `${infer F}${infer R}`
    ? `${F extends Uppercase<F> ? "_" : ""}${Lowercase<F>}${SnakelizeString<R>}`
  : "";

type Snakelize<T> = T extends readonly any[]
  ? { [K in keyof T]: Snakelize<T[K]> }
  : T extends object ? {
    [K in keyof T as SnakelizeString<Extract<K, string>>]: Snakelize<
      T[K]
    >;
  }
  : T;
