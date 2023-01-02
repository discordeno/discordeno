/* eslint-disable @typescript-eslint/restrict-template-expressions */
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, CreateMessageOptions, DiscordCreateMessage, DiscordMessage, DiscordUser, GetMessagesOptions } from '@discordeno/types'
import { camelize, delay } from '@discordeno/utils'
import type { InvalidRequestBucket } from './invalidBucket.js'
import { createInvalidRequestBucket } from './invalidBucket.js'
import { Queue } from './queue.js'

// TODO: make dynamic based on package.json file
const version = '18.0.0-alpha.1'

export function createRestManager (options: CreateRestManagerOptions): RestManager {
  const rest: RestManager = {
    token: options.token,
    version: options.version ?? 10,
    baseUrl: options.baseUrl ?? 'https://discord.com/api',
    maxRetryCount: Infinity,
    globallyRateLimited: false,
    processingRateLimitedPaths: false,
    queues: new Map(),
    rateLimitedPaths: new Map(),
    invalidBucket: createInvalidRequestBucket({}),

    routes: {
      // Channel Endpoints
      channels: {
        message: (channelId, messageId) => {
          return `/channels/${channelId}/messages/${messageId}`
        },

        messages: (channelId, options?: GetMessagesOptions) => {
          const url = `/channels/${channelId}/messages?`

          if (options) {
            // if (isGetMessagesAfter(options) && options.after) {
            //   url += `after=${options.after}`
            // }
            // if (isGetMessagesBefore(options) && options.before) {
            //   url += `&before=${options.before}`
            // }
            // if (isGetMessagesAround(options) && options.around) {
            //   url += `&around=${options.around}`
            // }
            // if (isGetMessagesLimit(options) && options.limit) {
            //   url += `&limit=${options.limit}`
            // }
          }

          return url
        }
      },

      // User endpoints
      user (userId: BigString) {
        return `/users/${userId}`
      }

    },

    checkRateLimits (url) {
      const ratelimited = rest.rateLimitedPaths.get(url)
      const global = rest.rateLimitedPaths.get('global')
      const now = Date.now()

      if (ratelimited && now < ratelimited.resetTimestamp) {
        return ratelimited.resetTimestamp - now
      }

      if (global && now < global.resetTimestamp) {
        return global.resetTimestamp - now
      }

      return false
    },

    createRequest (options) {
      const headers: Record<string, string> = {
        'user-agent': `DiscordBot (https://github.com/discordeno/discordeno, v${version})`
      }

      if (!options.unauthorized) headers.authorization = `Bot ${rest.token}`

      // SOMETIMES SPECIAL HEADERS (E.G. CUSTOM AUTHORIZATION) NEED TO BE USED
      if (options.headers) {
        for (const key in options.headers) {
          headers[key.toLowerCase()] = options.headers[key]
        }
      }

      // GET METHODS SHOULD NOT HAVE A BODY
      if (options.method === 'GET') {
        options.body = undefined
      }

      // IF A REASON IS PROVIDED ENCODE IT IN HEADERS
      if (options.body?.reason) {
        headers['X-Audit-Log-Reason'] = encodeURIComponent(
          options.body.reason as string
        )
        options.body.reason = undefined
      }

      if (options.body && !['GET', 'DELETE'].includes(options.method)) {
        headers['Content-Type'] = 'application/json'
      }

      return {
        headers,
        body: (options.body?.file ?? JSON.stringify(options.body)) as
      | FormData
      | string,
        method: options.method
      }
    },

    processRateLimitedPaths (): void {
      const now = Date.now()

      for (const [key, value] of rest.rateLimitedPaths.entries()) {
      //   rest.debug(
      // `[REST - processRateLimitedPaths] Running for of loop. ${
      //   value.resetTimestamp - now
      // }`
      //   )
        // If the time has not reached cancel
        if (value.resetTimestamp > now) continue

        // Rate limit is over, delete the rate limiter
        rest.rateLimitedPaths.delete(key)
        // If it was global, also mark the global value as false
        if (key === 'global') rest.globallyRateLimited = false
      }

      // ALL PATHS ARE CLEARED CAN CANCEL OUT!
      if (rest.rateLimitedPaths.size === 0) {
        rest.processingRateLimitedPaths = false
      } else {
        rest.processingRateLimitedPaths = true
        // RECHECK IN 1 SECOND
        setTimeout(() => {
          // rest.debug('[REST - processRateLimitedPaths] Running setTimeout.')
          rest.processRateLimitedPaths()
        }, 1000)
      }
    },

    /** Processes the rate limit headers and determines if it needs to be rate limited and returns the bucket id if available */
    processHeaders (url: string, headers: Headers): string | undefined {
      let rateLimited = false

      // GET ALL NECESSARY HEADERS
      const remaining = headers.get('x-ratelimit-remaining')
      const retryAfter = headers.get('x-ratelimit-reset-after')
      const reset = Date.now() + Number(retryAfter) * 1000
      const global = headers.get('x-ratelimit-global')
      // undefined override null needed for typings
      const bucketId = headers.get('x-ratelimit-bucket') ?? undefined

      rest.queues.get(url)?.handleCompletedRequest({
        remaining: Number(remaining),
        interval: Number(retryAfter) * 1000,
        max: Number(headers.get('x-ratelimit-limit'))
      })

      // IF THERE IS NO REMAINING RATE LIMIT, MARK IT AS RATE LIMITED
      if (remaining === '0') {
        rateLimited = true

        // SAVE THE URL AS LIMITED, IMPORTANT FOR NEW REQUESTS BY USER WITHOUT BUCKET
        rest.rateLimitedPaths.set(url, {
          url,
          resetTimestamp: reset,
          bucketId
        })

        // SAVE THE BUCKET AS LIMITED SINCE DIFFERENT URLS MAY SHARE A BUCKET
        if (bucketId) {
          rest.rateLimitedPaths.set(bucketId, {
            url,
            resetTimestamp: reset,
            bucketId
          })
        }
      }

      // IF THERE IS NO REMAINING GLOBAL LIMIT, MARK IT RATE LIMITED GLOBALLY
      if (global) {
        const retryAfter = headers.get('retry-after')
        const globalReset = Date.now() + Number(retryAfter) * 1000
        //   rest.debug(
        // `[REST = Globally Rate Limited] URL: ${url} | Global Rest: ${globalReset}`
        //   )
        rest.globallyRateLimited = true
        rateLimited = true

        setTimeout(() => {
          rest.globallyRateLimited = false
        }, globalReset)

        rest.rateLimitedPaths.set('global', {
          url: 'global',
          resetTimestamp: globalReset,
          bucketId
        })

        if (bucketId) {
          rest.rateLimitedPaths.set(bucketId, {
            url: 'global',
            resetTimestamp: globalReset,
            bucketId
          })
        }
      }

      if (rateLimited && !rest.processingRateLimitedPaths) {
        rest.processRateLimitedPaths()
      }
      return rateLimited ? bucketId : undefined
    },

    async sendRequest (options) {
      // console.log('sending request', options.url, rest.createRequest({ method: options.method, url: options.url, body: options.body }))
      const response = await fetch(
        options.url,
        rest.createRequest({ method: options.method, url: options.url, body: options.body })
      )

      // Set the bucket id if it was available on the headers
      const bucketId = rest.processHeaders(rest.simplifyUrl(options.url, options.method), response.headers)
      if (bucketId) options.bucketId = bucketId

      if (response.status < 200 || response.status >= 400) {
        // If NOT rate limited remove from queue
        if (response.status === 429) {
          // Too many attempts, get rid of request from queue.
          if (options.retryCount++ >= rest.maxRetryCount) {
            // rest.debug(`[REST - RetriesMaxed] ${JSON.stringify(options)}`)
            // Remove item from queue to prevent retry
            return options.reject?.({
              ok: false,
              status: response.status,
              error:
              'The options was rate limited and it maxed out the retries limit.'
            })
          }

          // Rate limited, add back to queue
          rest.invalidBucket.handleCompletedRequest(
            response.status,
            response.headers.get('X-RateLimit-Scope') === 'shared'
          )

          const resetAfter = response.headers.get('x-ratelimit-reset-after')
          if (resetAfter) await delay(Number(resetAfter) * 1000)

          return await options.retryRequest?.(options)
        }
      }

      options.resolve(await response.json())
    },

    // Credits: github.com/abalabahaha/eris lib/rest/RequestHandler.js#L397
    // Modified for our use-case
    simplifyUrl (url, method) {
      let route = url
        .replace(/\/([a-z-]+)\/(?:[0-9]{17,19})/g, function (match, p: string) {
          return ['channels', 'guilds'].includes(p) ? match : `/${p}/x`
        })
        .replace(/\/reactions\/[^/]+/g, '/reactions/x')

      // GENERAL /reactions and /reactions/emoji/@me share the buckets
      if (route.includes('/reactions')) {
        route = route.substring(0, route.indexOf('/reactions') + '/reactions'.length)
      }

      // Delete Message endpoint has its own rate limit
      if (method === 'DELETE' && route.endsWith('/messages/x')) {
        route = method + route
      }

      return route
    },

    processRequest (request: SendRequestOptions) {
      const route = request.url.substring(request.url.indexOf('api/'))
      const parts = route.split('/')
      // Remove the api/
      parts.shift()
      // Removes the /v#/
      if (parts[0]?.startsWith('v')) parts.shift()
      // Set the full url to discord api in case it was recieved in a proxy rest
      request.url = `${rest.baseUrl}/v${rest.version}/${parts.join('/')}`

      const url = rest.simplifyUrl(request.url, request.method)
      const queue = rest.queues.get(url)

      if (queue !== undefined) {
        queue.makeRequest(request)
      } else {
        // CREATES A NEW QUEUE
        const bucketQueue = new Queue(rest, { url })
        // Add request to queue
        bucketQueue.makeRequest(request)
        // Save queue
        rest.queues.set(url, bucketQueue)
      }
    },

    async makeRequest (method, url, body) {
      return await new Promise((resolve, reject) => {
        rest.processRequest({
          url,
          method,
          body,
          retryCount: 0,
          retryRequest: async function (options: SendRequestOptions) {
            // TODO: should change to reprocess queue item
            await rest.sendRequest(options)
          },
          resolve,
          reject
        })
      })
    },

    async get<T = Record<string, unknown>>(url: string) {
      return camelize(await rest.makeRequest('GET', url)) as Camelize<T>
    },

    async post<T = Record<string, unknown>> (url: string, body?: Record<string, any>) {
      return camelize(await rest.makeRequest('POST', url, body)) as Camelize<T>
    },

    async getUser (id) {
      return await rest.get<DiscordUser>(rest.routes.user(id))
    },

    async sendMessage (channelId: BigString, options: CreateMessageOptions) {
      const result = await rest.post<DiscordMessage>(
        rest.routes.channels.messages(channelId),
        {
          content: options.content
          // TODO: other options
        } as DiscordCreateMessage
      )

      return TRANSFORMERS.message(result)
    }
  }

  return rest
}

export interface CreateRestManagerOptions {
  /** The bot token which will be used to make requests. */
  token: string
  /**
   * The base url to connect to. If you create a proxy rest, that url would go here.
   * IT SHOULD NOT END WITH A /
   * @default https://discord.com/api
   */
  baseUrl?: string
  /**
   * The api versions which can be used to make requests.
   * @default 10
   */
  version?: ApiVersions
}

export interface RestManager {
  /** The bot token which will be used to make requests. */
  token: string
  /** The api version to use when making requests. Only the latest supported version will be tested. */
  version: ApiVersions
  /**
   * The base url to connect to. If you create a proxy rest, that url would go here.
   * IT SHOULD NOT END WITH A /
   * @default https://discord.com/api
   */
  baseUrl: string
  /** The maximum amount of times a request should be retried. Defaults to Infinity */
  maxRetryCount: number
  /** Whether or not the manager is rate limited globally across all requests. Defaults to false. */
  globallyRateLimited: boolean
  /** Whether or not the rate limited paths are being processed to allow requests to be made once time is up. Defaults to false. */
  processingRateLimitedPaths: boolean
  /** The queues that hold all the requests to be processed. */
  queues: Map<string, Queue>
  /** The paths that are currently rate limited. */
  rateLimitedPaths: Map<string, RestRateLimitedPath>
  /** The bucket for handling any invalid requests.  */
  invalidBucket: InvalidRequestBucket
  /** The routes that are available for this manager. */
  routes: {
    /** A specific user route. */
    user: (id: BigString) => string
    /** Routes for channel related endpoints. */
    channels: {
      /** Route for a specific message */
      message: (channelId: BigString, id: BigString) => string
      /** Route for handling non-specific messages. */
      messages: (channelId: BigString, options?: GetMessagesOptions) => string
    }
  }
  /** Check the rate limits for a url or a bucket. */
  checkRateLimits: (url: string) => number | false
  /** Creates the request body and headers that are necessary to send a request. Will handle different types of methods and everything necessary for discord. */
  createRequest: (options: CreateRequestBodyOptions) => RequestBody
  /** This will create a infinite loop running in 1 seconds using tail recursion to keep rate limits clean. When a rate limit resets, this will remove it so the queue can proceed. */
  processRateLimitedPaths: () => void
  /** Processes the rate limit headers and determines if it needs to be rate limited and returns the bucket id if available */
  processHeaders: (url: string, headers: Headers) => string | undefined
  /** Sends a request to the api. */
  sendRequest: (options: SendRequestOptions) => Promise<void>
  /** Split a url to separate rate limit buckets based on major/minor parameters. */
  simplifyUrl: (url: string, method: RequestMethods) => string
  /** Make a request to be sent to the api. */
  makeRequest: <T = unknown>(method: RequestMethods, url: string, body?: Record<string, any>) => Promise<T>
  /** Takes a request and processes it into a queue. */
  processRequest: (request: SendRequestOptions) => void
  /** Make a get request to the api */
  get: <T = Record<string, unknown>>(url: string) => Promise<Camelize<T>>
  /** Make a post request to the api. */
  post: <T = Record<string, unknown>>(url: string, body?: Record<string, any>) => Promise<Camelize<T>>
  /**
   * Get a user's data from the api
   *
   * @param id The user's id
   * @returns {Camelize<DiscordUser>}
   */
  getUser: (id: BigString) => Promise<Camelize<DiscordUser>>
  /**
     * Sends a message to a channel.
     *
     * @param channelId - The ID of the channel to send the message in.
     * @param options - The parameters for the creation of the message.
     * @returns An instance of the created {@link DiscordMessage}.
     *
     * @remarks
     * Requires that the bot user be able to see the contents of the channel the message is to be sent in.
     *
     * If sending a message to a guild channel:
     * - Requires the `SEND_MESSAGES` permission.
     *
     * If sending a TTS message:
     * - Requires the `SEND_TTS_MESSAGES` permission.
     *
     * If sending a message as a reply to another message:
     * - Requires the `READ_MESSAGE_HISTORY` permission.
     * - The message being replied to cannot be a system message.
     *
     * ⚠️ The maximum size of a request (accounting for any attachments and message content) for bot users is _8 MiB_.
     *
     * Fires a _Message Create_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#create-message}
     */
  sendMessage: (channelId: BigString, options: CreateMessageOptions) => Promise<Camelize<DiscordMessage>>
}

export type RequestMethods = 'GET' | 'POST' | 'DELETE'
export type ApiVersions = 9 | 10

export interface CreateRequestBodyOptions {
  headers?: Record<string, string>
  method: RequestMethods
  body?: Record<string, unknown>
  unauthorized?: boolean
  url?: string
}

export interface RequestBody {
  headers: Record<string, string>
  body: string | FormData
  method: RequestMethods
}

export interface SendRequestOptions {
  /** The url to send the request to. */
  url: string
  /** The method to use when sending the request. */
  method: RequestMethods
  /** The body to be sent in the request. */
  body?: Record<string, any>
  /** The amount of times this request has been retried. */
  retryCount: number
  /** Handler to retry a request should it be rate limited. */
  retryRequest?: (options: SendRequestOptions) => Promise<void>
  /** Resolve handler when a request succeeds. */
  resolve: (value: any | PromiseLike<any>) => void
  /** Reject handler when a request fails. */
  reject: (reason?: any) => void
  /** If this request has a bucket id which it falls under for rate limit */
  bucketId?: string
}

export interface RestRateLimitedPath {
  url: string
  resetTimestamp: number
  bucketId?: string
}
