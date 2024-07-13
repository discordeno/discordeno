export type OptionalizeAux<T extends object> = Id<
  {
    [K in KeysWithUndefined<T>]?: Optionalize<T[K]>
  } & {
    [K in Exclude<keyof T, KeysWithUndefined<T>>]: T[K] extends ObjectLiteral ? Optionalize<T[K]> : T[K]
  }
>

/**
 * Makes all of properties in T optional when they're null | undefined
 * it is recursive
 */
export type Optionalize<T> = T extends object
  ? T extends unknown[]
    ? number extends T['length']
      ? T[number] extends object
        ? OptionalizeAux<T[number]>[]
        : T
      : Partial<T>
    : OptionalizeAux<T>
  : T

export type KeysWithUndefined<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : null extends T[K] ? K : never
}[keyof T]

/**
 * alternative to 'object' or '{}'
 * @example:
 * export const o: ObjectLiteral = [] as object; // error
 * export const o: object = []; // no error
 */
export type ObjectLiteral<T = unknown> = {
  [K in PropertyKey]: T
}

/**
 * object identity type
 */
export type Id<T> = T extends infer U
  ? {
      [K in keyof U]: U[K]
    }
  : never

/** Array with no utilty methods, aka Object.create(null) */
export interface ArrayWithNoPrototype<T> {
  [index: number]: T | ArrayWithNoPrototype<T>
}

/**
 * Allows any type but T
 * it is recursive
 * @example
 * export type RequestData = Record<string, AnythingBut<bigint>>;
 */
export type AnythingBut<T> = Exclude<
  | Primitive
  | {
      [K in PropertyKey]: AnythingBut<T>
    }
  | ArrayWithNoPrototype<
      | Primitive
      | {
          [K in PropertyKey]: AnythingBut<T>
        }
    >,
  T
>

/** Non object primitives */
export type Primitive = string | number | symbol | bigint | boolean | undefined | null
//  | object <- don't make object a primitive
