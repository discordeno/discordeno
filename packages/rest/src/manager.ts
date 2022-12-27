/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { BigString, Camelize, DiscordUser } from '@discordeno/types'

export function createRestManager (options: CreateRestManagerOptions): RestManager {
  const rest: RestManager = {
    token: options.token,
    version: options.version ?? 10,
    baseUrl: options.baseUrl ?? 'https://discord.com/api',

    routes: {
      // User endpoints
      user: (userId: BigString) => {
        return `/users/${userId}`
      }
    },

    async makeRequest (method, url) {
      return await fetch(`${rest.baseUrl}/v${rest.version}/${url}`, {
        method
      }).then(async res => await res.json())
    },

    async get (url) {
      return await rest.makeRequest('GET', url)
    },

    async getUser (id) {
      // TODO: camelize
      return await rest.get<DiscordUser>(rest.routes.user(id))
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
