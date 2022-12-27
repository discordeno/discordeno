/* eslint-disable @typescript-eslint/restrict-template-expressions */
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordUser } from '@discordeno/types'

// TODO: make dynamic based on package.json file
const version = '18.0.0-alpha.1'

export function createRestManager (options: CreateRestManagerOptions): RestManager {
  const rest: RestManager = {
    token: options.token,
    version: options.version ?? 10,
    baseUrl: options.baseUrl ?? 'https://discord.com/api',

    routes: {
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

      return {
        headers,
        body: (options.body?.file ?? JSON.stringify(options.body)) as
      | FormData
      | string,
        method: options.method
      }
    },

    async makeRequest (method, url) {
      return await fetch(`${rest.baseUrl}/v${rest.version}/${url}`, rest.createRequest({ method, url })).then(async res => await res.json())
    },

    async get (url) {
      return await rest.makeRequest('GET', url)
    },

    async getUser (id) {
      const result = await rest.get<DiscordUser>(rest.routes.user(id))
      return TRANSFORMERS.user(result)
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
  }
  /** Creates the request body and headers that are necessary to send a request. Will handle different types of methods and everything necessary for discord. */
  createRequest: (options: CreateRequestBodyOptions) => RequestBody
  /** Make a request to the api. */
  makeRequest: <T = unknown>(method: RequestMethods, url: string) => Promise<T>
  /** Make a get request to the api */
  get: <T = unknown>(url: string) => Promise<T>
  /**
   * Get a user's data from the api
   *
   * @param id The user's id
   * @returns {DiscordUser}
   */
  getUser: (id: BigString) => Promise<Camelize<DiscordUser>>
}

export type RequestMethods = 'GET'
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
