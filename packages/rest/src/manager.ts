import type { BigString, Camelize, DiscordUser } from '@discordeno/types'

export function createRestManager (options: CreateRestManagerOptions): RestManager {
  const rest: RestManager = {
    token: options.token,
    baseUrl: options.baseUrl ?? 'https://discord.com/api',

    async getUser(id) {
      
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
}

export interface RestManager {
  /** The bot token which will be used to make requests. */
  token: string
  /**
   * The base url to connect to. If you create a proxy rest, that url would go here.
   * IT SHOULD NOT END WITH A /
   * @default https://discord.com/api
   */
  baseUrl: string
  /**
   * Get a user's data from the api
   * 
   * @param id The user's id
   * @returns {DiscordUser}
   */
  getUser(id: BigString): Promise<Camelize<DiscordUser>>;
}
