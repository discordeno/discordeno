import { API_VERSION, baseEndpoints, removeTokenPrefix } from '@discordeno/utils'
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createRestManager (options: CreateRestManagerOptions) {
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

    debug: options.debug ?? function (_text: string) { },
    checkRateLimits: options.checkRateLimits ?? checkRateLimits,
    cleanupQueues: options.cleanupQueues ?? cleanupQueues,
    processQueue: options.processQueue ?? processQueue,
    processRateLimitedPaths: options.processRateLimitedPaths ??
      processRateLimitedPaths,
    processRequestHeaders: options.processRequestHeaders ??
      processRequestHeaders,
    processRequest: options.processRequest ?? processRequest,
    createRequestBody: options.createRequestBody ?? createRequestBody,
    runMethod: options.runMethod ?? runMethod,
    simplifyUrl: options.simplifyUrl ?? simplifyUrl,
    processGlobalQueue: options.processGlobalQueue ?? processGlobalQueue,
    convertRestError: options.convertRestError ?? convertRestError,
    sendRequest: options.sendRequest ?? sendRequest,

    fetching: options.fetching ?? function (opts: RestSendRequestOptions) {
      options.debug?.(
        `[REST - fetching] URL: ${opts.url} | ${JSON.stringify(opts)}`
      )
    },
    fetched: options.fetched ?? function (
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
