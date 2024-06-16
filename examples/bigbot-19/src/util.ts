import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// This is a "polyfill" for the Promise.withResolves, while node 22 does support it, node 18 does not and this template does support node 18
export function promiseWithResolvers<T>(): PromiseWithResolvers<T> {
  let resolve!: (data: T | PromiseLike<T>) => void
  let reject!: (reason?: any) => void
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })

  return { promise, resolve, reject }
}

export function getDirnameFromFileUrl(url: string): string {
  return dirname(fileURLToPath(url))
}

export interface PromiseWithResolvers<T> {
  promise: Promise<T>
  resolve: (data: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}
