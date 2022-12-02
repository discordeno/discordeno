import { FileContent } from '@discordeno/types'
import {
  API_VERSION,
  baseEndpoints,
  BASE_URL,
  encode
} from '@discordeno/utils'
import {
  RequestMethod,
  RestRequestRejection,
  RestRequestResponse
} from './rest.js'
import { RestManager } from './restManager.js'

export async function runMethod<T = any> (
  rest: RestManager,
  method: RequestMethod,
  route: string,
  body?: any,
  options?: {
    retryCount?: number
    bucketId?: string
    headers?: Record<string, string>
  }
): Promise<T> {
  rest.debug(
    `[REST - RequestCreate] Method: ${method} | URL: ${route} | Retry Count: ${
      options?.retryCount ?? 0
    } | Bucket ID: ${options?.bucketId ?? 'N/A'} | Body: ${JSON.stringify(
      body
    )}`
  )

  const errorStack = new Error('Location:')
  Error.captureStackTrace(errorStack)

  // For proxies we don't need to do any of the legwork so we just forward the request
  if (!baseEndpoints.BASE_URL.startsWith(BASE_URL) && route[0] === '/') {
    // Special handling for sending blobs across http to proxy
    if (body?.file) {
      if (!Array.isArray(body.file)) {
        body.file = [body.file]
      }
      // convert blobs to string before sending to proxy
      body.file = await Promise.all(
        body.file.map(async (f: FileContent) => {
          const url = encode(await f.blob.arrayBuffer())

          return { name: f.name, blob: `data:${f.blob.type};base64,${url}` }
        })
      )
    }

    const headers: HeadersInit = {
      Authorization: rest.secretKey
    }
    if (body !== undefined) {
      headers['Content-Type'] = 'application/json'
    }
    const result = await fetch(`${baseEndpoints.BASE_URL}${route}`, {
      body: body ? JSON.stringify(body) : undefined,
      headers,
      method
    })

    if (!result.ok) {
      const err: RestRequestRejection = await result.json().catch(() => {})
      // Legacy Handling to not break old code or when body is missing
      if (!err?.body) {
        throw new Error(
          `Error: ${(err as unknown as Error).message ?? result.statusText}`
        )
      }
      throw rest.convertRestError(errorStack, err)
    }

    return result.status !== 204 ? await result.json() : undefined
  }

  // No proxy so we need to handle all rate limiting and such
  return await new Promise((resolve, reject) => {
    rest.processRequest(
      rest,
      {
        url: route[0] === '/' ? `${BASE_URL}/v${API_VERSION}${route}` : route,
        method,
        reject: (data: RestRequestRejection) => {
          const restError = rest.convertRestError(errorStack, data)
          reject(restError)
        },
        respond: (data: RestRequestResponse) =>
          resolve(
            data.status !== 204
              ? JSON.parse(data.body ?? '{}')
              : (undefined as unknown as T)
          )
      },
      {
        bucketId: options?.bucketId,
        body: body as Record<string, unknown> | undefined,
        retryCount: options?.retryCount ?? 0,
        headers: options?.headers
      }
    )
  })
}
