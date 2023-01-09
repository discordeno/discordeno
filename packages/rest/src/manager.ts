import type {
  BigString,
  Camelize,
  CreateGuildChannel,
  CreateGuildEmoji,
  CreateMessageOptions,
  DiscordChannel,
  DiscordCreateGuildChannel,
  DiscordCreateMessage,
  DiscordEditChannelPermissionOverridesOptions,
  DiscordEmoji,
  DiscordGetGatewayBot,
  DiscordInviteMetadata,
  DiscordMessage,
  DiscordModifyChannel,
  DiscordModifyGuildChannelPositions,
  DiscordUser,
  EditChannelPermissionOverridesOptions,
  GetMessagesOptions,
  ModifyChannel,
  ModifyGuildChannelPositions,
  ModifyGuildEmoji
} from '@discordeno/types'
import { ChannelTypes } from '@discordeno/types'
import { calculateBits, camelize, Collection, delay } from '@discordeno/utils'
import type { InvalidRequestBucket } from './invalidBucket.js'
import { createInvalidRequestBucket } from './invalidBucket.js'
import { Queue } from './queue.js'

// TODO: make dynamic based on package.json file
const version = '18.0.0-alpha.1'

export function createRestManager(options: CreateRestManagerOptions): RestManager {
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
      // Miscellaneous Endpoints
      sessionInfo: () => '/gateway/bot',

      // Channel Endpoints
      channels: {
        channel: (channelId) => {
          return `/channels/${channelId}`
        },

        invites: (channelId) => {
          return `/channels/${channelId}/invites`
        },

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
        },

        overwrite: (channelId, overwriteId) => {
          return `/channels/${channelId}/permissions/${overwriteId}`
        },

        typing: (channelId) => {
          return `/channels/${channelId}/typing`
        },
      },

      // Guild Endpoints
      guilds: {
        emoji: (guildId, emojiId) => {
          return `/guilds/${guildId}/emojis/${emojiId}`
        },
        emojis: (guildId) => {
          return `/guilds/${guildId}/emojis`
        },
        channels: (guildId) => {
          return `/guilds/${guildId}/channels`
        },
      },

      // User endpoints
      user(userId: BigString) {
        return `/users/${userId}`
      },
    },

    checkRateLimits(url) {
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

    createRequest(options) {
      const headers: Record<string, string> = {
        'user-agent': `DiscordBot (https://github.com/discordeno/discordeno, v${version})`,
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
        headers['X-Audit-Log-Reason'] = encodeURIComponent(options.body.reason as string)
        options.body.reason = undefined
      }

      if (options.body && !['GET', 'DELETE'].includes(options.method)) {
        headers['Content-Type'] = 'application/json'
      }

      return {
        headers,
        body: (options.body?.file ?? JSON.stringify(options.body)) as FormData | string,
        method: options.method,
      }
    },

    processRateLimitedPaths(): void {
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
    processHeaders(url: string, headers: Headers): string | undefined {
      let rateLimited = false

      // GET ALL NECESSARY HEADERS
      const remaining = headers.get('x-ratelimit-remaining')
      const retryAfter = headers.get('x-ratelimit-reset-after')
      const reset = Date.now() + Number(retryAfter) * 1000
      const global = headers.get('x-ratelimit-global')
      // undefined override null needed for typings
      const bucketId = headers.get('x-ratelimit-bucket') ?? undefined
      const limit = headers.get('x-ratelimit-limit')

      rest.queues.get(url)?.handleCompletedRequest({
        remaining: remaining ? Number(remaining) : undefined,
        interval: retryAfter ? Number(retryAfter) * 1000 : undefined,
        max: limit ? Number(limit) : undefined,
      })

      // IF THERE IS NO REMAINING RATE LIMIT, MARK IT AS RATE LIMITED
      if (remaining === '0') {
        rateLimited = true

        // SAVE THE URL AS LIMITED, IMPORTANT FOR NEW REQUESTS BY USER WITHOUT BUCKET
        rest.rateLimitedPaths.set(url, {
          url,
          resetTimestamp: reset,
          bucketId,
        })

        // SAVE THE BUCKET AS LIMITED SINCE DIFFERENT URLS MAY SHARE A BUCKET
        if (bucketId) {
          rest.rateLimitedPaths.set(bucketId, {
            url,
            resetTimestamp: reset,
            bucketId,
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
          bucketId,
        })

        if (bucketId) {
          rest.rateLimitedPaths.set(bucketId, {
            url: 'global',
            resetTimestamp: globalReset,
            bucketId,
          })
        }
      }

      if (rateLimited && !rest.processingRateLimitedPaths) {
        rest.processRateLimitedPaths()
      }
      return rateLimited ? bucketId : undefined
    },

    async sendRequest(options) {
      // console.log('sending request', options.url, rest.createRequest({ method: options.method, url: options.url, body: options.body }))
      const response = await fetch(options.url, rest.createRequest({ method: options.method, url: options.url, body: options.body }))

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
              error: 'The options was rate limited and it maxed out the retries limit.',
            })
          }

          // Rate limited, add back to queue
          rest.invalidBucket.handleCompletedRequest(response.status, response.headers.get('X-RateLimit-Scope') === 'shared')

          const resetAfter = response.headers.get('x-ratelimit-reset-after')
          if (resetAfter) await delay(Number(resetAfter) * 1000)

          return await options.retryRequest?.(options)
        }
      }

      options.resolve(await response.json())
    },

    // Credits: github.com/abalabahaha/eris lib/rest/RequestHandler.js#L397
    // Modified for our use-case
    simplifyUrl(url, method) {
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

    processRequest(request: SendRequestOptions) {
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

    async makeRequest(method, url, body) {
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
          reject,
        })
      })
    },

    async get<T = Record<string, unknown>>(url: string) {
      return camelize(await rest.makeRequest('GET', url)) as Camelize<T>
    },

    async post<T = Record<string, unknown>>(url: string, body?: Record<string, any>) {
      return camelize(await rest.makeRequest('POST', url, body)) as Camelize<T>
    },

    async delete(url: string, body?: Record<string, any>) {
      return camelize(await rest.makeRequest('DELETE', url, body))
    },

    async patch<T = Record<string, unknown>>(url: string, body?: Record<string, any>) {
      return camelize(await rest.makeRequest('PATCH', url, body)) as Camelize<T>
    },

    async put<T = void>(url: string, body?: Record<string, any>) {
      return camelize(await rest.makeRequest('PUT', url, body)) as Camelize<T>
    },

    channels: {
      async get(id) {
        return await rest.getChannel(id)
      },

      async create(guildId, options) {
        return await rest.createChannel(guildId, options)
      },

      async delete(id, reason) {
        return await rest.deleteChannel(id, reason)
      },

      async edit(id, options) {
        return await rest.editChannel(id, options)
      },

      permissions: {
        async edit(channelId, options) {
          return await rest.editChannelPermissionOverrides(channelId, options)
        },

        async delete(channelId, id) {
          return await rest.deleteChannelPermissionOverride(channelId, id)
        },
      },

      async positions(guildId, channelPositions) {
        return await rest.editChannelPositions(guildId, channelPositions)
      },

      async invites(id) {
        return await rest.getChannelInvites(id)
      },

      async typing(id) {
        return await rest.triggerTypingIndicator(id)
      },
    },

    guilds: {
      async channels(id) {
        return await rest.getChannels(id)
      },
    },

    async getChannel(id) {
      return await rest.get<DiscordChannel>(rest.routes.channels.channel(id))
    },

    async createChannel(guildId, options) {
      return await rest.post<DiscordChannel>(
        rest.routes.guilds.channels(guildId),
        options
          ? ({
              name: options.name,
              topic: options.topic,
              bitrate: options.bitrate,
              user_limit: options.userLimit,
              rate_limit_per_user: options.rateLimitPerUser,
              position: options.position,
              parent_id: options.parentId?.toString(),
              nsfw: options.nsfw,
              permission_overwrites: options?.permissionOverwrites?.map((overwrite) => ({
                id: overwrite.id.toString(),
                type: overwrite.type,
                allow: overwrite.allow ? calculateBits(overwrite.allow) : null,
                deny: overwrite.deny ? calculateBits(overwrite.deny) : null,
              })),
              type: options?.type ?? ChannelTypes.GuildText,
              default_sort_order: options.defaultSortOrder,
              reason: options.reason,
              default_auto_archive_duration: options?.defaultAutoArchiveDuration,
              default_reaction_emoji: options.defaultReactionEmoji
                ? {
                    emoji_id: options.defaultReactionEmoji.emojiId
                      ? options.defaultReactionEmoji.emojiId.toString()
                      : options.defaultReactionEmoji.emojiId,
                    emoji_name: options.defaultReactionEmoji.emojiName,
                  }
                : undefined,

              available_tags: options.availableTags
                ? options.availableTags.map((availableTag) => ({
                    id: availableTag.id.toString(),
                    name: availableTag.name,
                    moderated: availableTag.moderated,
                    emoji_name: availableTag.emojiName,
                    emoji_id: availableTag.emojiId ? availableTag.emojiId.toString() : undefined,
                  }))
                : undefined,
            } as DiscordCreateGuildChannel)
          : {},
      )
    },

    async deleteChannel(channelId, reason) {
      return await rest.delete(rest.routes.channels.channel(channelId), { reason })
    },

    async deleteChannelPermissionOverride(channelId, overwriteId, reason) {
      return await rest.delete(rest.routes.channels.overwrite(channelId, overwriteId), reason ? { reason } : undefined)
    },

    async editChannel(channelId, options) {
      return await rest.patch<DiscordChannel>(rest.routes.channels.channel(channelId), {
        name: options.name,
        topic: options.topic,
        bitrate: options.bitrate,
        user_limit: options.userLimit,
        rate_limit_per_user: options.rateLimitPerUser,
        position: options.position,
        parent_id: options.parentId === null ? null : options.parentId?.toString(),
        nsfw: options.nsfw,
        type: options.type,
        archived: options.archived,
        auto_archive_duration: options.autoArchiveDuration,
        locked: options.locked,
        invitable: options.invitable,
        permission_overwrites: options.permissionOverwrites
          ? options.permissionOverwrites?.map((overwrite) => ({
              id: overwrite.id.toString(),
              type: overwrite.type,
              allow: overwrite.allow ? calculateBits(overwrite.allow) : null,
              deny: overwrite.deny ? calculateBits(overwrite.deny) : null,
            }))
          : undefined,
        available_tags: options.availableTags
          ? options.availableTags.map((availableTag) => ({
              id: availableTag.id,
              name: availableTag.name,
              moderated: availableTag.moderated,
              emoji_id: availableTag.emojiId,
              emoji_name: availableTag.emojiName,
            }))
          : undefined,
        applied_tags: options.appliedTags?.map((appliedTag) => appliedTag.toString()),
        default_reaction_emoji: options.defaultReactionEmoji
          ? {
              emoji_id: options.defaultReactionEmoji.emojiId,
              emoji_name: options.defaultReactionEmoji.emojiName,
            }
          : undefined,
        default_sort_order: options.defaultSortOrder,
        reason: options.reason,
      } as DiscordModifyChannel)
    },

    async editChannelPermissionOverrides(channelId, options) {
      return await rest.put(rest.routes.channels.overwrite(channelId, options.id), {
        allow: options.allow ? calculateBits(options.allow) : '0',
        deny: options.deny ? calculateBits(options.deny) : '0',
        type: options.type,
        reason: options.reason,
      } as DiscordEditChannelPermissionOverridesOptions)
    },

    async editChannelPositions(guildId, channelPositions) {
      return await rest.patch(
        rest.routes.guilds.channels(guildId),
        channelPositions.map((channelPosition) => ({
          id: channelPosition.id.toString(),
          position: channelPosition.position,
          lock_positions: channelPosition.lockPositions,
          parent_id: channelPosition.parentId?.toString(),
        })) as DiscordModifyGuildChannelPositions[],
      )
    },

    async getChannelInvites(channelId) {
      return await rest.get<DiscordInviteMetadata[]>(rest.routes.channels.invites(channelId))
    },

    async getChannels(guildId) {
      return await rest.get<DiscordChannel[]>(rest.routes.guilds.channels(guildId))
    },

    async triggerTypingIndicator(channelId) {
      return await rest.post(rest.routes.channels.typing(channelId))
    },

    async getSessionInfo() {
      return await rest.get<DiscordGetGatewayBot>(rest.routes.sessionInfo())
    },

    async getUser(id) {
      return await rest.get<DiscordUser>(rest.routes.user(id))
    },

    async createEmoji(guildId, options) {
      return await rest.post<DiscordEmoji>(rest.routes.guilds.emojis(guildId), {
        name: options.name,
        image: options.image,
        roles: options.roles?.map((role) => role.toString()),
        reason: options.reason,
      })
    },

    async deleteEmoji(guildId, id, reason) {
      return await rest.delete(rest.routes.guilds.emoji(guildId, id), {
        reason,
      })
    },

    async editEmoji(guildId, id, options) {
      return await rest.patch<DiscordEmoji>(rest.routes.guilds.emoji(guildId, id), {
        name: options.name,
        // NEED TERNARY TO SUPPORT NULL AS VALID

        roles: options.roles?.map((role) => role.toString()),
        reason: options.reason,
      })
    },

    async getEmoji(guildId, emojiId) {
      return await rest.get<DiscordEmoji>(rest.routes.guilds.emoji(guildId, emojiId))
    },

    async getEmojis(guildId) {
      const emojis = await rest.get<DiscordEmoji[]>(rest.routes.guilds.emojis(guildId))

      return new Collection(
        emojis.map((emoji) => {
          return [emoji.id!, emoji]
        }),
      )
    },

    // TODO: make this a util, it does not fetch anything from the api
    getEmojiURL(emojiId, animated = false) {
      return `https://cdn.discordapp.com/emojis/${emojiId}.${animated ? 'gif' : 'png'}`
    },

    async sendMessage(channelId: BigString, options: CreateMessageOptions) {
      return await rest.post<DiscordMessage>(rest.routes.channels.messages(channelId), {
        content: options.content,
        // TODO: other options
      } as DiscordCreateMessage)
    },
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
    /** Route to get a bots session info. */
    sessionInfo: () => string
    /** A specific user route. */
    user: (id: BigString) => string
    /** Routes for channel related endpoints. */
    channels: {
      /** Route for a specific channel. */
      channel: (channelId: BigString) => string
      /** Route for a specific channel's invites. */
      invites: (channelId: BigString) => string
      /** Route for a specific message */
      message: (channelId: BigString, id: BigString) => string
      /** Route for handling non-specific messages. */
      messages: (channelId: BigString, options?: GetMessagesOptions) => string
      /** Route for handling a specific overwrite. */
      overwrite: (channelId: BigString, overwriteId: BigString) => string
      /** Route for handling typing indicators in a channel. */
      typing: (channelId: BigString) => string
    }
    /** Routes for guild related endpoints. */
    guilds: {
      /** Route for handling a specific emoji. */
      emoji: (guildId: BigString, id: BigString) => string
      /** Route for handling non-specific emojis. */
      emojis: (guildId: BigString) => string
      /** Route for handling non-specific channels in a guild */
      channels: (guildId: BigString) => string
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
  get: <T = void>(url: string) => Promise<Camelize<T>>
  /** Make a post request to the api. */
  post: <T = void>(url: string, body?: Record<string, any>) => Promise<Camelize<T>>
  /** Make a put request to the api. */
  put: <T = void>(url: string, body?: Record<string, any>) => Promise<Camelize<T>>
  /** Make a delete request to the api. */
  delete: (url: string, body?: Record<string, any>) => Promise<void>
  /** Make a patch request to the api. */
  patch: <T = void>(url: string, body?: Record<string, any>) => Promise<Camelize<T>>
  /** Helper methods related to channels */
  channels: {
    /**
     * Gets a channel by its ID.
     *
     * @param id - The ID of the channel to get.
     * @returns An instance of {@link DiscordChannel}.
     *
     * @remarks
     * If the channel is a thread, a {@link ThreadMember} object is included in the result.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#get-channel}
     */
    get: (id: BigString) => Promise<Camelize<DiscordChannel>>
    /**
     * Creates a channel within a guild.
     *
     * @param guildId - The ID of the guild to create the channel within.
     * @param options - The parameters for the creation of the channel.
     * @returns An instance of the created {@link DiscordChannel}.
     *
     * @remarks
     * Requires the `MANAGE_CHANNELS` permission.
     *
     * If setting permission overwrites, only the permissions the bot user has in the guild can be allowed or denied.
     *
     * Setting the `MANAGE_ROLES` permission is only possible for guild administrators.
     *
     * Fires a _Channel Create_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/guild#create-guild-channel}
     */
    create: (guildId: BigString, options: CreateGuildChannel) => Promise<Camelize<DiscordChannel>>
    /**
     * Deletes a channel from within a guild.
     *
     * @param channelId - The ID of the channel to delete.
     * @returns An instance of the deleted {@link Channel}.
     *
     * @remarks
     * For community guilds, the _Rules_, _Guidelines_ and _Community Update_ channels cannot be deleted.
     *
     * If the channel is a thread:
     * - Requires the `MANAGE_THREADS` permission.
     *
     * - Fires a _Thread Delete_ gateway event.
     *
     * Otherwise:
     * - Requires the `MANAGE_CHANNELS` permission.
     *
     * - ⚠️ Deleting a category channel does not delete its child channels.
     *   Instead, they will have their `parent_id` property removed, and a `Channel Update` gateway event will fire for each of them.
     *
     * - Fires a _Channel Delete_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#deleteclose-channel}
     */
    delete: (channelId: BigString, reason?: string) => Promise<void>
    /**
     * Edits a channel's settings.
     *
     * @param channelId - The ID of the channel to edit.
     * @param options - The parameters for the edit of the channel.
     * @returns An instance of the edited {@link DiscordChannel}.
     *
     * @remarks
     * If editing a channel of type {@link ChannelTypes.GroupDm}:
     * - Fires a _Channel Update_ gateway event.
     *
     * If editing a thread channel:
     * - Requires the `MANAGE_THREADS` permission __unless__ if setting the `archived` property to `false` when the `locked` property is also `false`, in which case only the `SEND_MESSAGES` permission is required.
     *
     * - Fires a _Thread Update_ gateway event.
     *
     * If editing a guild channel:
     * - Requires the `MANAGE_CHANNELS` permission.
     *
     * - If modifying permission overrides:
     *   - Requires the `MANAGE_ROLES` permission.
     *
     *   - Only permissions the bot user has in the guild or parent channel can be allowed/denied __unless__ the bot user has a `MANAGE_ROLES` permission override in the channel.
     *
     * - If modifying a channel of type {@link ChannelTypes.GuildCategory}:
     *     - Fires a _Channel Update_ gateway event for each child channel impacted in this change.
     * - Otherwise:
     *     - Fires a _Channel Update_ gateway event.
     */
    edit: (channelId: BigString, options: ModifyChannel) => Promise<Camelize<DiscordChannel>>
    /** Permission related helpers in a channel */
    permissions: {
      /**
       * Edits the permission overrides for a user or role in a channel.
       *
       * @param channelId - The ID of the channel to edit the permission overrides of.
       * @param options - The permission override.
       *
       * @remarks
       * Requires the `MANAGE_ROLES` permission.
       *
       * Only permissions the bot user has in the guild or parent channel can be allowed/denied __unless__ the bot user has a `MANAGE_ROLES` permission override in the channel.
       *
       * Fires a _Channel Update_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/channel#edit-channel-permissions}
       */
      edit: (channelId: BigString, options: EditChannelPermissionOverridesOptions) => Promise<void>
      /**
       * Deletes a permission override for a user or role in a channel.
       *
       * @param channelId - The ID of the channel to delete the permission override of.
       * @param overwriteId - The ID of the permission override to delete.
       *
       * @remarks
       * Requires the `MANAGE_ROLES` permission.
       *
       * Fires a _Channel Update_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/channel#delete-channel-permission}
       */
      delete: (channelId: BigString, overwriteId: BigString, reason?: string) => Promise<void>
    }
    /**
     * Edits the positions of a set of channels in a guild.
     *
     * @param guildId - The ID of the guild in which to edit the positions of the channels.
     * @param channelPositions - A set of objects defining the updated positions of the channels.
     *
     * @remarks
     * Requires the `MANAGE_CHANNELS` permission.
     *
     * Fires a _Channel Update_ gateway event for every channel impacted in this change.
     *
     * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions}
     */
    positions: (guildId: BigString, channelPositions: ModifyGuildChannelPositions[]) => Promise<void>
    /**
     * Gets the list of invites for a channel.
     *
     * @param rest - The rest manager to use to make the request.
     * @param channelId - The ID of the channel to get the invites of.
     * @returns A collection of {@link DiscordInviteMetadata} objects assorted by invite code.
     *
     * @remarks
     * Requires the `MANAGE_CHANNELS` permission.
     *
     * Only usable for guild channels.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#get-channel-invites}
     */
    invites: (channelId: BigString) => Promise<Array<Camelize<DiscordInviteMetadata>>>
    /**
     * Triggers a typing indicator for the bot user.
     *
     * @param channelId - The ID of the channel in which to trigger the typing indicator.
     *
     * @remarks
     * Generally, bots should _not_ use this route.
     *
     * Fires a _Typing Start_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#trigger-typing-indicator}
     */
    typing: (channelId: BigString) => Promise<void>
  }
  /** Guild related helper methods */
  guilds: {
    /**
     * Gets the list of channels for a guild.
     *
     * @param guildId - The ID of the guild to get the channels of.
     * @returns A collection of {@link DiscordChannel} objects assorted by channel ID.
     *
     * @remarks
     * Excludes threads.
     *
     * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-channels}
     */
    channels: (guildId: BigString) => Promise<Array<Camelize<DiscordChannel>>>
  }
  /**
   * Gets a channel by its ID.
   *
   * @param channelId - The ID of the channel to get.
   * @returns An instance of {@link DiscordChannel}.
   *
   * @remarks
   * If the channel is a thread, a {@link ThreadMember} object is included in the result.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#get-channel}
   */
  getChannel: (channelId: BigString) => Promise<Camelize<DiscordChannel>>
  /**
   * Creates a channel within a guild.
   *
   * @param guildId - The ID of the guild to create the channel within.
   * @param options - The parameters for the creation of the channel.
   * @returns An instance of the created {@link DiscordChannel}.
   *
   * @remarks
   * Requires the `MANAGE_CHANNELS` permission.
   *
   * If setting permission overwrites, only the permissions the bot user has in the guild can be allowed or denied.
   *
   * Setting the `MANAGE_ROLES` permission is only possible for guild administrators.
   *
   * Fires a _Channel Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#create-guild-channel}
   */
  createChannel: (guildId: BigString, options: CreateGuildChannel) => Promise<Camelize<DiscordChannel>>
  /**
   * Deletes a channel from within a guild.
   *
   * @param channelId - The ID of the channel to delete.
   * @returns An instance of the deleted {@link Channel}.
   *
   * @remarks
   * For community guilds, the _Rules_, _Guidelines_ and _Community Update_ channels cannot be deleted.
   *
   * If the channel is a thread:
   * - Requires the `MANAGE_THREADS` permission.
   *
   * - Fires a _Thread Delete_ gateway event.
   *
   * Otherwise:
   * - Requires the `MANAGE_CHANNELS` permission.
   *
   * - ⚠️ Deleting a category channel does not delete its child channels.
   *   Instead, they will have their `parent_id` property removed, and a `Channel Update` gateway event will fire for each of them.
   *
   * - Fires a _Channel Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#deleteclose-channel}
   */
  deleteChannel: (channelId: BigString, reason?: string) => Promise<void>
  /**
   * Deletes a permission override for a user or role in a channel.
   *
   * @param channelId - The ID of the channel to delete the permission override of.
   * @param overwriteId - The ID of the permission override to delete.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Fires a _Channel Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#delete-channel-permission}
   */
  deleteChannelPermissionOverride: (channelId: BigString, overwriteId: BigString, reason?: string) => Promise<void>
  /**
   * Edits a channel's settings.
   *
   * @param channelId - The ID of the channel to edit.
   * @param options - The parameters for the edit of the channel.
   * @returns An instance of the edited {@link DiscordChannel}.
   *
   * @remarks
   * If editing a channel of type {@link ChannelTypes.GroupDm}:
   * - Fires a _Channel Update_ gateway event.
   *
   * If editing a thread channel:
   * - Requires the `MANAGE_THREADS` permission __unless__ if setting the `archived` property to `false` when the `locked` property is also `false`, in which case only the `SEND_MESSAGES` permission is required.
   *
   * - Fires a _Thread Update_ gateway event.
   *
   * If editing a guild channel:
   * - Requires the `MANAGE_CHANNELS` permission.
   *
   * - If modifying permission overrides:
   *   - Requires the `MANAGE_ROLES` permission.
   *
   *   - Only permissions the bot user has in the guild or parent channel can be allowed/denied __unless__ the bot user has a `MANAGE_ROLES` permission override in the channel.
   *
   * - If modifying a channel of type {@link ChannelTypes.GuildCategory}:
   *     - Fires a _Channel Update_ gateway event for each child channel impacted in this change.
   * - Otherwise:
   *     - Fires a _Channel Update_ gateway event.
   */
  editChannel: (channelId: BigString, options: ModifyChannel) => Promise<Camelize<DiscordChannel>>
  /**
   * Edits the permission overrides for a user or role in a channel.
   *
   * @param channelId - The ID of the channel to edit the permission overrides of.
   * @param options - The permission override.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Only permissions the bot user has in the guild or parent channel can be allowed/denied __unless__ the bot user has a `MANAGE_ROLES` permission override in the channel.
   *
   * Fires a _Channel Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#edit-channel-permissions}
   */
  editChannelPermissionOverrides: (channelId: BigString, options: EditChannelPermissionOverridesOptions) => Promise<void>
  /**
   * Edits the positions of a set of channels in a guild.
   *
   * @param guildId - The ID of the guild in which to edit the positions of the channels.
   * @param channelPositions - A set of objects defining the updated positions of the channels.
   *
   * @remarks
   * Requires the `MANAGE_CHANNELS` permission.
   *
   * Fires a _Channel Update_ gateway event for every channel impacted in this change.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions}
   */
  editChannelPositions: (guildId: BigString, channelPositions: ModifyGuildChannelPositions[]) => Promise<void>
  /**
   * Gets the list of invites for a channel.
   *
   * @param rest - The rest manager to use to make the request.
   * @param channelId - The ID of the channel to get the invites of.
   * @returns A collection of {@link DiscordInviteMetadata} objects assorted by invite code.
   *
   * @remarks
   * Requires the `MANAGE_CHANNELS` permission.
   *
   * Only usable for guild channels.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#get-channel-invites}
   */
  getChannelInvites: (channelId: BigString) => Promise<Array<Camelize<DiscordInviteMetadata>>>
  /**
   * Gets the list of channels for a guild.
   *
   * @param guildId - The ID of the guild to get the channels of.
   * @returns A collection of {@link DiscordChannel} objects assorted by channel ID.
   *
   * @remarks
   * Excludes threads.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-channels}
   */
  getChannels: (guildId: BigString) => Promise<Array<Camelize<DiscordChannel>>>
  /**
   * Triggers a typing indicator for the bot user.
   *
   * @param channelId - The ID of the channel in which to trigger the typing indicator.
   *
   * @remarks
   * Generally, bots should _not_ use this route.
   *
   * Fires a _Typing Start_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#trigger-typing-indicator}
   */
  triggerTypingIndicator: (channelId: BigString) => Promise<void>
  /** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
  getSessionInfo: () => Promise<Camelize<DiscordGetGatewayBot>>
  /**
   * Get a user's data from the api
   *
   * @param id The user's id
   * @returns {Camelize<DiscordUser>}
   */
  getUser: (id: BigString) => Promise<Camelize<DiscordUser>>
  /**
   * Creates an emoji in a guild.
   *
   * @param guildId - The ID of the guild in which to create the emoji.
   * @param options - The parameters for the creation of the emoji.
   * @returns An instance of the created {@link DiscordEmoji}.
   *
   * @remarks
   * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
   *
   * Emojis have a maximum file size of 256 kilobits. Attempting to upload a larger emoji will cause the route to return 400 Bad Request.
   *
   * Fires a _Guild Emojis Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/emoji#create-guild-emoji}
   */
  createEmoji: (guildId: BigString, options: CreateGuildEmoji) => Promise<Camelize<DiscordEmoji>>
  /**
   * Deletes an emoji from a guild.
   *
   * @param rest - The rest manager to use to make the request.
   * @param guildId - The ID of the guild from which to delete the emoji.
   * @param id - The ID of the emoji to delete.
   *
   * @remarks
   * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
   *
   * Fires a _Guild Emojis Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/emoji#delete-guild-emoji}
   */
  deleteEmoji: (guildId: BigString, id: BigString, reason?: string) => Promise<void>
  /**
   * Edits an emoji.
   *
   * @param rest - The rest manager to use to make the request.
   * @param guildId - The ID of the guild in which to edit the emoji.
   * @param id - The ID of the emoji to edit.
   * @param options - The parameters for the edit of the emoji.
   * @returns An instance of the updated {@link DiscordEmoji}.
   *
   * @remarks
   * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
   *
   * Fires a `Guild Emojis Update` gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/emoji#modify-guild-emoji}
   */
  editEmoji: (guildId: BigString, id: BigString, options: ModifyGuildEmoji) => Promise<Camelize<DiscordEmoji>>
  /**
   * Gets an emoji by its ID.
   *
   * @param rest - The rest manager to use to make the request.
   * @param guildId - The ID of the guild from which to get the emoji.
   * @param emojiId - The ID of the emoji to get.
   * @returns An instance of {@link DiscordEmoji}.
   *
   * @see {@link https://discord.com/developers/docs/resources/emoji#get-guild-emoji}
   */
  getEmoji: (guildId: BigString, emojiId: BigString) => Promise<Camelize<DiscordEmoji>>
  /**
   * Gets the list of emojis for a guild.
   *
   * @param rest - The rest manager to use to make the request.
   * @param guildId - The ID of the guild which to get the emojis of.
   * @returns A collection of {@link DiscordEmoji} objects assorted by emoji ID.
   *
   * @see {@link https://discord.com/developers/docs/resources/emoji#list-guild-emojis}
   */
  getEmojis: (guildId: BigString) => Promise<Collection<string, Camelize<DiscordEmoji>>>
  /**
   * Builds a URL to an emoji in the Discord CDN.
   *
   * @param emojiId - The ID of the emoji to access.
   * @param animated - Whether the emoji is animated or static.
   * @returns The link to the resource.
   */
  getEmojiURL: (emojiId: BigString, animated?: boolean) => string
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

export type RequestMethods = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'
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
