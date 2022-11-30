import { API_VERSION, baseEndpoints } from '../util/constants.js'
import { removeTokenPrefix } from '../util/token.js'
import { checkRateLimits } from './checkRateLimits.js'
import { cleanupQueues } from './cleanupQueues.js'
import { convertRestError } from './convertRestError.js'
import { createInvalidRequestBucket } from './createInvalidRequestBucket.js'
import { QueueBucket } from './createQueueBucket.js'
import { createRequestBody } from './createRequestBody.js'
import { processGlobalQueue } from './processGlobalQueue.js'
import { processQueue } from './processQueue.js'
import { processRateLimitedPaths } from './processRateLimitedPaths.js'
import { processRequest } from './processRequest.js'
import { processRequestHeaders } from './processRequestHeaders.js'
import { RestPayload, RestRateLimitedPath, RestRequest } from './rest.js'
import { runMethod } from './runMethod.js'
import { RestSendRequestOptions, sendRequest } from './sendRequest.js'
import { simplifyUrl } from './simplifyUrl.js'

export function createRestManager(options: CreateRestManagerOptions) {
  const version = options.version || API_VERSION

  if (options.customUrl) {
    baseEndpoints.BASE_URL = `${options.customUrl}/v${version}`
  }

  const rest = {
    invalidBucket: createInvalidRequestBucket({}),
    version,
    token: removeTokenPrefix(options.token),
    maxRetryCount: options.maxRetryCount || 10,
    secretKey: options.secretKey || 'discordeno_best_lib_ever',
    customUrl: options.customUrl || '',
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

    debug: (options.debug != null) || function (_text: string) { },
    checkRateLimits: (options.checkRateLimits != null) || checkRateLimits,
    cleanupQueues: (options.cleanupQueues != null) || cleanupQueues,
    processQueue: (options.processQueue != null) || processQueue,
    processRateLimitedPaths: (options.processRateLimitedPaths != null) ||
      processRateLimitedPaths,
    processRequestHeaders: (options.processRequestHeaders != null) ||
      processRequestHeaders,
    processRequest: (options.processRequest != null) || processRequest,
    createRequestBody: (options.createRequestBody != null) || createRequestBody,
    runMethod: (options.runMethod != null) || runMethod,
    simplifyUrl: (options.simplifyUrl != null) || simplifyUrl,
    processGlobalQueue: (options.processGlobalQueue != null) || processGlobalQueue,
    convertRestError: (options.convertRestError != null) || convertRestError,
    sendRequest: (options.sendRequest != null) || sendRequest,

    fetching: (options.fetching != null) || function (opts: RestSendRequestOptions) {
      options.debug?.(
        `[REST - fetching] URL: ${opts.url} | ${JSON.stringify(opts)}`
      )
    },
    fetched: (options.fetched != null) || function (
      opts: RestSendRequestOptions,
      response: Response
    ) {
      options.debug?.(
        `[REST - fetched] URL: ${opts.url} | Status: ${response.status} ${JSON.stringify(opts)}`
      )
    }
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
  processQueue?: typeof processQueue
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
}

export type RestManager = ReturnType<typeof createRestManager>
