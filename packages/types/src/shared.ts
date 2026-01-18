export type BigString = bigint | string;

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
export type CamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<CamelCase<U>>}` : S;
export type SnakeCase<S extends string> = S extends `${infer T}${infer U}` ? `${T extends Lowercase<T> ? '' : '_'}${Lowercase<T>}${SnakeCase<U>}` : S;

export type Camelize<T> = T extends any[]
  ? T extends Record<any, any>[]
    ? Camelize<T[number]>[]
    : T
  : T extends Record<any, any>
    ? { [K in keyof T as CamelCase<K & string>]: Camelize<T[K]> }
    : T;

export type Snakelize<T> = T extends any[]
  ? T extends Record<any, any>[]
    ? Snakelize<T[number]>[]
    : T
  : T extends Record<any, any>
    ? { [K in keyof T as SnakeCase<K & string>]: Snakelize<T[K]> }
    : T;

export type PickPartial<T, K extends keyof T> = { [P in keyof T]?: T[P] | undefined } & { [P in K]: T[P] };

// Functions are objects for TS, so we need to check for them explicitly
export type RecursivePartial<T> = T extends object ? (T extends (...args: never[]) => unknown ? T : { [K in keyof T]?: RecursivePartial<T[K]> }) : T;

export type Require<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: T[P] };
