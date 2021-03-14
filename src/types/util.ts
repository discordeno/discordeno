export type CamelizeString<T extends PropertyKey> = T extends string
  ? string extends T ? string
  : T extends `${infer F}_${infer R}`
    ? `${F}${T extends `${infer F}_id` ? Uppercase<R>
      : Capitalize<CamelizeString<R>>}`
  : T
  : T;

// deno-fmt-ignore
export type Camelize<T> = { [K in keyof T as CamelizeString<K>]: T[K] };

export type SnakizeString<T extends PropertyKey> = T extends
  `${infer F}${infer R}`
  ? `${F extends Capitalize<F> ? "_" : ""}${Lowercase<F>}${SnakizeString<R>}`
  : T;

// deno-fmt-ignore
export type Snakize<T> = { [K in keyof T as SnakizeString<K>]: T[K] };
