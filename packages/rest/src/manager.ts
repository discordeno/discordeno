/* eslint-disable @typescript-eslint/restrict-template-expressions */
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, CreateMessageOptions, DiscordCreateMessage, DiscordMessage, DiscordUser, GetMessagesOptions } from '@discordeno/types'
import { delay } from '@discordeno/utils'

// TODO: make dynamic based on package.json file
const version = '18.0.0-alpha.1'

export function createRestManager (options: CreateRestManagerOptions): RestManager {
  const rest: RestManager = {
    token: options.token,
    version: options.version ?? 10,
    baseUrl: options.baseUrl ?? 'https://discord.com/api',

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

    async sendRequest (options) {
      const response = await fetch(
        `${rest.baseUrl}/v${rest.version}/${options.url}`,
        rest.createRequest({ method: options.method, url: options.url, body: options.body })
      )

      if (response.status < 200 || response.status >= 400) {
        // If NOT rate limited remove from queue
        if (response.status === 429) {
          // const json = await response.json()

          // TOO MANY ATTEMPTS, GET RID OF REQUEST FROM QUEUE.
          // if (
          //   options.retryCount !== undefined &&
          // options.retryCount++ >= rest.maxRetryCount
          // ) {
          //   rest.debug(`[REST - RetriesMaxed] ${JSON.stringify(options)}`)
          //   // REMOVE ITEM FROM QUEUE TO PREVENT RETRY
          //   options.reject?.({
          //     ok: false,
          //     status: response.status,
          //     error:
          //     'The options was rate limited and it maxed out the retries limit.'
          //   })

          //   // @ts-expect-error Code should never reach here
          //   return
          // }

          // RATE LIMITED, ADD BACK TO QUEUE

          // rest.invalidBucket.handleCompletedRequest(
          //   response.status,
          //   response.headers.get('X-RateLimit-Scope') === 'shared'
          // )

          // console.log('rate limited', json.retry_after, response.headers)
          const resetAfter = response.headers.get('x-ratelimit-reset-after')
          if (resetAfter) await delay(Number(resetAfter) * 1000)
          options.retryCount++

          return await options.retryRequest?.(options)
        }

        // INVALID REQUEST
        const body = JSON.stringify(await response.json())
        return options.reject({
          ok: false,
          status: response.status,
          body
        })
      }

      options.resolve(await response.json())
    },

    async makeRequest (method, url, body) {
      return await new Promise((resolve, reject) => {
        rest.sendRequest({
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

    async get (url) {
      return await rest.makeRequest('GET', url)
    },

    async post (url, body) {
      return await rest.makeRequest('POST', url, body)
    },

    async getUser (id) {
      const result = await rest.get<DiscordUser>(rest.routes.user(id))
      return TRANSFORMERS.user(result)
    },

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
  /** Creates the request body and headers that are necessary to send a request. Will handle different types of methods and everything necessary for discord. */
  createRequest: (options: CreateRequestBodyOptions) => RequestBody
  /** Sends a request to the api. */
  sendRequest: (options: SendRequestOptions) => Promise<void>
  /** Make a request to be sent to the api. */
  makeRequest: <T = unknown>(method: RequestMethods, url: string, body?: Record<string, any>) => Promise<T>
  /** Make a get request to the api */
  get: <T = unknown>(url: string) => Promise<T>
  /** Make a post request to the api. */
  post: <T = unknown>(url: string, body?: Record<string, any>) => Promise<T>
  /**
   * Get a user's data from the api
   *
   * @param id The user's id
   * @returns {Camelize<DiscordUser>}
   */
  getUser: (id: BigString) => Promise<Camelize<DiscordUser>>
  /**
   * Send a message to a channel.
   *
   * @returns {Message}
   */
  sendMessage: (channelId: BigString, options: CreateMessageOptions) => Promise<Camelize<DiscordMessage>>
}

export type RequestMethods = 'GET' | 'POST'
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
}
