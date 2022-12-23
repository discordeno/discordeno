import {
  API_VERSION,
  baseEndpoints,
  getBotIdFromToken,
  removeTokenPrefix
} from '@discordeno/utils'
import { checkRateLimits } from './checkRateLimits.js'
import { cleanupQueues } from './cleanupQueues.js'
import { convertRestError } from './convertRestError.js'
import type { InvalidRequestBucket } from './createInvalidRequestBucket.js'
import { createInvalidRequestBucket } from './createInvalidRequestBucket.js'
import type { QueueBucket } from './createQueueBucket.js'
import { createRequestBody } from './createRequestBody.js'
import * as helpers from './helpers/index.js'
import { processGlobalQueue } from './processGlobalQueue.js'
import { processRateLimitedPaths } from './processRateLimitedPaths.js'
import { processRequest } from './processRequest.js'
import { processRequestHeaders } from './processRequestHeaders.js'
import type {
  RequestMethod,
  RestPayload,
  RestRateLimitedPath,
  RestRequest
} from './rest.js'
import { runMethod } from './runMethod.js'
import type { RestSendRequestOptions } from './sendRequest.js'
import { sendRequest } from './sendRequest.js'
import { simplifyUrl } from './simplifyUrl.js'

export function createRestManager (
  options: CreateRestManagerOptions
): RestManager {
  const version = options.version ?? API_VERSION

  if (options.customUrl !== undefined) {
    baseEndpoints.BASE_URL = `${options.customUrl}/v${version}`
  }

  const rest = {
    invalidBucket: createInvalidRequestBucket({}),
    version,
    token: removeTokenPrefix(options.token),
    maxRetryCount: options.maxRetryCount ?? 10,
    secretKey: options.secretKey ?? 'discordeno_best_lib_ever',
    customUrl: options.customUrl ?? '',
    pathQueues: new Map<string, QueueBucket>(),
    processingQueue: false,
    processingRateLimitedPaths: false,
    globallyRateLimited: false,
    globalQueue: [] as Array<{
      request: RestRequest
      payload: RestPayload
      basicURL: string
      urlToUse: string
    }>,
    globalQueueProcessing: false,
    rateLimitedPaths: new Map<string, RestRateLimitedPath>(),

    debug: options.debug ?? function (_text: string) {},
    checkRateLimits: options.checkRateLimits ?? checkRateLimits,
    cleanupQueues: options.cleanupQueues ?? cleanupQueues,
    processRateLimitedPaths:
      options.processRateLimitedPaths ?? processRateLimitedPaths,
    processRequestHeaders:
      options.processRequestHeaders ?? processRequestHeaders,
    processRequest: options.processRequest ?? processRequest,
    createRequestBody: options.createRequestBody ?? createRequestBody,
    // async runMethod (method: RequestMethod,
    //   route: string,
    //   body?: any,
    //   opts?: {
    //     retryCount?: number
    //     bucketId?: string
    //     headers?: Record<string, string>
    //   }) {
    //   if (options.runMethod) return await options.runMethod(rest, method, route, body, opts)
    //   return await runMethod(rest, method, route, body, opts)
    // },
    simplifyUrl: options.simplifyUrl ?? simplifyUrl,
    processGlobalQueue: options.processGlobalQueue ?? processGlobalQueue,
    convertRestError: options.convertRestError ?? convertRestError,
    sendRequest: options.sendRequest ?? sendRequest,
    fetching:
      options.fetching ??
      function (opts: RestSendRequestOptions) {
        options.debug?.(
          `[REST - fetching] URL: ${opts.url} | ${JSON.stringify(opts)}`
        )
      },
    fetched:
      options.fetched ??
      function (opts: RestSendRequestOptions, response: Response) {
        options.debug?.(
          `[REST - fetched] URL: ${opts.url} | Status: ${
            response.status
          } ${JSON.stringify(opts)}`
        )
      },
    id: options.botId ?? getBotIdFromToken(options.token),
    applicationId:
      options.applicationId ??
      options.botId ??
      getBotIdFromToken(options.token)
  } as unknown as RestManager

  for (const [name, fun] of Object.entries({
    ...helpers,
    ...{ runMethod: options.runMethod ?? runMethod },
    ...(options.helpers ?? {})
  })) {
    // @ts-expect-error dynamically add modified functions
    rest[name] = (...args) => fun(rest, ...args)
  }

  return rest
}

export interface CreateRestManagerOptions {
  token: string
  customUrl?: string
  maxRetryCount?: number
  version?: number
  secretKey?: string
  debug?: (text: string) => unknown
  checkRateLimits?: typeof checkRateLimits
  cleanupQueues?: typeof cleanupQueues
  processRateLimitedPaths?: typeof processRateLimitedPaths
  processRequestHeaders?: typeof processRequestHeaders
  processRequest?: typeof processRequest
  createRequestBody?: typeof createRequestBody
  runMethod?: typeof runMethod
  simplifyUrl?: typeof simplifyUrl
  processGlobalQueue?: typeof processGlobalQueue
  convertRestError?: typeof convertRestError
  sendRequest?: typeof sendRequest
  fetching?: (options: RestSendRequestOptions) => void
  fetched?: (options: RestSendRequestOptions, response: Response) => void
  helpers?: Partial<Helpers>
  applicationId?: bigint
  botId?: bigint
}

export interface RestManager extends FinalHelpers {
  invalidBucket: InvalidRequestBucket
  version: number
  token: string
  maxRetryCount: number
  secretKey: string
  customUrl: string
  pathQueues: Map<string, QueueBucket>
  processingQueue: boolean
  processingRateLimitedPaths: boolean
  globallyRateLimited: boolean
  globalQueue: Array<{
    request: RestRequest
    payload: RestPayload
    basicURL: string
    urlToUse: string
  }>
  globalQueueProcessing: boolean
  rateLimitedPaths: Map<string, RestRateLimitedPath>
  debug: (text: string) => unknown
  checkRateLimits: typeof checkRateLimits
  cleanupQueues: typeof cleanupQueues
  processRateLimitedPaths: typeof processRateLimitedPaths
  processRequestHeaders: typeof processRequestHeaders
  processRequest: typeof processRequest
  createRequestBody: typeof createRequestBody
  runMethod: <T>(
    method: RequestMethod,
    route: string,
    body?: any,
    options?: {
      retryCount?: number
      bucketId?: string
      headers?: Record<string, string>
    }
  ) => Promise<T>
  simplifyUrl: typeof simplifyUrl
  processGlobalQueue: typeof processGlobalQueue
  convertRestError: typeof convertRestError
  sendRequest: typeof sendRequest
  fetching: (options: RestSendRequestOptions) => void
  fetched: (options: RestSendRequestOptions, response: Response) => void
  id: bigint
  applicationId: bigint
}

export const defaultHelpers = { ...helpers }
export type DefaultHelpers = typeof defaultHelpers
export interface Helpers extends DefaultHelpers {} // Use interface for declaration merging

export type RemoveFirstFromTuple<T extends any[]> = T['length'] extends 0
  ? []
  : ((...b: T) => void) extends (a: any, ...b: infer I) => void
      ? I
      : []

export type FinalHelpers = {
  [K in keyof Helpers]: (
    ...args: RemoveFirstFromTuple<Parameters<Helpers[K]>>
  ) => ReturnType<Helpers[K]>;
}
