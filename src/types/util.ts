export type CamelizeString<T extends PropertyKey> = T extends string
  ? string extends T ? string
  : T extends `${infer F}_${infer R}`
    ? `${F}${T extends `${infer F}_id` ? Uppercase<R>
      : Capitalize<CamelizeString<R>>}`
  : T
  : T;

export type Camelize<T> = { [K in keyof T as CamelizeString<K>]: T[K] }
