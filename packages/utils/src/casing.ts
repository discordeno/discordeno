import type { Camelize } from '@discordeno/types'

export const camelize = <T>(object: T): Camelize<T> => {
  if (Array.isArray(object)) {
    return object.map((element) => camelize(element)) as Camelize<T>
  }
  if (typeof object === 'object' && object !== null) {
    const obj = {} as Camelize<T>
    ;(Object.keys(object) as Array<keyof T>).forEach((key) => {
      // @ts-expect-error
      ;(obj[typeof key === 'string' ? snakeToCamelCase(key) : key] as Camelize<(T & object)[keyof T]>) = camelize(object[key])
    })
    return obj
  }
  return object as Camelize<T>
}

function snakeToCamelCase(str: string): string {
  if (!str.includes('_')) return str

  let result = ''
  for (let i = 0, len = str.length; i < len; ++i) {
    if (str[i] === '_') {
      result += str[i++].toUpperCase()

      continue
    }

    result += str[i]
  }

  return result
}
