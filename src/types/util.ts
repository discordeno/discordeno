export type CamelCase<T extends PropertyKey> = T extends string
  ? string extends T ? string
  : T extends `${infer F}_${infer R}` ? `${F}${Capitalize<CamelCase<R>>}`
  : T
  : T;

export type CamelCaseProps<T> = {
  [K in keyof T as CamelCase<K>]: CamelCaseProps<T[K]>;
};

export type SnakeCase<T extends PropertyKey> = string extends T ? string
  : T extends `${infer F}${infer U}${infer R}`
    ? `${F extends Uppercase<F> ? "_" : ""}${Lowercase<F>}${U extends
      Uppercase<U> ? "_" : ""}${Lowercase<U>}${SnakeCase<R>}`
  : T extends `${infer F}${infer R}`
    ? `${F extends Uppercase<F> ? "_" : ""}${Lowercase<F>}${SnakeCase<R>}`
  : "";

export type SnakeCaseProps<T> = T extends readonly any[]
  ? { [K in keyof T]: SnakeCaseProps<T[K]> }
  : T extends object ? {
    [K in keyof T as SnakeCase<Extract<K, string>>]: SnakeCaseProps<
      T[K]
    >;
  }
  : T;
