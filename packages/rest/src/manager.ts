/**
 * sendInteractionResponse
 * editOriginalInteractionResponse
 * sendMessage
 * editMessage
 * publishMessage
 * sendFollowupMessage
 * deleteMessage
 * editWebhookMessage
 * editGlobalApplicationCommand
 * editGuildApplicationCommand
 * getDmChannel
 * getOriginalInteractionResponse
 */
import type {
  BigString,
  Camelize,
  CreateAutoModerationRuleOptions,
  CreateChannelInvite,
  CreateForumPostWithMessage,
  CreateGuildChannel,
  CreateGuildEmoji,
  CreateMessageOptions,
  CreateScheduledEvent,
  CreateStageInstance,
  DeleteWebhookMessageOptions,
  DiscordActiveThreads,
  DiscordApplication,
  DiscordArchivedThreads,
  DiscordAutoModerationRule,
  DiscordChannel,
  DiscordCreateMessage,
  DiscordCreateWebhook,
  DiscordEmoji,
  DiscordFollowAnnouncementChannel,
  DiscordFollowedChannel,
  DiscordGetGatewayBot,
  DiscordIntegration,
  DiscordInvite,
  DiscordInviteMetadata,
  DiscordListActiveThreads,
  DiscordListArchivedThreads,
  DiscordMember,
  DiscordMessage,
  DiscordScheduledEvent,
  DiscordStageInstance,
  DiscordStickerPack,
  DiscordThreadMember,
  DiscordUser,
  DiscordWebhook,
  EditAutoModerationRuleOptions,
  EditChannelPermissionOverridesOptions,
  EditScheduledEvent,
  EditStageInstanceOptions,
  ExecuteWebhook,
  GetInvite,
  GetMessagesOptions,
  GetScheduledEvents,
  GetScheduledEventUsers,
  GetWebhookMessageOptions,
  InteractionCallbackData,
  ListArchivedThreads,
  ModifyChannel,
  ModifyGuildChannelPositions,
  ModifyGuildEmoji,
  ModifyWebhook,
  StartThreadWithMessage,
  StartThreadWithoutMessage,
  WithReason
} from '@discordeno/types'
import { InteractionResponseTypes } from '@discordeno/types'
import { camelize, delay, urlToBase64 } from '@discordeno/utils'
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
      webhooks: {
        id: (webhookId: BigString) => {
          return `/webhooks/${webhookId}`
        },
        message: (webhookId, token, messageId, options) => {
          let url = `/webhooks/${webhookId}/${token}/messages/${messageId}?`

          if (options) {
            if (options.threadId) url += `thread_id=${options.threadId}`
          }

          return url
        },
        original: (webhookId, token, options) => {
          let url = `/webhooks/${webhookId}/${token}/messages/@original?`

          if (options) {
            if (options.threadId) url += `thread_id=${options.threadId}`
          }

          return url
        },
        webhook: (webhookId, token, options) => {
          let url = `/webhooks/${webhookId}/${token}?`

          if (options) {
            if (options?.wait !== undefined) url += `wait=${options.wait.toString()}`
            if (options.threadId) url += `thread_id=${options.threadId}`
          }

          return url
        },
      },

      // Miscellaneous Endpoints
      sessionInfo: () => rest.routes.gatewayBot(),

      // Channel Endpoints
      channels: {
        dm: () => {
          return '/users/@me/channels'
        },
        webhooks: (channelId) => {
          return `/channels/${channelId}/webhooks`
        },

        channel: (channelId) => {
          return `/channels/${channelId}`
        },

        follow: (channelId) => {
          return `/channels/${channelId}/followers`
        },

        forum: (channelId) => {
          return `/channels/${channelId}/threads?has_message=true`
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

        stages: () => {
          return '/stage-instances'
        },

        stage: (channelId) => {
          return `/stage-instances/${channelId}`
        },

        // Thread Endpoints
        threads: {
          message: (channelId, messageId) => {
            return `/channels/${channelId}/messages/${messageId}/threads`
          },
          all: (channelId) => {
            return `/channels/${channelId}/threads`
          },
          active: (guildId) => {
            return `/guilds/${guildId}/threads/active`
          },
          members: (channelId) => {
            return `/channels/${channelId}/thread-members`
          },
          me: (channelId) => {
            return `/channels/${channelId}/thread-members/@me`
          },
          user: (channelId, userId) => {
            return `/channels/${channelId}/thread-members/${userId}`
          },
          archived: (channelId) => {
            return `/channels/${channelId}/threads/archived`
          },
          public: (channelId, options) => {
            let url = `/channels/${channelId}/threads/archived/public?`

            if (options) {
              if (options.before) {
                url += `before=${new Date(options.before).toISOString()}`
              }
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.limit) url += `&limit=${options.limit}`
            }

            return url
          },
          private: (channelId, options) => {
            let url = `/channels/${channelId}/threads/archived/private?`

            if (options) {
              if (options.before) {
                url += `before=${new Date(options.before).toISOString()}`
              }
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.limit) url += `&limit=${options.limit}`
            }

            return url
          },
          joined: (channelId, options) => {
            let url = `/channels/${channelId}/users/@me/threads/archived/private?`

            if (options) {
              if (options.before) {
                url += `before=${new Date(options.before).toISOString()}`
              }
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.limit) url += `&limit=${options.limit}`
            }

            return url
          },
        },

        typing: (channelId) => {
          return `/channels/${channelId}/typing`
        },
      },

      // Guild Endpoints
      guilds: {
        automod: {
          rule: (guildId, ruleId) => {
            return `/guilds/${guildId}/auto-moderation/rules/${ruleId}`
          },
          rules: (guildId) => {
            return `/guilds/${guildId}/auto-moderation/rules`
          },
        },
        channels: (guildId) => {
          return `/guilds/${guildId}/channels`
        },
        emoji: (guildId, emojiId) => {
          return `/guilds/${guildId}/emojis/${emojiId}`
        },
        emojis: (guildId) => {
          return `/guilds/${guildId}/emojis`
        },
        events: {
          events: (guildId: BigString, withUserCount?: boolean) => {
            let url = `/guilds/${guildId}/scheduled-events?`

            if (withUserCount !== undefined) {
              url += `with_user_count=${withUserCount.toString()}`
            }
            return url
          },
          event: (guildId: BigString, eventId: BigString, withUserCount?: boolean) => {
            let url = `/guilds/${guildId}/scheduled-events/${eventId}`

            if (withUserCount !== undefined) {
              url += `with_user_count=${withUserCount.toString()}`
            }

            return url
          },
          users: (guildId: BigString, eventId: BigString, options?: GetScheduledEventUsers) => {
            let url = `/guilds/${guildId}/scheduled-events/${eventId}/users?`

            if (options) {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.limit !== undefined) url += `limit=${options.limit}`
              if (options.withMember !== undefined) {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                url += `&with_member=${options.withMember.toString()}`
              }
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.after !== undefined) url += `&after=${options.after}`
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.before !== undefined) url += `&before=${options.before}`
            }

            return url
          },
        },
        integration(guildId, integrationId) {
          return `/guilds/${guildId}/integrations/${integrationId}`
        },
        integrations: (guildId) => {
          return `/guilds/${guildId}/integrations?include_applications=true`
        },
        invite(inviteCode, options) {
          let url = `/invites/${inviteCode}?`

          if (options) {
            if (options.withCounts !== undefined) {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              url += `with_counts=${options.withCounts.toString()}`
            }
            if (options.withExpiration !== undefined) {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              url += `&with_expiration=${options.withExpiration.toString()}`
            }
            if (options.scheduledEventId) {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              url += `&guild_scheduled_event_id=${options.scheduledEventId}`
            }
          }

          return url
        },
        invites: (guildId) => {
          return `/guilds/${guildId}/invites`
        },
        webhooks: (guildId) => {
          return `/guilds/${guildId}/webhooks`
        },
      },

      // User endpoints
      user(userId: BigString) {
        return `/users/${userId}`
      },

      userBot() {
        return '/users/@me'
      },

      oauth2Application() {
        return 'oauth2/applications/@me'
      },

      gatewayBot() {
        return '/gateway/bot'
      },

      nitroStickerPacks() {
        return '/sticker-packs'
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

      async follow(sourceChannelId, targetChannelId) {
        return await rest.followAnnouncement(sourceChannelId, targetChannelId)
      },

      forums: {
        async post(channelId, options) {
          return await rest.createForumThread(channelId, options)
        },
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

      stages: {
        async create(options) {
          return await rest.createStageInstance(options)
        },

        async delete(channelId, reason) {
          return await rest.deleteStageInstance(channelId, reason)
        },

        async edit(channelId, data) {
          return await rest.editStageInstance(channelId, data)
        },

        async get(channelId) {
          return await rest.getStageInstance(channelId)
        },
      },

      threads: {
        create: {
          with: {
            async message(channelId, messageId, options) {
              return await rest.startThreadWithMessage(channelId, messageId, options)
            },
          },
          without: {
            async message(channelId, options) {
              return await rest.startThreadWithoutMessage(channelId, options)
            },
          },
        },

        get: {
          async active(guildId) {
            return await rest.getActiveThreads(guildId)
          },

          archived: {
            async private(channelId, options) {
              return await rest.getPrivateArchivedThreads(channelId, options)
            },

            async joined(channelId, options) {
              return await rest.getPrivateJoinedArchivedThreads(channelId, options)
            },

            async public(channelId, options) {
              return await rest.getPublicArchivedThreads(channelId, options)
            },
          },

          async member(channelId, userId) {
            return await rest.getThreadMember(channelId, userId)
          },

          async members(channelId) {
            return await rest.getThreadMembers(channelId)
          },
        },

        async join(channelId) {
          return await rest.joinThread(channelId)
        },

        async leave(channelId) {
          return await rest.leaveThread(channelId)
        },

        async kick(channelId, userId) {
          return await rest.removeThreadMember(channelId, userId)
        },
      },

      async typing(id) {
        return await rest.triggerTypingIndicator(id)
      },
    },

    emojis: {
      async create(guildId, options) {
        return await rest.createEmoji(guildId, options)
      },

      async delete(guildId, id, reason) {
        return await rest.deleteEmoji(guildId, id, reason)
      },

      async edit(guildId, id, options) {
        return await rest.editEmoji(guildId, id, options)
      },

      async get(guildId, emojiId) {
        return await rest.getEmoji(guildId, emojiId)
      },
    },

    guilds: {
      automod: {
        async create(guildId, options) {
          return await rest.createAutomodRule(guildId, options)
        },

        async delete(guildId, eventId) {
          return await rest.deleteAutomodRule(guildId, eventId)
        },

        async edit(guildId, ruleId, options) {
          return await rest.editAutomodRule(guildId, ruleId, options)
        },

        get: {
          async rule(guildId, ruleId) {
            return await rest.getAutomodRule(guildId, ruleId)
          },

          async rules(guildId) {
            return await rest.getAutomodRules(guildId)
          },
        },
      },

      async channels(id) {
        return await rest.getChannels(id)
      },

      async emojis(id) {
        return await rest.getEmojis(id)
      },

      events: {
        async create(guildId, options) {
          return await rest.createScheduledEvent(guildId, options)
        },

        async delete(guildId, eventId) {
          return await rest.deleteScheduledEvent(guildId, eventId)
        },

        async edit(guildId, eventId, options) {
          return await rest.editScheduledEvent(guildId, eventId, options)
        },

        get: {
          async event(guildId, eventId, options) {
            return await rest.getScheduledEvent(guildId, eventId, options)
          },

          async events(guildId, options) {
            return await rest.getScheduledEvents(guildId, options)
          },

          async users(guildId, eventId, options) {
            return await rest.getScheduledEventUsers(guildId, eventId, options)
          },
        },
      },

      integrations: {
        async get(guildId) {
          return await rest.getIntegrations(guildId)
        },

        async delete(guildId, integrationId) {
          return await rest.deleteIntegration(guildId, integrationId)
        },
      },

      invites: {
        async create(channelId, options) {
          return await rest.createInvite(channelId, options)
        },

        async delete(inviteCode, reason) {
          return await rest.deleteInvite(inviteCode, reason)
        },

        async get(inviteCode, options) {
          return await rest.getInvite(inviteCode, options)
        },

        async list(guildId) {
          return await rest.getInvites(guildId)
        },
      },
    },

    users: {
      async channel(userId) {
        return await rest.getDmChannel(userId)
      },
    },

    webhooks: {
      async create(channelId, options) {
        return await rest.createWebhook(channelId, options)
      },

      delete: {
        with: {
          async id(id, reason) {
            return await rest.deleteWebhook(id, reason)
          },

          async token(id, token) {
            return await rest.deleteWebhookWithToken(id, token)
          },
        },
      },

      edit: {
        with: {
          async id(webhookId, options) {
            return await rest.editWebhook(webhookId, options)
          },

          async token(id, token, options) {
            return await rest.editWebhookWithToken(id, token, options)
          },
        },
      },

      async execute(webhookId, token, options) {
        return await rest.executeWebhook(webhookId, token, options)
      },

      get: {
        async channel(channelId) {
          return await rest.getChannelWebhooks(channelId)
        },

        async guild(guildId) {
          return await rest.getGuildWebhooks(guildId)
        },

        async message(webhookId, token, messageId, options) {
          return await rest.getWebhookMessage(webhookId, token, messageId, options)
        },

        with: {
          async id(webhookId) {
            return await rest.getWebhook(webhookId)
          },

          async token(webhookId, token) {
            return await rest.getWebhookWithToken(webhookId, token)
          },
        },
      },

      messages: {
        async delete(webhookId, token, messageId, options) {
          return await rest.deleteWebhookMessage(webhookId, token, messageId, options)
        },

        // js hack making it possible to do webhooks.messages.edit() as well as webhooks.messages.edit.original()
        edit: Object.assign(
          // The base function for webhooks.messages.edit()
          (async (webhookId, token, messageId, options) => {
            return await rest.editWebhookMessage(webhookId, token, messageId, options)
          }) as WebhookMessageEditor,
          // The properties that webhooks.messages.edit.xxx will have are listed in this object
          {
            original: async (webhookId, token, options) => {
              return await rest.editOriginalWebhookMessage(webhookId, token, options)
            },
          } as WebhookMessageEditor,
        ),
      },
    },

    async addThreadMember(channelId, userId) {
      return await rest.put(rest.routes.channels.threads.user(channelId, userId))
    },

    async createAutomodRule(guildId, options) {
      return await rest.post<DiscordAutoModerationRule>(rest.routes.guilds.automod.rules(guildId), options)
    },

    async createChannel(guildId, options) {
      return await rest.post<DiscordChannel>(rest.routes.guilds.channels(guildId), options)
    },

    async createEmoji(guildId, options) {
      return await rest.post<DiscordEmoji>(rest.routes.guilds.emojis(guildId), options)
    },

    async createForumThread(channelId, options) {
      return await rest.post<DiscordChannel>(rest.routes.channels.forum(channelId), options)
    },

    async createInvite(channelId, options = {}) {
      return await rest.post<DiscordInvite>(rest.routes.channels.invites(channelId), options)
    },

    async createScheduledEvent(guildId, options) {
      return await rest.post<DiscordScheduledEvent>(rest.routes.guilds.events.events(guildId), options)
    },

    async createStageInstance(options) {
      return await rest.post<DiscordStageInstance>(rest.routes.channels.stages(), options)
    },

    async createWebhook(channelId, options) {
      return await rest.post<DiscordWebhook>(rest.routes.channels.webhooks(channelId), {
        name: options.name,
        avatar: options.avatar ? await urlToBase64(options.avatar) : undefined,
        reason: options.reason,
      } as DiscordCreateWebhook)
    },

    async deleteAutomodRule(guildId, ruleId, reason) {
      return await rest.delete(rest.routes.guilds.automod.rule(guildId, ruleId), { reason })
    },

    async deleteChannel(channelId, reason) {
      return await rest.delete(rest.routes.channels.channel(channelId), { reason })
    },

    async deleteChannelPermissionOverride(channelId, overwriteId, reason) {
      return await rest.delete(rest.routes.channels.overwrite(channelId, overwriteId), reason ? { reason } : undefined)
    },

    async deleteEmoji(guildId, id, reason) {
      return await rest.delete(rest.routes.guilds.emoji(guildId, id), { reason })
    },

    async deleteIntegration(guildId, integrationId) {
      return await rest.delete(rest.routes.guilds.integration(guildId, integrationId))
    },

    async deleteInvite(inviteCode: string, reason?: string) {
      return await rest.delete(rest.routes.guilds.invite(inviteCode), reason ? { reason } : undefined)
    },

    async deleteScheduledEvent(guildId, eventId) {
      return await rest.delete(rest.routes.guilds.events.event(guildId, eventId))
    },

    async deleteStageInstance(channelId, reason) {
      return await rest.delete(rest.routes.channels.stage(channelId), reason ? { reason } : undefined)
    },

    async deleteWebhook(webhookId, reason) {
      return await rest.delete(rest.routes.webhooks.id(webhookId), { reason })
    },

    async deleteWebhookMessage(webhookId, token, messageId, options) {
      return await rest.delete(rest.routes.webhooks.message(webhookId, token, messageId, options))
    },

    async deleteWebhookWithToken(webhookId, token) {
      return await rest.delete(rest.routes.webhooks.webhook(webhookId, token))
    },

    async editAutomodRule(guildId, ruleId, options) {
      return await rest.patch<DiscordAutoModerationRule>(rest.routes.guilds.automod.rule(guildId, ruleId), options)
    },

    async editBotProfile(options) {
      const avatar = options?.botAvatarURL ? await urlToBase64(options?.botAvatarURL) : options?.botAvatarURL

      return await rest.patch<DiscordUser>(rest.routes.userBot(), {
        username: options.username?.trim(),
        avatar,
      })
    },

    async editChannel(channelId, options) {
      return await rest.patch<DiscordChannel>(rest.routes.channels.channel(channelId), options)
    },

    async editChannelPermissionOverrides(channelId, options) {
      return await rest.put(rest.routes.channels.overwrite(channelId, options.id), options)
    },

    async editChannelPositions(guildId, channelPositions) {
      return await rest.patch(rest.routes.guilds.channels(guildId), channelPositions)
    },

    async editEmoji(guildId, id, options) {
      return await rest.patch<DiscordEmoji>(rest.routes.guilds.emoji(guildId, id), options)
    },

    async editOriginalWebhookMessage(webhookId, token, options) {
      return await rest.patch<DiscordMessage>(rest.routes.webhooks.original(webhookId, token, options), {
        type: InteractionResponseTypes.UpdateMessage,
        data: options,
      })
    },

    async editScheduledEvent(guildId, eventId, options) {
      return await rest.patch<DiscordScheduledEvent>(rest.routes.guilds.events.event(guildId, eventId), options)
    },

    async editStageInstance(channelId, data) {
      return await rest.patch<DiscordStageInstance>(rest.routes.channels.stage(channelId), { topic: data.topic })
    },

    async editWebhook(webhookId, options) {
      return await rest.patch<DiscordWebhook>(rest.routes.webhooks.id(webhookId), options)
    },

    async editWebhookMessage(webhookId, token, messageId, options) {
      return await rest.patch<DiscordMessage>(rest.routes.webhooks.message(webhookId, token, messageId, options), {
        type: InteractionResponseTypes.UpdateMessage,
        data: options,
      })
    },

    async editWebhookWithToken(webhookId, token, options) {
      return await rest.patch<DiscordWebhook>(rest.routes.webhooks.webhook(webhookId, token), options)
    },

    async executeWebhook(webhookId, token, options) {
      return await rest.post<DiscordMessage>(rest.routes.webhooks.webhook(webhookId, token, options), options)
    },

    async followAnnouncement(sourceChannelId, targetChannelId) {
      return await rest.post<DiscordFollowedChannel>(rest.routes.channels.follow(sourceChannelId), {
        webhook_channel_id: targetChannelId,
      } as DiscordFollowAnnouncementChannel)
    },

    async getActiveThreads(guildId) {
      return await rest.get<DiscordListActiveThreads>(rest.routes.channels.threads.active(guildId))
    },

    async getApplicationInfo() {
      return await rest.get<DiscordApplication>(rest.routes.oauth2Application())
    },

    async getAutomodRule(guildId, ruleId) {
      return await rest.get<DiscordAutoModerationRule>(rest.routes.guilds.automod.rule(guildId, ruleId))
    },

    async getAutomodRules(guildId) {
      return await rest.get<DiscordAutoModerationRule[]>(rest.routes.guilds.automod.rules(guildId))
    },

    async getChannel(id) {
      return await rest.get<DiscordChannel>(rest.routes.channels.channel(id))
    },

    async getChannelInvites(channelId) {
      return await rest.get<DiscordInviteMetadata[]>(rest.routes.channels.invites(channelId))
    },

    async getChannels(guildId) {
      return await rest.get<DiscordChannel[]>(rest.routes.guilds.channels(guildId))
    },

    async getChannelWebhooks(channelId) {
      return await rest.get<DiscordWebhook[]>(rest.routes.channels.webhooks(channelId))
    },

async getDmChannel (userId) {
  return await rest.post<DiscordChannel>(
    rest.routes.channels.dm(),
    {
      recipient_id: userId.toString()
    }
  )
},

    async getEmoji(guildId, emojiId) {
      return await rest.get<DiscordEmoji>(rest.routes.guilds.emoji(guildId, emojiId))
    },

    async getEmojis(guildId) {
      return await rest.get<DiscordEmoji[]>(rest.routes.guilds.emojis(guildId))
    },

    async getGatewayBot() {
      return await rest.get<DiscordGetGatewayBot>(rest.routes.gatewayBot())
    },

    async getGuildWebhooks(guildId) {
      return await rest.get<DiscordWebhook[]>(rest.routes.guilds.webhooks(guildId))
    },

    async getIntegrations(guildId) {
      return await rest.get<DiscordIntegration[]>(rest.routes.guilds.integrations(guildId))
    },

    async getInvite(inviteCode, options) {
      return await rest.get<DiscordInviteMetadata>(rest.routes.guilds.invite(inviteCode, options))
    },

    async getInvites(guildId) {
      return await rest.get<DiscordInviteMetadata[]>(rest.routes.guilds.invites(guildId))
    },

    async getNitroStickerPacks() {
      return await rest.get<DiscordStickerPack[]>(rest.routes.nitroStickerPacks())
    },

    async getPrivateArchivedThreads(channelId, options) {
      return await rest.get<DiscordListArchivedThreads>(rest.routes.channels.threads.private(channelId, options))
    },

    async getPrivateJoinedArchivedThreads(channelId, options) {
      return await rest.get<DiscordListArchivedThreads>(rest.routes.channels.threads.joined(channelId, options))
    },

    async getPublicArchivedThreads(channelId, options) {
      return await rest.get<DiscordListArchivedThreads>(rest.routes.channels.threads.public(channelId, options))
    },

    async getScheduledEvent(guildId, eventId, options) {
      return await rest.get<DiscordScheduledEvent>(rest.routes.guilds.events.event(guildId, eventId, options?.withUserCount))
    },

    async getScheduledEvents(guildId, options) {
      return await rest.get<DiscordScheduledEvent[]>(rest.routes.guilds.events.events(guildId, options?.withUserCount))
    },

    async getScheduledEventUsers(guildId, eventId, options) {
      return await rest.get<Array<{ user: DiscordUser; member?: DiscordMember }>>(rest.routes.guilds.events.users(guildId, eventId, options))
    },

    async getSessionInfo() {
      return await rest.getGatewayBot()
    },

    async getStageInstance(channelId) {
      return await rest.get<DiscordStageInstance>(rest.routes.channels.stage(channelId))
    },

    async getThreadMember(channelId, userId) {
      return await rest.get<DiscordThreadMember>(rest.routes.channels.threads.user(channelId, userId))
    },

    async getThreadMembers(channelId) {
      return await rest.get<DiscordThreadMember[]>(rest.routes.channels.threads.members(channelId))
    },

    async getUser(id) {
      return await rest.get<DiscordUser>(rest.routes.user(id))
    },

    async getWebhook(webhookId) {
      return await rest.get<DiscordWebhook>(rest.routes.webhooks.id(webhookId))
    },

    async getWebhookMessage(webhookId, token, messageId, options) {
      return await rest.get<DiscordMessage>(rest.routes.webhooks.message(webhookId, token, messageId, options))
    },

    async getWebhookWithToken(webhookId, token) {
      return await rest.get<DiscordWebhook>(rest.routes.webhooks.webhook(webhookId, token))
    },

    async joinThread(channelId) {
      return await rest.put(rest.routes.channels.threads.me(channelId))
    },

    async leaveThread(channelId) {
      return await rest.delete(rest.routes.channels.threads.me(channelId))
    },

    async removeThreadMember(channelId, userId) {
      return await rest.delete(rest.routes.channels.threads.user(channelId, userId))
    },

    async sendMessage(channelId, options) {
      return await rest.post<DiscordMessage>(rest.routes.channels.messages(channelId), {
        content: options.content,
        // TODO: other options
      } as DiscordCreateMessage)
    },

    async startThreadWithMessage(channelId, messageId, options) {
      return await rest.post<DiscordChannel>(rest.routes.channels.threads.message(channelId, messageId), options)
    },

    async startThreadWithoutMessage(channelId, options) {
      return await rest.post<DiscordChannel>(rest.routes.channels.threads.all(channelId), options)
    },

    async triggerTypingIndicator(channelId) {
      return await rest.post(rest.routes.channels.typing(channelId))
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
    /** Current bot user route. */
    userBot: () => string
    // OAuth2
    oauth2Application: () => string
    // Gateway Bot
    gatewayBot: () => string
    // Nitro Sticker Packs
    nitroStickerPacks: () => string
    /** Routes for webhook related routes. */
    webhooks: {
      /** Route for managing the original message sent by a webhook. */
      original: (webhookId: BigString, token: string, options?: { threadId?: BigString }) => string
      /** Route for webhook with a id. */
      id: (webhookId: BigString) => string
      /** Route for handling a webhook with a token. */
      webhook: (webhookId: BigString, token: string, options?: { wait?: boolean; threadId?: BigString }) => string
      /** Route for handling a message that was sent through a webhook. */
      message: (webhookId: BigString, token: string, messageId: BigString, options?: { threadId?: BigString }) => string
    }
    /** Routes for channel related endpoints. */
    channels: {
      /** Route for non-specific dm channel. */
      dm: () => string
      /** Route for non-specific webhook in a channel. */
      webhooks: (channelId: BigString) => string
      /** Route for a specific channel. */
      channel: (channelId: BigString) => string
      /** Route for following a specific channel. */
      follow: (channelId: BigString) => string
      /** Route for managing a forum with a message. */
      forum: (channelId: BigString) => string
      /** Route for a specific channel's invites. */
      invites: (channelId: BigString) => string
      /** Route for a specific message */
      message: (channelId: BigString, id: BigString) => string
      /** Route for handling non-specific messages. */
      messages: (channelId: BigString, options?: GetMessagesOptions) => string
      /** Route for handling a specific overwrite. */
      overwrite: (channelId: BigString, overwriteId: BigString) => string
      /** Route for handling non-specific stages */
      stages: () => string
      /** Route for handling a specific stage */
      stage: (channelId: BigString) => string
      /** Routes for handling thread related to a channel. */
      threads: {
        /** Route for thread a specific message. */
        message: (channelId: BigString, messageId: BigString) => string
        /** Route for thread without a message. */
        all: (channelId: BigString) => string
        /** Route for active threads. */
        active: (guildId: BigString) => string
        /** Route for members in a thread. */
        members: (channelId: BigString) => string
        /** Route for the bot member in a thread. */
        me: (channelId: BigString) => string
        /** Route for a specific member in a thread. */
        user: (channelId: BigString, userId: BigString) => string
        /** Route for handling archived threads. */
        archived: (channelId: BigString) => string
        /** Route for handling publically archived threads. */
        public: (channelId: BigString, options?: ListArchivedThreads) => string
        /** Route for handling private archived threads. */
        private: (channelId: BigString, options?: ListArchivedThreads) => string
        /** Route for handling private archived threads that the bot has joined. */
        joined: (channelId: BigString, options?: ListArchivedThreads) => string
      }
      /** Route for handling typing indicators in a c«hannel. */
      typing: (channelId: BigString) => string
    }
    /** Routes for guild related endpoints. */
    guilds: {
      /** Routes for a guilds automoderation. */
      automod: {
        /** Route for handling a guild's automoderation. */
        rules: (guildId: BigString) => string
        /** Route for handling a specific automoderation rule guild's */
        rule: (guildId: BigString, ruleId: BigString) => string
      }
      /** Routes for handling a guild's scheduled events. */
      events: {
        /** Route for handling non-specific scheduled event. */
        events: (guildId: BigString, withUserCount?: boolean) => string
        /** Route for handling a specific scheduled event. */
        event: (guildId: BigString, eventId: BigString, withUserCount?: boolean) => string
        /** Route for handling a scheduled event users. */
        users: (guildId: BigString, eventId: BigString, options?: GetScheduledEventUsers) => string
      }
      /** Route for handling non-specific channels in a guild */
      channels: (guildId: BigString) => string
      /** Route for handling a specific emoji. */
      emoji: (guildId: BigString, id: BigString) => string
      /** Route for handling non-specific emojis. */
      emojis: (guildId: BigString) => string
      /** Route for handling a specific integration. */
      integration: (guildId: BigString, integrationId: BigString) => string
      /** Route for handling non-specific integrations. */
      integrations: (guildId: BigString) => string
      /** Route for handling a specific guild invite. */
      invite: (inviteCode: string, options?: GetInvite) => string
      /** Route for handling non-specific invites in a guild. */
      invites: (guildId: BigString) => string
      /** Route for handling non-specific webhooks in a guild */
      webhooks: (guildId: BigString) => string
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
    /**
     * Follows an announcement channel, allowing messages posted within it to be cross-posted into the target channel.
     *
     * @param sourceChannelId - The ID of the announcement channel to follow.
     * @param targetChannelId - The ID of the target channel - the channel to cross-post to.
     * @returns An instance of {@link DiscordFollowedChannel}.
     *
     * @remarks
     * Requires the `MANAGE_WEBHOOKS` permission in the __target channel__.
     *
     * Fires a _Webhooks Update_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/channel#follow-announcement-channel}
     */
    follow: (sourceChannelId: BigString, targetChannelId: BigString) => Promise<Camelize<DiscordFollowedChannel>>
    /** Forum related helpers in a channel */
    forums: {
      /**
       * Creates a new thread in a forum channel, and sends a message within the created thread.
       *
       * @param channelId - The ID of the forum channel to create the thread within.
       * @param options - The parameters for the creation of the thread.
       * @returns An instance of {@link DiscordChannel} with a nested {@link Message} object.
       *
       * @remarks
       * Requires the `CREATE_MESSAGES` permission.
       *
       * Fires a _Thread Create_ gateway event.
       * Fires a _Message Create_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-in-forum-channel}
       *
       * @experimental
       */
      post: (channelId: BigString, options: CreateForumPostWithMessage) => Promise<Camelize<DiscordChannel>>
    }
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
    threads: {
      get: {
        /**
         * Gets the list of all active threads for a guild.
         *
         * @param guildId - The ID of the guild to get the threads of.
         * @returns An instance of {@link DiscordActiveThreads}.
         *
         * @remarks
         * Returns both public and private threads.
         *
         * Threads are ordered by the `id` property in descending order.
         *
         * @see {@link https://discord.com/developers/docs/resources/guild#list-active-guild-threads}
         */
        active: (guildId: BigString) => Promise<Camelize<DiscordActiveThreads>>
        /** Methods related to getting archived threads. */
        archived: {
          /**
           * Gets the list of private archived threads for a channel.
           *
           * @param channelId - The ID of the channel to get the archived threads for.
           * @param options - The parameters for the fetching of threads.
           * @returns An instance of {@link DiscordArchivedThreads}.
           *
           * @remarks
           * Requires the `READ_MESSAGE_HISTORY` permission.
           * Requires the `MANAGE_THREADS` permission.
           *
           * Returns threads of type {@link ChannelTypes.GuildPrivateThread}.
           *
           * Threads are ordered by the `archive_timestamp` property included in the metadata of the object in descending order.
           *
           * @see {@link https://discord.com/developers/docs/resources/channel#list-private-archived-threads}
           */
          private: (channelId: BigString, options?: ListArchivedThreads) => Promise<Camelize<DiscordArchivedThreads>>
          /**
           * Gets the list of private archived threads the bot is a member of for a channel.
           *
           * @param channelId - The ID of the channel to get the archived threads for.
           * @param options - The parameters for the fetching of threads.
           * @returns An instance of {@link DiscordArchivedThreads}.
           *
           * @remarks
           * Requires the `READ_MESSAGE_HISTORY` permission.
           *
           * Returns threads of type {@link ChannelTypes.GuildPrivateThread}.
           *
           * Threads are ordered by the `id` property in descending order.
           *
           * @see {@link https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads}
           */
          joined: (channelId: BigString, options?: ListArchivedThreads) => Promise<Camelize<DiscordArchivedThreads>>
          /**
           * Gets the list of public archived threads for a channel.
           *
           * @param channelId - The ID of the channel to get the archived threads for.
           * @param options - The parameters for the fetching of threads.
           * @returns An instance of {@link ArchivedThreads}.
           *
           * @remarks
           * Requires the `READ_MESSAGE_HISTORY` permission.
           *
           * If called on a channel of type {@link ChannelTypes.GuildText}, returns threads of type {@link ChannelTypes.GuildPublicThread}.
           * If called on a channel of type {@link ChannelTypes.GuildNews}, returns threads of type {@link ChannelTypes.GuildNewsThread}.
           *
           * Threads are ordered by the `archive_timestamp` property included in the metadata of the object in descending order.
           *
           * @see {@link https://discord.com/developers/docs/resources/channel#list-public-archived-threads}
           */
          public: (channelId: BigString, options?: ListArchivedThreads) => Promise<Camelize<DiscordArchivedThreads>>
        }
        /**
         * Gets a thread member by their user ID.
         *
         * @param channelId - The ID of the thread to get the thread member of.
         * @param userId - The user ID of the thread member to get.
         * @returns An instance of {@link DiscordThreadMember}.
         *
         * @see {@link https://discord.com/developers/docs/resources/channel#get-thread-member}
         */
        member: (channelId: BigString, userId: BigString) => Promise<Camelize<DiscordThreadMember>>
        /**
         * Gets the list of thread members for a thread.
         *
         * @param channelId - The ID of the thread to get the thread members of.
         * @returns A collection of {@link DiscordThreadMember} assorted by user ID.
         *
         * @remarks
         * Requires the application to have the `GUILD_MEMBERS` privileged intent enabled.
         *
         * @see {@link https://discord.com/developers/docs/resources/channel#list-thread-members}
         */
        members: (channelId: BigString) => Promise<Camelize<DiscordThreadMember[]>>
      }
      /**
       * Adds the bot user to a thread.
       *
       * @param channelId - The ID of the thread to add the bot user to.
       *
       * @remarks
       * Requires the thread not be archived.
       *
       * Fires a _Thread Members Update_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/channel#join-thread}
       */
      join: (channelId: BigString) => Promise<void>
      /**
       * Removes the bot user from a thread.
       *
       * @param channelId - The ID of the thread to remove the bot user from.
       *
       * @remarks
       * Requires the thread not be archived.
       *
       * Fires a _Thread Members Update_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/channel#leave-thread}
       */
      leave: (channelId: BigString) => Promise<void>
      /**
       * Removes a member from a thread.
       *
       * @param channelId - The ID of the thread to remove the thread member of.
       * @param userId - The user ID of the thread member to remove.
       *
       * @remarks
       * If the thread is of type {@link ChannelTypes.GuildPrivateThread}, requires to be the creator of the thread.
       * Otherwise, requires the `MANAGE_THREADS` permission.
       *
       * Requires the thread not be archived.
       *
       * Fires a _Thread Members Update_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/channel#remove-thread-member}
       */
      kick: (channelId: BigString, userId: BigString) => Promise<void>
      /** Methods related to creating a thread. */
      create: {
        with: {
          /**
           * Creates a thread, using an existing message as its point of origin.
           *
           * @param channelId - The ID of the channel in which to create the thread.
           * @param messageId - The ID of the message to use as the thread's point of origin.
           * @param options - The parameters to use for the creation of the thread.
           * @returns An instance of the created {@link Channel | Thread}.
           *
           * @remarks
           * If called on a channel of type {@link ChannelTypes.GuildText}, creates a {@link ChannelTypes.GuildPublicThread}.
           * If called on a channel of type {@link ChannelTypes.GuildNews}, creates a {@link ChannelTypes.GuildNewsThread}.
           * Does not work on channels of type {@link ChannelTypes.GuildForum}.
           *
           * The ID of the created thread will be the same as the ID of the source message.
           *
           * Fires a _Thread Create_ gateway event.
           *
           * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-from-message}
           */
          message: (channelId: BigString, messageId: BigString, options: StartThreadWithMessage) => Promise<Camelize<DiscordChannel>>
        }
        without: {
          /**
           * Creates a thread without using a message as the thread's point of origin.
           *
           * @param channelId - The ID of the channel in which to create the thread.
           * @param options - The parameters to use for the creation of the thread.
           * @returns An instance of the created {@link DiscordChannel | Thread}.
           *
           * @remarks
           * Creating a private thread requires the server to be boosted.
           *
           * Fires a _Thread Create_ gateway event.
           *
           * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-without-message}
           */
          message: (channelId: BigString, options: StartThreadWithoutMessage) => Promise<Camelize<DiscordChannel>>
        }
      }
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
    invites: (channelId: BigString) => Promise<Camelize<DiscordInviteMetadata[]>>
    /** Stage related helpers for a channel. */
    stages: {
      /**
       * Creates a stage instance associated with a stage channel.
       *
       * @param options - The parameters for the creation of the stage instance.
       * @returns An instance of the created {@link DiscordStageInstance}.
       *
       * @remarks
       * Requires the user to be a moderator of the stage channel.
       *
       * Fires a _Stage Instance Create_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/stage-instance#create-stage-instance}
       */
      create: (options: CreateStageInstance) => Promise<Camelize<DiscordStageInstance>>
      /**
       * Deletes the stage instance associated with a stage channel, if one exists.
       *
       * @param channelId - The ID of the stage channel the stage instance is associated with.
       *
       * @remarks
       * Requires the user to be a moderator of the stage channel.
       *
       * Fires a _Stage Instance Delete_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance}
       */
      delete: (channelId: BigString, reason?: string) => Promise<void>
      /**
       * Edits a stage instance.
       *
       * @param channelId - The ID of the stage channel the stage instance is associated with.
       * @returns An instance of the updated {@link DiscordStageInstance}.
       *
       * @remarks
       * Requires the user to be a moderator of the stage channel.
       *
       * Fires a _Stage Instance Update_ event.
       *
       * @see {@link https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance}
       */
      edit: (channelId: BigString, data: EditStageInstanceOptions) => Promise<Camelize<DiscordStageInstance>>
      /**
       * Gets the stage instance associated with a stage channel, if one exists.
       *
       * @param channelId - The ID of the stage channel the stage instance is associated with.
       * @returns An instance of {@link DiscordStageInstance}.
       *
       * @see {@link https://discord.com/developers/docs/resources/stage-instance#get-stage-instance}
       */
      get: (channelId: BigString) => Promise<Camelize<DiscordStageInstance>>
    }
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
  /** Emoji related helper methods. */
  emojis: {
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
    create: (guildId: BigString, options: CreateGuildEmoji) => Promise<Camelize<DiscordEmoji>>
    /**
     * Deletes an emoji from a guild.
     *
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
    delete: (guildId: BigString, id: BigString, reason?: string) => Promise<void>
    /**
     * Edits an emoji.
     *
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
    edit: (guildId: BigString, id: BigString, options: ModifyGuildEmoji) => Promise<Camelize<DiscordEmoji>>
    /**
     * Gets an emoji by its ID.
     *
     * @param guildId - The ID of the guild from which to get the emoji.
     * @param emojiId - The ID of the emoji to get.
     * @returns An instance of {@link DiscordEmoji}.
     *
     * @see {@link https://discord.com/developers/docs/resources/emoji#get-guild-emoji}
     */
    get: (guildId: BigString, emojiId: BigString) => Promise<Camelize<DiscordEmoji>>
  }
  /** Guild related helper methods */
  guilds: {
    automod: {
      /**
       * Creates an automod rule in a guild.
       *
       * @param guildId - The ID of the guild to create the rule in.
       * @param options - The parameters for the creation of the rule.
       * @returns An instance of the created {@link DiscordAutoModerationRule}.
       *
       * @remarks
       * Requires the `MANAGE_GUILD` permission.
       *
       * Fires an _Auto Moderation Rule Create_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule}
       */
      create: (guildId: BigString, options: CreateAutoModerationRuleOptions) => Promise<Camelize<DiscordAutoModerationRule>>
      /**
       * Deletes a scheduled event from a guild.
       *
       * @param guildId - The ID of the guild to delete the scheduled event from.
       * @param eventId - The ID of the scheduled event to delete.
       *
       * @remarks
       * Requires the `MANAGE_EVENTS` permission.
       *
       * Fires a _Guild Scheduled Event Delete_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event}
       */
      delete: (guildId: BigString, eventId: BigString) => Promise<void>
      /**
       * Edits an automod rule.
       *
       * @param guildId - The ID of the guild to edit the rule in.
       * @param ruleId - The ID of the rule to edit.
       * @param options - The parameters for the edit of the rule.
       * @returns An instance of the edited {@link DiscordAutoModerationRule}.
       *
       * @remarks
       * Requires the `MANAGE_GUILD` permission.
       *
       * Fires an _Auto Moderation Rule Update_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule}
       */
      edit: (guildId: BigString, ruleId: BigString, options: Partial<EditAutoModerationRuleOptions>) => Promise<Camelize<DiscordAutoModerationRule>>
      /** Methods related to getting automoderation data in a guild. */
      get: {
        /**
         * Gets an automod rule by its ID.
         *
         * @param guildId - The ID of the guild to get the rule of.
         * @param ruleId - The ID of the rule to get.
         * @returns An instance of {@link DiscordAutoModerationRule}.
         *
         * @remarks
         * Requires the `MANAGE_GUILD` permission.
         *
         * @see {@link https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule}
         */
        rule: (guildId: BigString, ruleId: BigString) => Promise<Camelize<DiscordAutoModerationRule>>
        /**
         * Gets the list of automod rules for a guild.
         *
         * @param guildId - The ID of the guild to get the rules from.
         * @returns A collection of {@link DiscordAutoModerationRule} objects assorted by rule ID.
         *
         * @remarks
         * Requires the `MANAGE_GUILD` permission.
         *
         * @see {@link https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild}
         */
        rules: (guildId: BigString) => Promise<Camelize<DiscordAutoModerationRule[]>>
      }
    }
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
    channels: (guildId: BigString) => Promise<Camelize<DiscordChannel[]>>
    /**
     * Gets the list of emojis for a guild.
     *
     * @param guildId - The ID of the guild which to get the emojis of.
     * @returns A collection of {@link DiscordEmoji} objects assorted by emoji ID.
     *
     * @see {@link https://discord.com/developers/docs/resources/emoji#list-guild-emojis}
     */
    emojis: (guildId: BigString) => Promise<Camelize<DiscordEmoji[]>>
    /** Methods related to a guild's scheduled events. */
    events: {
      /**
       * Creates a scheduled event in a guild.
       *
       * @param guildId - The ID of the guild to create the scheduled event in.
       * @param options - The parameters for the creation of the scheduled event.
       * @returns An instance of the created {@link ScheduledEvent}.
       *
       * @remarks
       * Requires the `MANAGE_EVENTS` permission.
       *
       * A guild can only have a maximum of 100 events with a status of {@link ScheduledEventStatus.Active} or {@link ScheduledEventStatus.Scheduled} (inclusive).
       *
       * Fires a _Guild Scheduled Event Create_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event}
       */
      create: (guildId: BigString, options: CreateScheduledEvent) => Promise<Camelize<DiscordScheduledEvent>>
      /**
       * Deletes a scheduled event from a guild.
       *
       * @param guildId - The ID of the guild to delete the scheduled event from.
       * @param eventId - The ID of the scheduled event to delete.
       *
       * @remarks
       * Requires the `MANAGE_EVENTS` permission.
       *
       * Fires a _Guild Scheduled Event Delete_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event}
       */
      delete: (guildId: BigString, eventId: BigString) => Promise<void>
      /**
       * Edits a scheduled event.
       *
       * @param guildId - The ID of the guild to edit the scheduled event in.
       * @param eventId - The ID of the scheduled event to edit.
       * @returns An instance of the edited {@link ScheduledEvent}.
       *
       * @remarks
       * Requires the `MANAGE_EVENTS` permission.
       *
       * To start or end an event, modify the event's `status` property.
       *
       * The `entity_metadata` property is discarded for events whose `entity_type` is not {@link ScheduledEventEntityType.External}.
       *
       * Fires a _Guild Scheduled Event Update_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event}
       */
      edit: (guildId: BigString, eventId: BigString, options: Partial<EditScheduledEvent>) => Promise<Camelize<DiscordScheduledEvent>>

      get: {
        /**
         * Gets a scheduled event by its ID.
         *
         * @param guildId - The ID of the guild to get the scheduled event from.
         * @param eventId - The ID of the scheduled event to get.
         * @param options - The parameters for the fetching of the scheduled event.
         * @returns An instance of {@link ScheduledEvent}.
         *
         * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event}
         */
        event: (guildId: BigString, eventId: BigString, options?: { withUserCount?: boolean }) => Promise<Camelize<DiscordScheduledEvent>>
        /**
         * Gets the list of scheduled events for a guild.
         *
         * @param guildId - The ID of the guild to get the scheduled events from.
         * @param options - The parameters for the fetching of the scheduled events.
         * @returns A collection of {@link ScheduledEvent} objects assorted by event ID.
         *
         * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild}
         */
        events: (guildId: BigString, options?: GetScheduledEvents) => Promise<Camelize<DiscordScheduledEvent[]>>
        /**
         * Gets the list of subscribers to a scheduled event from a guild.
         *
         * @param guildId - The ID of the guild to get the subscribers to the scheduled event from.
         * @param eventId - The ID of the scheduled event to get the subscribers of.
         * @param options - The parameters for the fetching of the subscribers.
         * @returns A collection of {@link User} objects assorted by user ID.
         *
         * @remarks
         * Requires the `MANAGE_EVENTS` permission.
         *
         * Users are ordered by their IDs in _ascending_ order.
         *
         * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users}
         */
        users: (
          guildId: BigString,
          eventId: BigString,
          options?: GetScheduledEventUsers,
        ) => Promise<Array<{ user: Camelize<DiscordUser>; member?: Camelize<DiscordMember> }>>
      }
    }
    /** Methods related to a guild's integrations. */
    integrations: {
      /**
       * Gets the list of integrations attached to a guild.
       *
       * @param guildId - The ID of the guild to get the list of integrations from.
       * @returns A collection of {@link Integration} objects assorted by integration ID.
       *
       * @remarks
       * Requires the `MANAGE_GUILD` permission.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-integrations}
       */
      get: (guildId: BigString) => Promise<Camelize<DiscordIntegration[]>>
      /**
       * Deletes an integration attached to a guild.
       *
       * @param guildId - The ID of the guild from which to delete the integration.
       * @param integrationId - The ID of the integration to delete from the guild.
       *
       * @remarks
       * Requires the `MANAGE_GUILD` permission.
       *
       * Deletes all webhooks associated with the integration, and kicks the associated bot if there is one.
       *
       * Fires a _Guild Integrations Update_ gateway event.
       * Fires a _Integration Delete_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild#delete-guild-integration}
       */
      delete: (guildId: BigString, integrationId: BigString) => Promise<void>
    }
    /** Methods related to a guild's invites. */
    invites: {
      /**
       * Creates an invite to a channel in a guild.
       *
       * @param channelId - The ID of the channel to create the invite to.
       * @param options - The parameters for the creation of the invite.
       * @returns An instance of the created {@link DiscordInvite}.
       *
       * @remarks
       * Requires the `CREATE_INSTANT_INVITE` permission.
       *
       * Fires an _Invite Create_ gateway event.
       *
       * @privateRemarks
       * The request body is not optional, and an empty JSON object must be sent regardless of whether any fields are being transmitted.
       *
       * @see {@link https://discord.com/developers/docs/resources/channel#create-channel-invite}
       */
      create: (channelId: BigString, options?: CreateChannelInvite) => Promise<Camelize<DiscordInvite>>
      /**
       * Deletes an invite to a channel.
       *
       * @param inviteCode - The invite code of the invite to delete.
       *
       * @remarks
       * Requires the `MANAGE_CHANNELS` permission.
       *
       * Fires an _Invite Delete_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/channel#delete-channel-invite}
       */
      delete: (inviteCode: string, reason?: string) => Promise<void>
      /**
       * Gets an invite to a channel by its invite code.
       *
       * @param inviteCode - The invite code of the invite to get.
       * @param options - The parameters for the fetching of the invite.
       * @returns An instance of {@link DiscordInviteMetadata}.
       *
       * @see {@link https://discord.com/developers/docs/resources/invite#get-invite}
       */
      get: (inviteCode: string, options?: GetInvite) => Promise<Camelize<DiscordInviteMetadata>>
      /**
       * Gets the list of invites for a guild.
       *
       * @param guildId - The ID of the guild to get the invites from.
       * @returns A collection of {@link DiscordInviteMetadata} objects assorted by invite code.
       *
       * @remarks
       * Requires the `MANAGE_GUILD` permission.
       *
       * @see {@link https://discord.com/developers/docs/resources/invite#get-invites}
       */
      list: (guildId: BigString) => Promise<Camelize<DiscordInviteMetadata[]>>
    }
  }
  /** Webhook related helper methods. */
  webhooks: {
    /**
     * Creates a webhook.
     *
     * @param channelId - The ID of the channel to create the webhook in.
     * @param options - The parameters for the creation of the webhook.
     * @returns An instance of the created {@link DiscordWebhook}.
     *
     * @remarks
     * Requires the `MANAGE_WEBHOOKS` permission.
     *
     * ⚠️ The webhook name must not contain the string 'clyde' (case-insensitive).
     *
     * Fires a _Webhooks Update_ gateway event.
     *
     * @see {@link https://discord.com/developers/docs/resources/webhook#create-webhook}
     */
    create: (channelId: BigString, options: CreateWebhook) => Promise<Camelize<DiscordWebhook>>
    /** Methods to delete a webhook. */
    delete: {
      with: {
        /**
         * Deletes a webhook.
         *
         * @param id - The ID of the webhook to delete.
         *
         * @remarks
         * Requires the `MANAGE_WEBHOOKS` permission.
         *
         * Fires a _Webhooks Update_ gateway event.
         *
         * @see {@link https://discord.com/developers/docs/resources/webhook#delete-webhook}
         */
        id: (id: BigString, reason?: string) => Promise<void>
        /**
         * Deletes a webhook message using the webhook token, thereby bypassing the need for authentication + permissions.
         *
         * @param id - The ID of the webhook to delete the message belonging to.
         * @param token - The webhook token, used to delete the webhook.
         *
         * @remarks
         * Fires a _Message Delete_ gateway event.
         *
         * @see {@link https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token}
         */
        token: (id: BigString, token: string) => Promise<void>
      }
    }
    /** Methods related to editing a webhook. */
    edit: {
      with: {
        /**
         * Edits a webhook.
         *
         * @param webhookId - The ID of the webhook to edit.
         * @returns An instance of the edited {@link DiscordWebhook}.
         *
         * @remarks
         * Requires the `MANAGE_WEBHOOKS` permission.
         *
         * Fires a _Webhooks Update_ gateway event.
         *
         * @see {@link https://discord.com/developers/docs/resources/webhook#edit-webhook}
         */
        id: (webhookId: BigString, options: ModifyWebhook) => Promise<Camelize<DiscordWebhook>>
        /**
         * Edits a webhook using the webhook token, thereby bypassing the need for authentication + permissions.
         *
         * @param webhookId - The ID of the webhook to edit.
         * @param token - The webhook token, used to edit the webhook.
         * @returns An instance of the edited {@link DiscordWebhook}.
         *
         * @remarks
         * Requires the `MANAGE_WEBHOOKS` permission.
         *
         * Fires a _Webhooks Update_ gateway event.
         *
         * @see {@link https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token}
         */
        token: (webhookId: BigString, token: string, options: Omit<ModifyWebhook, 'channelId'>) => Promise<Camelize<DiscordWebhook>>
      }
    }

    /**
     * Executes a webhook, causing a message to be posted in the channel configured for the webhook.
     *
     * @param webhookId - The ID of the webhook to execute.
     * @param token - The webhook token, used to execute the webhook.
     * @param options - The parameters for the execution of the webhook.
     * @returns An instance of the created {@link DiscordMessage}, or `undefined` if the {@link ExecuteWebhook.wait | wait} property of the {@link options} object parameter is set to `false`.
     *
     * @remarks
     * If the webhook channel is a forum channel, you must provide a value for either `threadId` or `threadName`.
     *
     * @see {@link https://discord.com/developers/docs/resources/webhook#execute-webhook}
     */
    execute: (webhookId: BigString, token: string, options: ExecuteWebhook) => Promise<Camelize<DiscordMessage> | undefined>
    /** Methods related to getting webhooks. */
    get: {
      /**
       * Gets a list of webhooks for a channel.
       *
       * @param channelId - The ID of the channel which to get the webhooks of.
       * @returns A collection of {@link DiscordWebhook} objects assorted by webhook ID.
       *
       * @remarks
       * Requires the `MANAGE_WEBHOOKS` permission.
       *
       * @see {@link https://discord.com/developers/docs/resources/webhook#get-channel-webhooks}
       */
      channel: (channelId: BigString) => Promise<Camelize<DiscordWebhook[]>>
      /**
       * Gets the list of webhooks for a guild.
       *
       * @param guildId - The ID of the guild to get the list of webhooks for.
       * @returns A collection of {@link DiscordWebhook} objects assorted by webhook ID.
       *
       * @remarks
       * Requires the `MANAGE_WEBHOOKS` permission.
       *
       * @see {@link https://discord.com/developers/docs/resources/webhook#get-guild-webhooks}
       */
      guild: (guildId: BigString) => Promise<Camelize<DiscordWebhook[]>>
      /**
       * Gets a webhook message by its ID.
       *
       * @param webhookId - The ID of the webhook to get a message of.
       * @param token - The webhook token, used to get webhook messages.
       * @param messageId - the ID of the webhook message to get.
       * @param options - The parameters for the fetching of the message.
       * @returns An instance of {@link DiscordMessage}.
       *
       * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook-message}
       */
      message: (webhookId: BigString, token: string, messageId: BigString, options?: GetWebhookMessageOptions) => Promise<Camelize<DiscordMessage>>
      with: {
        /**
         * Gets a webhook by its ID.
         *
         * @param webhookId - The ID of the webhook to get.
         * @returns An instance of {@link DiscordWebhook}.
         *
         * @remarks
         * Requires the `MANAGE_WEBHOOKS` permission.
         *
         * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook}
         */
        id: (webhookId: BigString) => Promise<Camelize<DiscordWebhook>>
        /**
         * Gets a webhook using the webhook token, thereby bypassing the need for authentication + permissions.
         *
         * @param webhookId - The ID of the webhook to get.
         * @param token - The webhook token, used to get the webhook.
         * @returns An instance of {@link DiscordWebhook}.
         *
         * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook-with-token}
         */
        token: (webhookId: BigString, token: string) => Promise<Camelize<DiscordWebhook>>
      }
    }
    /** Methods related to message sent by a webhook. */
    messages: {
      /**
       * Deletes a webhook message.
       *
       * @param webhookId - The ID of the webhook to delete the message belonging to.
       * @param token - The webhook token, used to manage the webhook.
       * @param messageId - The ID of the message to delete.
       * @param options - The parameters for the deletion of the message.
       *
       * @remarks
       * Fires a _Message Delete_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/webhook#delete-webhook}
       */
      delete: (webhookId: BigString, token: string, messageId: BigString, options?: DeleteWebhookMessageOptions) => Promise<void>
      /** Methods related to editing messages sent by a webhook. */
      edit: WebhookMessageEditor
    }
  }
  /** User related helper methods. */
  users: {
    /**
    * Gets or creates a DM channel with a user.
    *
    * @param userId - The ID of the user to create the DM channel with.
    * @returns An instance of {@link DiscordChannel}.
    *
    * @see {@link https://discord.com/developers/docs/resources/user#create-dm}
    */
   channel: (userId: BigString) => Promise<Camelize<DiscordChannel>>
    
  }
  /**
   * Adds a member to a thread.
   *
   * @param channelId - The ID of the thread to add the member to.
   * @param userId - The user ID of the member to add to the thread.
   *
   * @remarks
   * Requires the ability to send messages in the thread.
   * Requires the thread not be archived.
   *
   * Fires a _Thread Members Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#add-thread-member}
   */
  addThreadMember: (channelId: BigString, userId: BigString) => Promise<void>
  /**
   * Creates an automod rule in a guild.
   *
   * @param guildId - The ID of the guild to create the rule in.
   * @param options - The parameters for the creation of the rule.
   * @returns An instance of the created {@link DiscordAutoModerationRule}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires an _Auto Moderation Rule Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule}
   */
  createAutomodRule: (guildId: BigString, options: CreateAutoModerationRuleOptions) => Promise<Camelize<DiscordAutoModerationRule>>
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
   * Creates a new thread in a forum channel, and sends a message within the created thread.
   *
   * @param channelId - The ID of the forum channel to create the thread within.
   * @param options - The parameters for the creation of the thread.
   * @returns An instance of {@link DiscordChannel} with a nested {@link Message} object.
   *
   * @remarks
   * Requires the `CREATE_MESSAGES` permission.
   *
   * Fires a _Thread Create_ gateway event.
   * Fires a _Message Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-in-forum-channel}
   *
   * @experimental
   */
  createForumThread: (channelId: BigString, options: CreateForumPostWithMessage) => Promise<Camelize<DiscordChannel>>
  /**
   * Creates an invite to a channel in a guild.
   *
   * @param channelId - The ID of the channel to create the invite to.
   * @param options - The parameters for the creation of the invite.
   * @returns An instance of the created {@link DiscordInvite}.
   *
   * @remarks
   * Requires the `CREATE_INSTANT_INVITE` permission.
   *
   * Fires an _Invite Create_ gateway event.
   *
   * @privateRemarks
   * The request body is not optional, and an empty JSON object must be sent regardless of whether any fields are being transmitted.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#create-channel-invite}
   */
  createInvite: (channelId: BigString, options?: CreateChannelInvite) => Promise<Camelize<DiscordInvite>>
  /**
   * Creates a scheduled event in a guild.
   *
   * @param guildId - The ID of the guild to create the scheduled event in.
   * @param options - The parameters for the creation of the scheduled event.
   * @returns An instance of the created {@link ScheduledEvent}.
   *
   * @remarks
   * Requires the `MANAGE_EVENTS` permission.
   *
   * A guild can only have a maximum of 100 events with a status of {@link ScheduledEventStatus.Active} or {@link ScheduledEventStatus.Scheduled} (inclusive).
   *
   * Fires a _Guild Scheduled Event Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event}
   */
  createScheduledEvent: (guildId: BigString, options: CreateScheduledEvent) => Promise<Camelize<DiscordScheduledEvent>>
  /**
   * Creates a stage instance associated with a stage channel.
   *
   * @param options - The parameters for the creation of the stage instance.
   * @returns An instance of the created {@link DiscordStageInstance}.
   *
   * @remarks
   * Requires the user to be a moderator of the stage channel.
   *
   * Fires a _Stage Instance Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/stage-instance#create-stage-instance}
   */
  createStageInstance: (options: CreateStageInstance) => Promise<Camelize<DiscordStageInstance>>
  /**
   * Creates a webhook.
   *
   * @param channelId - The ID of the channel to create the webhook in.
   * @param options - The parameters for the creation of the webhook.
   * @returns An instance of the created {@link DiscordWebhook}.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * ⚠️ The webhook name must not contain the string 'clyde' (case-insensitive).
   *
   * Fires a _Webhooks Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#create-webhook}
   */
  createWebhook: (channelId: BigString, options: CreateWebhook) => Promise<Camelize<DiscordWebhook>>
  /**
   * Deletes an automod rule.
   *
   * @param guildId - The ID of the guild to delete the rule from.
   * @param ruleId - The ID of the automod rule to delete.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires an _Auto Moderation Rule Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule}
   */
  deleteAutomodRule: (guildId: BigString, ruleId: BigString, reason?: string) => Promise<void>
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
   * Deletes an emoji from a guild.
   *
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
   * Deletes an integration attached to a guild.
   *
   * @param guildId - The ID of the guild from which to delete the integration.
   * @param integrationId - The ID of the integration to delete from the guild.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Deletes all webhooks associated with the integration, and kicks the associated bot if there is one.
   *
   * Fires a _Guild Integrations Update_ gateway event.
   * Fires a _Integration Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#delete-guild-integration}
   */
  deleteIntegration: (guildId: BigString, integrationId: BigString) => Promise<void>
  /**
   * Deletes an invite to a channel.
   *
   * @param inviteCode - The invite code of the invite to delete.
   *
   * @remarks
   * Requires the `MANAGE_CHANNELS` permission.
   *
   * Fires an _Invite Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#delete-channel-invite}
   */
  deleteInvite: (inviteCode: string, reason?: string) => Promise<void>
  /**
   * Deletes a scheduled event from a guild.
   *
   * @param guildId - The ID of the guild to delete the scheduled event from.
   * @param eventId - The ID of the scheduled event to delete.
   *
   * @remarks
   * Requires the `MANAGE_EVENTS` permission.
   *
   * Fires a _Guild Scheduled Event Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event}
   */
  deleteScheduledEvent: (guildId: BigString, eventId: BigString) => Promise<void>
  /**
   * Deletes the stage instance associated with a stage channel, if one exists.
   *
   * @param channelId - The ID of the stage channel the stage instance is associated with.
   *
   * @remarks
   * Requires the user to be a moderator of the stage channel.
   *
   * Fires a _Stage Instance Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance}
   */
  deleteStageInstance: (channelId: BigString, reason?: string) => Promise<void>
  /**
   * Deletes a webhook.
   *
   * @param webhookId - The ID of the webhook to delete.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * Fires a _Webhooks Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#delete-webhook}
   */
  deleteWebhook: (webhookId: BigString, reason?: string) => Promise<void>
  /**
   * Deletes a webhook message.
   *
   * @param webhookId - The ID of the webhook to delete the message belonging to.
   * @param token - The webhook token, used to manage the webhook.
   * @param messageId - The ID of the message to delete.
   * @param options - The parameters for the deletion of the message.
   *
   * @remarks
   * Fires a _Message Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#delete-webhook}
   */
  deleteWebhookMessage: (webhookId: BigString, token: string, messageId: BigString, options?: DeleteWebhookMessageOptions) => Promise<void>
  /**
   * Deletes a webhook message using the webhook token, thereby bypassing the need for authentication + permissions.
   *
   * @param webhookId - The ID of the webhook to delete the message belonging to.
   * @param token - The webhook token, used to delete the webhook.
   *
   * @remarks
   * Fires a _Message Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token}
   */
  deleteWebhookWithToken: (webhookId: BigString, token: string) => Promise<void>
  /**
   * Edits an automod rule.
   *
   * @param guildId - The ID of the guild to edit the rule in.
   * @param ruleId - The ID of the rule to edit.
   * @param options - The parameters for the edit of the rule.
   * @returns An instance of the edited {@link DiscordAutoModerationRule}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires an _Auto Moderation Rule Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule}
   */
  editAutomodRule: (
    guildId: BigString,
    ruleId: BigString,
    options: Partial<EditAutoModerationRuleOptions>,
  ) => Promise<Camelize<DiscordAutoModerationRule>>
  /**
   * Modifies the bot's username or avatar.
   * NOTE: username: if changed may cause the bot's discriminator to be randomized.
   */
  editBotProfile: (options: { username?: string; botAvatarURL?: string | null }) => Promise<Camelize<DiscordUser>>
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
   * Edits an emoji.
   *
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
   * Edits the original webhook message.
   *
   * @param webhookId - The ID of the webhook to edit the original message of.
   * @param token - The webhook token, used to edit the message.
   * @param options - The parameters for the edit of the message.
   * @returns An instance of the edited {@link DiscordMessage}.
   *
   * @remarks
   * Fires a _Message Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#edit-webhook-message}
   */
  editOriginalWebhookMessage: (
    webhookId: BigString,
    token: string,
    options: InteractionCallbackData & { threadId?: BigString },
  ) => Promise<Camelize<DiscordMessage>>
  /**
   * Edits a scheduled event.
   *
   * @param guildId - The ID of the guild to edit the scheduled event in.
   * @param eventId - The ID of the scheduled event to edit.
   * @returns An instance of the edited {@link ScheduledEvent}.
   *
   * @remarks
   * Requires the `MANAGE_EVENTS` permission.
   *
   * To start or end an event, modify the event's `status` property.
   *
   * The `entity_metadata` property is discarded for events whose `entity_type` is not {@link ScheduledEventEntityType.External}.
   *
   * Fires a _Guild Scheduled Event Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event}
   */
  editScheduledEvent: (guildId: BigString, eventId: BigString, options: Partial<EditScheduledEvent>) => Promise<Camelize<DiscordScheduledEvent>>
  /**
   * Edits a stage instance.
   *
   * @param channelId - The ID of the stage channel the stage instance is associated with.
   * @returns An instance of the updated {@link DiscordStageInstance}.
   *
   * @remarks
   * Requires the user to be a moderator of the stage channel.
   *
   * Fires a _Stage Instance Update_ event.
   *
   * @see {@link https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance}
   */
  editStageInstance: (channelId: BigString, data: EditStageInstanceOptions) => Promise<Camelize<DiscordStageInstance>>
  /**
   * Edits a webhook.
   *
   * @param webhookId - The ID of the webhook to edit.
   * @returns An instance of the edited {@link DiscordWebhook}.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * Fires a _Webhooks Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#edit-webhook}
   */
  editWebhook: (webhookId: BigString, options: ModifyWebhook) => Promise<Camelize<DiscordWebhook>>
  /**
   * Edits a webhook message.
   *
   * @param webhookId - The ID of the webhook to edit the message of.
   * @param token - The webhook token, used to edit the message.
   * @param messageId - The ID of the message to edit.
   * @param options - The parameters for the edit of the message.
   * @returns An instance of the edited {@link DiscordMessage}.
   *
   * @remarks
   * Fires a _Message Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#edit-webhook-message}
   */
  editWebhookMessage: (
    webhookId: BigString,
    token: string,
    messageId: BigString,
    options: InteractionCallbackData & { threadId?: BigString },
  ) => Promise<Camelize<DiscordMessage>>
  /**
   * Edits a webhook using the webhook token, thereby bypassing the need for authentication + permissions.
   *
   * @param webhookId - The ID of the webhook to edit.
   * @param token - The webhook token, used to edit the webhook.
   * @returns An instance of the edited {@link DiscordWebhook}.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * Fires a _Webhooks Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token}
   */
  editWebhookWithToken: (webhookId: BigString, token: string, options: Omit<ModifyWebhook, 'channelId'>) => Promise<Camelize<DiscordWebhook>>
  /**
   * Executes a webhook, causing a message to be posted in the channel configured for the webhook.
   *
   * @param webhookId - The ID of the webhook to execute.
   * @param token - The webhook token, used to execute the webhook.
   * @param options - The parameters for the execution of the webhook.
   * @returns An instance of the created {@link DiscordMessage}, or `undefined` if the {@link ExecuteWebhook.wait | wait} property of the {@link options} object parameter is set to `false`.
   *
   * @remarks
   * If the webhook channel is a forum channel, you must provide a value for either `threadId` or `threadName`.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#execute-webhook}
   */
  executeWebhook: (webhookId: BigString, token: string, options: ExecuteWebhook) => Promise<Camelize<DiscordMessage> | undefined>
  /**
   * Follows an announcement channel, allowing messages posted within it to be cross-posted into the target channel.
   *
   * @param sourceChannelId - The ID of the announcement channel to follow.
   * @param targetChannelId - The ID of the target channel - the channel to cross-post to.
   * @returns An instance of {@link DiscordFollowedChannel}.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission in the __target channel__.
   *
   * Fires a _Webhooks Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#follow-announcement-channel}
   */
  followAnnouncement: (sourceChannelId: BigString, targetChannelId: BigString) => Promise<Camelize<DiscordFollowedChannel>>
  /**
   * Gets the list of all active threads for a guild.
   *
   * @param guildId - The ID of the guild to get the threads of.
   * @returns An instance of {@link DiscordActiveThreads}.
   *
   * @remarks
   * Returns both public and private threads.
   *
   * Threads are ordered by the `id` property in descending order.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#list-active-guild-threads}
   */
  getActiveThreads: (guildId: BigString) => Promise<Camelize<DiscordActiveThreads>>
  /** Get the applications info */
  getApplicationInfo: () => Promise<Camelize<DiscordApplication>>
  /**
   * Gets an automod rule by its ID.
   *
   * @param guildId - The ID of the guild to get the rule of.
   * @param ruleId - The ID of the rule to get.
   * @returns An instance of {@link DiscordAutoModerationRule}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule}
   */
  getAutomodRule: (guildId: BigString, ruleId: BigString) => Promise<Camelize<DiscordAutoModerationRule>>
  /**
   * Gets the list of automod rules for a guild.
   *
   * @param guildId - The ID of the guild to get the rules from.
   * @returns A collection of {@link DiscordAutoModerationRule} objects assorted by rule ID.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild}
   */
  getAutomodRules: (guildId: BigString) => Promise<Camelize<DiscordAutoModerationRule[]>>
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
   * Gets the list of invites for a channel.
   *
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
  getChannelInvites: (channelId: BigString) => Promise<Camelize<DiscordInviteMetadata[]>>
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
  getChannels: (guildId: BigString) => Promise<Camelize<DiscordChannel[]>>
  /**
   * Gets a list of webhooks for a channel.
   *
   * @param channelId - The ID of the channel which to get the webhooks of.
   * @returns A collection of {@link DiscordWebhook} objects assorted by webhook ID.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#get-channel-webhooks}
   */
  getChannelWebhooks: (channelId: BigString) => Promise<Camelize<DiscordWebhook[]>>
  /**
   * Gets or creates a DM channel with a user.
   *
   * @param userId - The ID of the user to create the DM channel with.
   * @returns An instance of {@link DiscordChannel}.
   *
   * @see {@link https://discord.com/developers/docs/resources/user#create-dm}
   */
  getDmChannel: (userId: BigString) => Promise<Camelize<DiscordChannel>>
  /**
   * Gets an emoji by its ID.
   *
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
   * @param guildId - The ID of the guild which to get the emojis of.
   * @returns A collection of {@link DiscordEmoji} objects assorted by emoji ID.
   *
   * @see {@link https://discord.com/developers/docs/resources/emoji#list-guild-emojis}
   */
  getEmojis: (guildId: BigString) => Promise<Camelize<DiscordEmoji[]>>
  /** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
  getGatewayBot: () => Promise<Camelize<DiscordGetGatewayBot>>
  /**
   * Gets the list of webhooks for a guild.
   *
   * @param guildId - The ID of the guild to get the list of webhooks for.
   * @returns A collection of {@link DiscordWebhook} objects assorted by webhook ID.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#get-guild-webhooks}
   */
  getGuildWebhooks: (guildId: BigString) => Promise<Camelize<DiscordWebhook[]>>
  /**
   * Gets the list of integrations attached to a guild.
   *
   * @param guildId - The ID of the guild to get the list of integrations from.
   * @returns A collection of {@link Integration} objects assorted by integration ID.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-integrations}
   */
  getIntegrations: (guildId: BigString) => Promise<Camelize<DiscordIntegration[]>>
  /**
   * Gets an invite to a channel by its invite code.
   *
   * @param inviteCode - The invite code of the invite to get.
   * @param options - The parameters for the fetching of the invite.
   * @returns An instance of {@link DiscordInviteMetadata}.
   *
   * @see {@link https://discord.com/developers/docs/resources/invite#get-invite}
   */
  getInvite: (inviteCode: string, options?: GetInvite) => Promise<Camelize<DiscordInviteMetadata>>
  /**
   * Gets the list of invites for a guild.
   *
   * @param guildId - The ID of the guild to get the invites from.
   * @returns A collection of {@link InviteMetadata | Invite} objects assorted by invite code.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/invite#get-invites}
   */
  getInvites: (guildId: BigString) => Promise<Camelize<DiscordInviteMetadata[]>>
  /**
   * Returns the list of sticker packs available to Nitro subscribers.
   *
   * @param bot The bot instance to use to make the request.
   * @returns A collection of {@link StickerPack} objects assorted by sticker ID.
   *
   * @see {@link https://discord.com/developers/docs/resources/sticker#list-nitro-sticker-packs}
   */
  getNitroStickerPacks: () => Promise<Camelize<DiscordStickerPack[]>>
  /**
   * Gets the list of private archived threads for a channel.
   *
   * @param channelId - The ID of the channel to get the archived threads for.
   * @param options - The parameters for the fetching of threads.
   * @returns An instance of {@link DiscordArchivedThreads}.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   * Requires the `MANAGE_THREADS` permission.
   *
   * Returns threads of type {@link ChannelTypes.GuildPrivateThread}.
   *
   * Threads are ordered by the `archive_timestamp` property included in the metadata of the object in descending order.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#list-private-archived-threads}
   */
  getPrivateArchivedThreads: (channelId: BigString, options?: ListArchivedThreads) => Promise<Camelize<DiscordArchivedThreads>>
  /**
   * Gets the list of private archived threads the bot is a member of for a channel.
   *
   * @param channelId - The ID of the channel to get the archived threads for.
   * @param options - The parameters for the fetching of threads.
   * @returns An instance of {@link DiscordArchivedThreads}.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * Returns threads of type {@link ChannelTypes.GuildPrivateThread}.
   *
   * Threads are ordered by the `id` property in descending order.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads}
   */
  getPrivateJoinedArchivedThreads: (channelId: BigString, options?: ListArchivedThreads) => Promise<Camelize<DiscordArchivedThreads>>
  /**
   * Gets the list of public archived threads for a channel.
   *
   * @param channelId - The ID of the channel to get the archived threads for.
   * @param options - The parameters for the fetching of threads.
   * @returns An instance of {@link ArchivedThreads}.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * If called on a channel of type {@link ChannelTypes.GuildText}, returns threads of type {@link ChannelTypes.GuildPublicThread}.
   * If called on a channel of type {@link ChannelTypes.GuildNews}, returns threads of type {@link ChannelTypes.GuildNewsThread}.
   *
   * Threads are ordered by the `archive_timestamp` property included in the metadata of the object in descending order.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#list-public-archived-threads}
   */
  getPublicArchivedThreads: (channelId: BigString, options?: ListArchivedThreads) => Promise<Camelize<DiscordArchivedThreads>>
  /**
   * Gets a scheduled event by its ID.
   *
   * @param guildId - The ID of the guild to get the scheduled event from.
   * @param eventId - The ID of the scheduled event to get.
   * @param options - The parameters for the fetching of the scheduled event.
   * @returns An instance of {@link ScheduledEvent}.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event}
   */
  getScheduledEvent: (guildId: BigString, eventId: BigString, options?: { withUserCount?: boolean }) => Promise<Camelize<DiscordScheduledEvent>>
  /**
   * Gets the list of scheduled events for a guild.
   *
   * @param guildId - The ID of the guild to get the scheduled events from.
   * @param options - The parameters for the fetching of the scheduled events.
   * @returns A collection of {@link ScheduledEvent} objects assorted by event ID.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild}
   */
  getScheduledEvents: (guildId: BigString, options?: GetScheduledEvents) => Promise<Camelize<DiscordScheduledEvent[]>>
  /**
   * Gets the list of subscribers to a scheduled event from a guild.
   *
   * @param guildId - The ID of the guild to get the subscribers to the scheduled event from.
   * @param eventId - The ID of the scheduled event to get the subscribers of.
   * @param options - The parameters for the fetching of the subscribers.
   * @returns A collection of {@link User} objects assorted by user ID.
   *
   * @remarks
   * Requires the `MANAGE_EVENTS` permission.
   *
   * Users are ordered by their IDs in _ascending_ order.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users}
   */
  getScheduledEventUsers: (
    guildId: BigString,
    eventId: BigString,
    options?: GetScheduledEventUsers,
  ) => Promise<Array<{ user: Camelize<DiscordUser>; member?: Camelize<DiscordMember> }>>
  /** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
  getSessionInfo: () => Promise<Camelize<DiscordGetGatewayBot>>
  /**
   * Gets the stage instance associated with a stage channel, if one exists.
   *
   * @param channelId - The ID of the stage channel the stage instance is associated with.
   * @returns An instance of {@link DiscordStageInstance}.
   *
   * @see {@link https://discord.com/developers/docs/resources/stage-instance#get-stage-instance}
   */
  getStageInstance: (channelId: BigString) => Promise<Camelize<DiscordStageInstance>>
  /**
   * Gets a thread member by their user ID.
   *
   * @param channelId - The ID of the thread to get the thread member of.
   * @param userId - The user ID of the thread member to get.
   * @returns An instance of {@link DiscordThreadMember}.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#get-thread-member}
   */
  getThreadMember: (channelId: BigString, userId: BigString) => Promise<Camelize<DiscordThreadMember>>
  /**
   * Gets the list of thread members for a thread.
   *
   * @param channelId - The ID of the thread to get the thread members of.
   * @returns A collection of {@link DiscordThreadMember} assorted by user ID.
   *
   * @remarks
   * Requires the application to have the `GUILD_MEMBERS` privileged intent enabled.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#list-thread-members}
   */
  getThreadMembers: (channelId: BigString) => Promise<Camelize<DiscordThreadMember[]>>
  /**
   * Get a user's data from the api
   *
   * @param id The user's id
   * @returns {Camelize<DiscordUser>}
   */
  getUser: (id: BigString) => Promise<Camelize<DiscordUser>>
  /**
   * Gets a webhook by its ID.
   *
   * @param webhookId - The ID of the webhook to get.
   * @returns An instance of {@link DiscordWebhook}.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook}
   */
  getWebhook: (webhookId: BigString) => Promise<Camelize<DiscordWebhook>>
  /**
   * Gets a webhook message by its ID.
   *
   * @param webhookId - The ID of the webhook to get a message of.
   * @param token - The webhook token, used to get webhook messages.
   * @param messageId - the ID of the webhook message to get.
   * @param options - The parameters for the fetching of the message.
   * @returns An instance of {@link DiscordMessage}.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook-message}
   */
  getWebhookMessage: (
    webhookId: BigString,
    token: string,
    messageId: BigString,
    options?: GetWebhookMessageOptions,
  ) => Promise<Camelize<DiscordMessage>>
  /**
   * Gets a webhook using the webhook token, thereby bypassing the need for authentication + permissions.
   *
   * @param webhookId - The ID of the webhook to get.
   * @param token - The webhook token, used to get the webhook.
   * @returns An instance of {@link DiscordWebhook}.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook-with-token}
   */
  getWebhookWithToken: (webhookId: BigString, token: string) => Promise<Camelize<DiscordWebhook>>
  /**
   * Adds the bot user to a thread.
   *
   * @param channelId - The ID of the thread to add the bot user to.
   *
   * @remarks
   * Requires the thread not be archived.
   *
   * Fires a _Thread Members Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#join-thread}
   */
  joinThread: (channelId: BigString) => Promise<void>
  /**
   * Removes the bot user from a thread.
   *
   * @param channelId - The ID of the thread to remove the bot user from.
   *
   * @remarks
   * Requires the thread not be archived.
   *
   * Fires a _Thread Members Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#leave-thread}
   */
  leaveThread: (channelId: BigString) => Promise<void>
  /**
   * Removes a member from a thread.
   *
   * @param channelId - The ID of the thread to remove the thread member of.
   * @param userId - The user ID of the thread member to remove.
   *
   * @remarks
   * If the thread is of type {@link ChannelTypes.GuildPrivateThread}, requires to be the creator of the thread.
   * Otherwise, requires the `MANAGE_THREADS` permission.
   *
   * Requires the thread not be archived.
   *
   * Fires a _Thread Members Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#remove-thread-member}
   */
  removeThreadMember: (channelId: BigString, userId: BigString) => Promise<void>
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
  /**
   * Creates a thread, using an existing message as its point of origin.
   *
   * @param channelId - The ID of the channel in which to create the thread.
   * @param messageId - The ID of the message to use as the thread's point of origin.
   * @param options - The parameters to use for the creation of the thread.
   * @returns An instance of the created {@link Channel | Thread}.
   *
   * @remarks
   * If called on a channel of type {@link ChannelTypes.GuildText}, creates a {@link ChannelTypes.GuildPublicThread}.
   * If called on a channel of type {@link ChannelTypes.GuildNews}, creates a {@link ChannelTypes.GuildNewsThread}.
   * Does not work on channels of type {@link ChannelTypes.GuildForum}.
   *
   * The ID of the created thread will be the same as the ID of the source message.
   *
   * Fires a _Thread Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-from-message}
   */
  startThreadWithMessage: (channelId: BigString, messageId: BigString, options: StartThreadWithMessage) => Promise<Camelize<DiscordChannel>>
  /**
   * Creates a thread without using a message as the thread's point of origin.
   *
   * @param channelId - The ID of the channel in which to create the thread.
   * @param options - The parameters to use for the creation of the thread.
   * @returns An instance of the created {@link DiscordChannel | Thread}.
   *
   * @remarks
   * Creating a private thread requires the server to be boosted.
   *
   * Fires a _Thread Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-without-message}
   */
  startThreadWithoutMessage: (channelId: BigString, options: StartThreadWithoutMessage) => Promise<Camelize<DiscordChannel>>
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
}

export type RequestMethods = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'
export type ApiVersions = 9 | 10

export interface CreateWebhook extends WithReason {
  /** Name of the webhook (1-80 characters) */
  name: string
  /** Image url for the default webhook avatar */
  avatar?: string | null
}

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

export interface WebhookMessageEditor {
  /**
   * Edits a webhook message.
   *
   * @param webhookId - The ID of the webhook to edit the message of.
   * @param token - The webhook token, used to edit the message.
   * @param messageId - The ID of the message to edit.
   * @param options - The parameters for the edit of the message.
   * @returns An instance of the edited {@link DiscordMessage}.
   *
   * @remarks
   * Fires a _Message Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#edit-webhook-message}
   */
  (webhookId: BigString, token: string, messageId: BigString, options: InteractionCallbackData & { threadId?: BigString }): Promise<
    Camelize<DiscordMessage>
  >
  /**
   * Edits the original webhook message.
   *
   * @param webhookId - The ID of the webhook to edit the original message of.
   * @param token - The webhook token, used to edit the message.
   * @param options - The parameters for the edit of the message.
   * @returns An instance of the edited {@link DiscordMessage}.
   *
   * @remarks
   * Fires a _Message Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#edit-webhook-message}
   */
  original: (webhookId: BigString, token: string, options: InteractionCallbackData & { threadId?: BigString }) => Promise<Camelize<DiscordMessage>>
}
