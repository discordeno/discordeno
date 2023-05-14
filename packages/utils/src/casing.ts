import type { Camelize, Snakelize } from '@discordeno/types'

export function camelize<T>(object: T): Camelize<T> {
  if (Array.isArray(object)) {
    return object.map((element) => camelize(element)) as Camelize<T>
  }

  if (typeof object === 'object' && object !== null) {
    const obj = {} as Camelize<T>
    ;(Object.keys(object) as Array<keyof T>).forEach((key) => {
      // @ts-expect-error js hack
      ;(obj[snakeToCamelCase(key)] as Camelize<(T & object)[keyof T]>) = camelize(object[key])
    })
    return obj
  }
  return object as Camelize<T>
}

export function snakelize<T>(object: T): Snakelize<T> {
  if (Array.isArray(object)) {
    return object.map((element) => snakelize(element)) as Snakelize<T>
  }

  if (typeof object === 'object' && object !== null) {
    const obj = {} as Snakelize<T>
    ;(Object.keys(object) as Array<keyof T>).forEach((key) => {
      // @ts-expect-error js hack
      ;(obj[camelToSnakeCase(key)] as Snakelize<(T & object)[keyof T]>) = snakelize(object[key])
    })
    return obj
  }
  return object as Snakelize<T>
}

export function snakeToCamelCase(str: string): string {
  if (!str.includes('_')) return str.toLowerCase()
    let result = ''
    for (let i=0; i<str.length; ++i){
        if (str[i] === '_') {
            result += str[++i].toUpperCase()
            continue
        }
        result += str[i].toLowerCase()
    }
    return result
}

export function camelToSnakeCase(str: string): string {
  let result = ''
    for (let i = 0; i < str.length; ++i){
        if (str[i] >= 'A' && str[i] <= 'Z') {
            if (i === 0) {
                result += str[i].toLowerCase()
                continue
            }
            result += `_${str[i].toLowerCase()}`
            continue
        }
        result += str[i]
    }
    return result
}
