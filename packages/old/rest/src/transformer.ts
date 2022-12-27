import type { Camelize } from '@discordeno/types'

export const snakeToCamelCaseNested = <T>(object: T): Camelize<T> => {
  if (Array.isArray(object)) {
    return object.map((element) =>
      snakeToCamelCaseNested(element)
    ) as Camelize<T>
  }
  if (typeof object === 'object' && object !== null) {
    const obj = {} as Camelize<T>;
    (Object.keys(object) as Array<keyof T>).forEach((key) => {
      // @ts-expect-error
      (obj[
        typeof key === 'string'
          ? key.replace(/([-_][a-z])/gi, ($1) => {
            return $1.toUpperCase().replace('-', '').replace('_', '')
          })
          : key
      ] as Camelize<(T & object)[keyof T]>) = snakeToCamelCaseNested(
        object[key]
      )
    })
    return obj
  }
  return object as Camelize<T>
}
