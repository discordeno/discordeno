import { InteractionResponseTypes } from '@discordeno/types'
import { camelize, delay, getBotIdFromToken, urlToBase64 } from '@discordeno/utils'

import { createInvalidRequestBucket } from './invalidBucket.js'
import { Queue } from './queue.js'

import type {
  ApplicationCommandPermissions,
  BigString,
  Camelize,
  CreateApplicationCommand,
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
  DiscordApplicationCommand,
  DiscordApplicationCommandPermissions,
  DiscordArchivedThreads,
  DiscordAutoModerationRule,
  DiscordChannel,
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
  DiscordMemberWithUser,
  DiscordMessage,
  DiscordScheduledEvent,
  DiscordStageInstance,
  DiscordStickerPack,
  DiscordTemplate,
  DiscordThreadMember,
  DiscordUser,
  DiscordWebhook,
  EditAutoModerationRuleOptions,
  EditChannelPermissionOverridesOptions,
  EditMessage,
  EditScheduledEvent,
  EditStageInstanceOptions,
  ExecuteWebhook,
  GetGuildPruneCountQuery,
  GetInvite,
  GetMessagesOptions,
  GetScheduledEvents,
  GetScheduledEventUsers,
  GetWebhookMessageOptions,
  InteractionCallbackData,
  InteractionResponse,
  ListArchivedThreads,
  ListGuildMembers,
  ModifyChannel,
  ModifyGuildChannelPositions,
  ModifyGuildEmoji,
  ModifyWebhook,
  SearchMembers,
  StartThreadWithMessage,
  StartThreadWithoutMessage,
  WithReason
} from '@discordeno/types'
import type { InvalidRequestBucket } from './invalidBucket.js'

// TODO: make dynamic based on package.json file
const version = '18.0.0-alpha.1'

export function createRestManager(options: CreateRestManagerOptions): RestManager {
  const rest: RestManager = {
    token: options.token,
    applicationId: options.applicationId ? BigInt(options.applicationId) : getBotIdFromToken(options.token),
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
        id: (webhookId) => {
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

        crosspost: (channelId, messageId) => {
          return `/channels/${channelId}/messages/${messageId}/crosspost`
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
          events: (guildId, withUserCount?: boolean) => {
            let url = `/guilds/${guildId}/scheduled-events?`

            if (withUserCount !== undefined) {
              url += `with_user_count=${withUserCount.toString()}`
            }
            return url
          },
          event: (guildId, eventId, withUserCount?: boolean) => {
            let url = `/guilds/${guildId}/scheduled-events/${eventId}`

            if (withUserCount !== undefined) {
              url += `with_user_count=${withUserCount.toString()}`
            }

            return url
          },
          users: (guildId, eventId, options?: GetScheduledEventUsers) => {
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
        members: {
          ban: (guildId, userId) => {
            return `/guilds/${guildId}/bans/${userId}`
          },
          bot: (guildId) => {
            return `/guilds/${guildId}/members/@me`
          },
          member: (guildId, userId) => {
            return `/guilds/${guildId}/members/${userId}`
          },
          members: (guildId, options) => {
            let url = `/guilds/${guildId}/members?`

            if (options !== undefined) {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.limit) url += `limit=${options.limit}`
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.after) url += `&after=${options.after}`
            }

            return url
          },
          search: (guildId, query, options) => {
            let url = `/guilds/${guildId}/members/search?query=${encodeURIComponent(query)}`

            if (options) {
              if (options.limit !== undefined) url += `&limit=${options.limit}`
            }

            return url
          },
          prune: (guildId, options) => {
            let url = `/guilds/${guildId}/prune?`

            if (options) {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.days) url += `days=${options.days}`
              if (Array.isArray(options.includeRoles)) {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                url += `&include_roles=${options.includeRoles.join(',')}`
              } else if (options.includeRoles) {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                url += `&include_roles=${options.includeRoles}`
              }
            }

            return url
          },
        },
        templates: {
          code: (code) => {
            return `/guilds/templates/${code}`
          },
          guild: (guildId, code) => {
            return `/guilds/${guildId}/templates/${code}`
          },
          all: (guildId) => {
            return `/guilds/${guildId}/templates`
          },
        },
        webhooks: (guildId) => {
          return `/guilds/${guildId}/webhooks`
        },
      },

      // Interaction Endpoints
      interactions: {
        commands: {
          // Application Endpoints
          commands: (applicationId) => {
            return `/applications/${applicationId}/commands`
          },

          guilds: {
            all(applicationId, guildId) {
              return `/applications/${applicationId}/guilds/${guildId}/commands`
            },

            one(applicationId, guildId, commandId, withLocalizations) {
              let url = `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}?`

              if (withLocalizations !== undefined) {
                url += `with_localizations=${withLocalizations.toString()}`
              }

              return url
            },
          },
          permissions: (applicationId, guildId) => {
            return `/applications/${applicationId}/guilds/${guildId}/commands/permissions`
          },
          permission: (applicationId, guildId, commandId) => {
            return `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`
          },
          command: (applicationId, commandId, withLocalizations) => {
            let url = `/applications/${applicationId}/commands/${commandId}?`

            if (withLocalizations !== undefined) {
              url += `withLocalizations=${withLocalizations.toString()}`
            }

            return url
          },
        },

        responses: {
          // Interaction Endpoints
          callback: (interactionId, token) => {
            return `/interactions/${interactionId}/${token}/callback`
          },
          original: (interactionId, token) => {
            return `/webhooks/${interactionId}/${token}/messages/@original`
          },
          message: (applicationId, token, messageId) => {
            return `/webhooks/${applicationId}/${token}/messages/${messageId}`
          },
        },
      },

      // User endpoints
      user(userId) {
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

    processRateLimitedPaths() {
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
    processHeaders(url, headers) {
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
      const response = await fetch(
        options.url,
        rest.createRequest({ method: options.method, url: options.url, body: options.body, ...options.options }),
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

    async makeRequest(method, url, body, options) {
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
          options,
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

    async put<T = void>(url: string, body?: Record<string, any>, options?: Record<string, any>) {
      return camelize(await rest.makeRequest('PUT', url, body, options)) as Camelize<T>
    },

    channels: {
      messages: {
        async delete(channelId, messageId, reason?) {
          return await rest.deleteMessage(channelId, messageId, reason)
        },
        async edit(channelId, messageId, options) {
          return await rest.editMessage(channelId, messageId, options)
        },

        async send(channelId, options) {
          return await rest.sendMessage(channelId, options)
        },

        async publish(channelId, messageId) {
          return await rest.publishMessage(channelId, messageId)
        },
      },

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

      templates: {
        async create(guildId, options) {
          return await rest.createGuildTemplate(guildId, options)
        },
        async delete(guildId, templateCode) {
          return await rest.deleteGuildTemplate(guildId, templateCode)
        },
        async edit(guildId, templateCode, options) {
          return await rest.editGuildTemplate(guildId, templateCode, options)
        },
        async get(templateCode) {
          return await rest.getGuildTemplate(templateCode)
        },
        async list(guildId) {
          return await rest.getGuildTemplates(guildId)
        },
        async sync(guildId) {
          return await rest.syncGuildTemplate(guildId)
        },
      },

      members: {
        async ban(guildId, userId, options) {
          return await rest.banMember(guildId, userId, options)
        },
        async edit(guildId, userId, options) {
          return await rest.editMember(guildId, userId, options)
        },

        async editSelf(guildId, options) {
          return await rest.editBotMember(guildId, options)
        },

        async get(guildId, userId) {
          return await rest.getMember(guildId, userId)
        },

        async dm(userId) {
          return await rest.getDmChannel(userId)
        },

        async kick(guildId, userId, reason) {
          return await rest.kickMember(guildId, userId, reason)
        },

        async list(guildId, options) {
          return await rest.getMembers(guildId, options)
        },

        async prune(guildId, options) {
          return await rest.pruneMembers(guildId, options)
        },

        async search(guildId, query, options) {
          return await rest.searchMembers(guildId, query, options)
        },

        async unban(guildId, userId) {
          return await rest.unbanMember(guildId, userId)
        },
      },

      interactions: {
        commands: {
          create: {
            async global(command) {
              return await rest.createGlobalApplicationCommand(command)
            },

            async guild(command, guildId) {
              return await rest.createGuildApplicationCommand(command, guildId)
            },
          },

          delete: {
            async global(commandId) {
              return await rest.deleteGlobalApplicationCommand(commandId)
            },

            async guild(commandId, guildId) {
              return await rest.deleteGuildApplicationCommand(commandId, guildId)
            },
          },

          edit: {
            async global(commandId, options) {
              return await rest.editGlobalApplicationCommand(commandId, options)
            },

            async guild(commandId, guildId, options) {
              return await rest.editGuildApplicationCommand(commandId, guildId, options)
            },

            async permissions(guildId, commandId, bearerToken, options) {
              return await rest.editApplicationCommandPermissions(guildId, commandId, bearerToken, options)
            },
          },

          get: {
            global: {
              async all() {
                return await rest.getGlobalApplicationCommands()
              },

              async one(commandId) {
                return await rest.getGlobalApplicationCommand(commandId)
              },
            },

            guilds: {
              async all(guildId) {
                return await rest.getGuildApplicationCommands(guildId)
              },

              async one(commandId, guildId) {
                return await rest.getGuildApplicationCommand(commandId, guildId)
              },
            },

            async permission(guildId, commandId) {
              return await rest.getApplicationCommandPermission(guildId, commandId)
            },

            async permissions(guildId) {
              return await rest.getApplicationCommandPermissions(guildId)
            },
          },

          replace: {
            async global(commands) {
              return await rest.upsertGlobalApplicationCommands(commands)
            },

            async guild(guildId, commands) {
              return await rest.upsertGuildApplicationCommands(guildId, commands)
            },
          },
        },

        responses: {
          create: {
            async followup(token, options) {
              return await rest.sendFollowupMessage(token, options)
            },

            async original(interactionId, token, options) {
              return await rest.sendInteractionResponse(interactionId, token, options)
            },
          },

          delete: {
            async followup(token, messageId) {
              return await rest.deleteFollowupMessage(token, messageId)
            },

            async original(token) {
              return await rest.deleteOriginalInteractionResponse(token)
            },
          },

          edit: {
            async followup(token, messageId, options) {
              return await rest.editFollowupMessage(token, messageId, options)
            },

            async original(token, options) {
              return await rest.editOriginalInteractionResponse(token, options)
            },
          },

          get: {
            async followup(token, messageId) {
              return await rest.getFollowupMessage(token, messageId)
            },

            async original(token) {
              return await rest.getOriginalInteractionResponse(token)
            },
          },
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

    async createGlobalApplicationCommand(command) {
      return await rest.post<DiscordApplicationCommand>(rest.routes.interactions.commands.commands(rest.applicationId), command)
    },

    async createGuildApplicationCommand(command, guildId) {
      return await rest.post<DiscordApplicationCommand>(rest.routes.interactions.commands.guilds.all(rest.applicationId, guildId), command)
    },

    async createGuildTemplate(guildId, options) {
      return await rest.post<DiscordTemplate>(rest.routes.guilds.templates.all(guildId), options)
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
      return await rest.delete(rest.routes.channels.channel(channelId), {
        reason,
      })
    },

    async deleteChannelPermissionOverride(channelId, overwriteId, reason) {
      return await rest.delete(rest.routes.channels.overwrite(channelId, overwriteId), reason ? { reason } : undefined)
    },

    async deleteEmoji(guildId, id, reason) {
      return await rest.delete(rest.routes.guilds.emoji(guildId, id), { reason })
    },

    async deleteFollowupMessage(token, messageId) {
      return await rest.delete(rest.routes.interactions.responses.message(rest.applicationId, token, messageId))
    },

    async deleteGlobalApplicationCommand(commandId) {
      return await rest.delete(rest.routes.interactions.commands.command(rest.applicationId, commandId))
    },

    async deleteGuildApplicationCommand(commandId, guildId) {
      return await rest.delete(rest.routes.interactions.commands.guilds.one(rest.applicationId, guildId, commandId))
    },

    async deleteGuildTemplate(guildId, templateCode) {
      return await rest.delete(rest.routes.guilds.templates.guild(guildId, templateCode))
    },

    async deleteIntegration(guildId, integrationId) {
      return await rest.delete(rest.routes.guilds.integration(guildId, integrationId))
    },

    async deleteInvite(inviteCode, reason) {
      return await rest.delete(rest.routes.guilds.invite(inviteCode), reason ? { reason } : undefined)
    },

    async deleteMessage(channelId, messageId, reason) {
      return await rest.delete(rest.routes.channels.message(channelId, messageId), { reason })
    },

    async deleteOriginalInteractionResponse(token) {
      return await rest.delete(rest.routes.interactions.responses.original(rest.applicationId, token))
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

    async editApplicationCommandPermissions(guildId, commandId, bearerToken, options) {
      return await rest.put<DiscordApplicationCommandPermissions>(
        rest.routes.interactions.commands.permission(rest.applicationId, guildId, commandId),
        {
          permissions: options,
        },
        {
          headers: { authorization: `Bearer ${bearerToken}` },
        },
      )
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

    /**
     * Edits a follow-up message to an interaction.
     *
     * @param token - The interaction token to use, provided in the original interaction.
     * @param messageId - The ID of the message to edit.
     * @param options - The parameters for the edit of the message.
     * @returns An instance of the edited {@link Message}.
     *
     * @remarks
     * Unlike `editMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
     *
     * Does not support ephemeral follow-up messages due to these being stateless.
     *
     * Fires a _Message Update_ event.
     *
     * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message}
     */
    async editFollowupMessage(token, messageId, options) {
      return await rest.patch<DiscordMessage>(rest.routes.interactions.responses.message(rest.applicationId, token, messageId), options)
    },

    async editGlobalApplicationCommand(commandId, options) {
      return await rest.patch<DiscordApplicationCommand>(rest.routes.interactions.commands.command(rest.applicationId, commandId), options)
    },

    async editGuildApplicationCommand(commandId, guildId, options) {
      return await rest.patch<DiscordApplicationCommand>(
        rest.routes.interactions.commands.guilds.one(rest.applicationId, guildId, commandId),
        options,
      )
    },

    async editGuildTemplate(guildId: BigString, templateCode: string, options: ModifyGuildTemplate): Promise<Camelize<DiscordTemplate>> {
      return await rest.patch<DiscordTemplate>(rest.routes.guilds.templates.guild(guildId, templateCode), options)
    },

    async editMessage(channelId, messageId, options) {
      return await rest.patch<DiscordMessage>(rest.routes.channels.message(channelId, messageId), options)
    },

    async editOriginalInteractionResponse(token, options) {
      return await rest.patch<DiscordMessage>(rest.routes.interactions.responses.original(rest.applicationId, token), options)
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

    async getApplicationCommandPermission(guildId, commandId) {
      return await rest.get<DiscordApplicationCommandPermissions>(
        rest.routes.interactions.commands.permission(rest.applicationId, guildId, commandId),
      )
    },

    async getApplicationCommandPermissions(guildId) {
      return await rest.get<DiscordApplicationCommandPermissions[]>(rest.routes.interactions.commands.permissions(rest.applicationId, guildId))
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

    async getDmChannel(userId) {
      return await rest.post<DiscordChannel>(rest.routes.channels.dm(), {
        recipient_id: userId.toString(),
      })
    },

    async getEmoji(guildId, emojiId) {
      return await rest.get<DiscordEmoji>(rest.routes.guilds.emoji(guildId, emojiId))
    },

    async getEmojis(guildId) {
      return await rest.get<DiscordEmoji[]>(rest.routes.guilds.emojis(guildId))
    },

    async getFollowupMessage(token, messageId) {
      return await rest.get<DiscordMessage>(rest.routes.interactions.responses.message(rest.applicationId, token, messageId))
    },

    async getGatewayBot() {
      return await rest.get<DiscordGetGatewayBot>(rest.routes.gatewayBot())
    },

    async getGlobalApplicationCommand(commandId) {
      return await rest.get<DiscordApplicationCommand>(rest.routes.interactions.commands.command(rest.applicationId, commandId))
    },

    async getGlobalApplicationCommands() {
      return await rest.get<DiscordApplicationCommand[]>(rest.routes.interactions.commands.commands(rest.applicationId))
    },

    async getGuildApplicationCommand(commandId, guildId) {
      return await rest.get<DiscordApplicationCommand>(rest.routes.interactions.commands.guilds.one(rest.applicationId, guildId, commandId))
    },

    async getGuildApplicationCommands(guildId) {
      return await rest.get<DiscordApplicationCommand[]>(rest.routes.interactions.commands.guilds.all(rest.applicationId, guildId))
    },

    async getGuildTemplate(templateCode) {
      return await rest.get<DiscordTemplate>(rest.routes.guilds.templates.code(templateCode))
    },

    async getGuildTemplates(guildId) {
      return await rest.get<DiscordTemplate[]>(rest.routes.guilds.templates.all(guildId))
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

    async getOriginalInteractionResponse(token) {
      return await rest.get<DiscordMessage>(rest.routes.interactions.responses.original(rest.applicationId, token))
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

    async publishMessage(channelId, messageId) {
      return await rest.post<DiscordMessage>(rest.routes.channels.crosspost(channelId, messageId))
    },

    async removeThreadMember(channelId, userId) {
      return await rest.delete(rest.routes.channels.threads.user(channelId, userId))
    },

    async sendFollowupMessage(token, options) {
      return await new Promise((resolve, reject) => {
        rest.sendRequest({
          url: rest.routes.webhooks.webhook(rest.applicationId, token),
          method: 'POST',
          body: rest.createRequest({
            method: 'POST',
            body: { ...options },
            // remove authorization header
            headers: { Authorization: '' },
          }),
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

    async sendInteractionResponse(interactionId, token, options) {
      return await new Promise((resolve, reject) => {
        rest.sendRequest({
          url: rest.routes.interactions.responses.callback(interactionId, token),
          method: 'POST',
          body: rest.createRequest({
            method: 'POST',
            body: { ...options },
            // remove authorization header
            headers: { Authorization: '' },
          }),
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

    async sendMessage(channelId, options) {
      return await rest.post<DiscordMessage>(rest.routes.channels.messages(channelId), options)
    },

    async startThreadWithMessage(channelId, messageId, options) {
      return await rest.post<DiscordChannel>(rest.routes.channels.threads.message(channelId, messageId), options)
    },

    async startThreadWithoutMessage(channelId, options) {
      return await rest.post<DiscordChannel>(rest.routes.channels.threads.all(channelId), options)
    },

    async syncGuildTemplate(guildId) {
      return await rest.put<DiscordTemplate>(rest.routes.guilds.templates.all(guildId))
    },

    async banMember(guildId, userId, options) {
      return await rest.put<void>(rest.routes.guilds.members.ban(guildId, userId), options)
    },

    async editBotMember(guildId, options) {
      return await rest.patch<DiscordMember>(rest.routes.guilds.members.bot(guildId), options)
    },

    async editMember(guildId, userId, options) {
      return await rest.patch<DiscordMemberWithUser>(rest.routes.guilds.members.member(guildId, userId), options)
    },

    async getMember(guildId, userId) {
      return await rest.get<DiscordMemberWithUser>(rest.routes.guilds.members.member(guildId, userId))
    },

    async getMembers(guildId, options) {
      return await rest.get<DiscordMemberWithUser[]>(rest.routes.guilds.members.members(guildId, options))
    },

    async kickMember(guildId, userId, reason) {
      return await rest.delete(rest.routes.guilds.members.member(guildId, userId), {
        reason,
      })
    },

    async pruneMembers(guildId, options) {
      return await rest.post<{ pruned: number | null }>(rest.routes.guilds.members.prune(guildId), options)
    },

    async searchMembers(guildId, query, options) {
      return await rest.get<DiscordMemberWithUser[]>(rest.routes.guilds.members.search(guildId, query, options))
    },

    async unbanMember(guildId, userId) {
      return await rest.delete(rest.routes.guilds.members.ban(guildId, userId))
    },

    async triggerTypingIndicator(channelId) {
      return await rest.post(rest.routes.channels.typing(channelId))
    },

    async upsertGlobalApplicationCommands(commands) {
      return await rest.put<DiscordApplicationCommand[]>(rest.routes.interactions.commands.commands(rest.applicationId), commands)
    },

    async upsertGuildApplicationCommands(guildId, commands) {
      return await rest.put<DiscordApplicationCommand[]>(rest.routes.interactions.commands.guilds.all(rest.applicationId, guildId), commands)
    },
  }

  return rest
}

export interface CreateRestManagerOptions {
  /** The bot token which will be used to make requests. */
  token: string
  /**
   * For old bots that have a different bot id and application id.
   * @default bot id from token
   */
  applicationId?: BigString
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
  /** The application id. Normally this is not required for recent bots but old bot's application id is sometimes different from the bot id so it is required for those bots. */
  applicationId: bigint
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
      /** Route for handling crossposting a specific message. */
      crosspost: (channelId: BigString, messageId: BigString) => string
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
      /** Routes for handling a guild's members. */
      members: {
        /** Route for handling a specific guild member's ban. */
        ban: (guildId: BigString, userId: BigString) => string
        /** Route for handling a the bot guild member. */
        bot: (guildId: BigString) => string
        /** Route for handling a specific guild member. */
        member: (guildId: BigString, userId: BigString) => string
        /** Route for handling non-specific guild members. */
        members: (guildId: BigString, options?: ListGuildMembers) => string
        /** Route for handling member searching in a guild. */
        search: (guildId: BigString, query: string, options?: { limit?: number }) => string
        /** Route for handling pruning guild members. */
        prune: (guildId: BigString, options?: GetGuildPruneCountQuery) => string
      }
      /** Routes for handling a guild's templates. */
      templates: {
        /** Route for handling a specifc guild's templates with a code only. */
        code: (code: string) => string
        /** Route for handling a specific guild's template with a guild id and code. */
        guild: (guildId: BigString, code: string) => string
        /** Route for handling non-specific guild's templates. */
        all: (guildId: BigString) => string
      }
    }
    /** Routes for interaction related endpoints. */
    interactions: {
      /** Routes for interaction command related endpoints. */
      commands: {
        /** Route for non-specific commands. */
        commands: (applicationId: BigString) => string
        /** Route for guild related commands. */
        guilds: {
          /** Route for non-specific guild commands. */
          all: (applicationId: BigString, guildId: BigString) => string
          /** Route for a specific guild command. */
          one: (applicationId: BigString, guildId: BigString, commandId: BigString, withLocalizations?: boolean) => string
        }
        /** Route for non-specific command permissions. */
        permissions: (applicationId: BigString, guildId: BigString) => string
        /** Route for a specific command's permission. */
        permission: (applicationId: BigString, guildId: BigString, commandId: BigString) => string
        /** Route for a specific command. */
        command: (applicationId: BigString, commandId: BigString, withLocalizations?: boolean) => string
      }
      /** Routes for interaction response related endpoints. */
      responses: {
        /** Route for handling a callback response with id and token. */
        callback: (interactionId: BigString, token: string) => string
        /** Route for handling the original response using id and token. */
        original: (interactionId: BigString, token: string) => string
        /** Route for handling a followup message from a interaction response. */
        message: (applicationId: BigString, token: string, messageId: BigString) => string
      }
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
  makeRequest: <T = unknown>(method: RequestMethods, url: string, body?: Record<string, any>, options?: Record<string, any>) => Promise<T>
  /** Takes a request and processes it into a queue. */
  processRequest: (request: SendRequestOptions) => void
  /** Make a get request to the api */
  get: <T = void>(url: string) => Promise<Camelize<T>>
  /** Make a post request to the api. */
  post: <T = void>(url: string, body?: Record<string, any>) => Promise<Camelize<T>>
  /** Make a put request to the api. */
  put: <T = void>(url: string, body?: Record<string, any>, options?: Record<string, any>) => Promise<Camelize<T>>
  /** Make a delete request to the api. */
  delete: (url: string, body?: Record<string, any>) => Promise<void>
  /** Make a patch request to the api. */
  patch: <T = void>(url: string, body?: Record<string, any>) => Promise<Camelize<T>>
  /** Helper methods related to channels */
  channels: {
    /** Methods related to messages in a channel */
    messages: {
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
      send: (channelId: BigString, options: CreateMessageOptions) => Promise<Camelize<DiscordMessage>>
      /**
       * Edits a message.
       *
       * @param channelId - The ID of the channel to edit the message in.
       * @param messageId - The IDs of the message to edit.
       * @param options - The parameters for the edit of the message.
       * @returns An instance of the edited {@link Message}.
       *
       * @remarks
       * If editing another user's message:
       * - Requires the `MANAGE_MESSAGES` permission.
       * - Only the {@link EditMessage.flags | flags} property of the {@link options} object parameter can be edited.
       *
       * Fires a _Message Update_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/channel#edit-message}
       */
      edit: (channelId: BigString, messageId: BigString, options: EditMessage) => Promise<Camelize<DiscordMessage>>
      /**
       * Cross-posts a message posted in an announcement channel to subscribed channels.
       *
       * @param channelId - The ID of the announcement channel.
       * @param messageId - The ID of the message to cross-post.
       * @returns An instance of the cross-posted {@link Message}.
       *
       * @remarks
       * Requires the `SEND_MESSAGES` permission.
       *
       * If not cross-posting own message:
       * - Requires the `MANAGE_MESSAGES` permission.
       *
       * Fires a _Message Create_ event in the guilds the subscribed channels are in.
       *
       * @see {@link https://discord.com/developers/docs/resources/channel#crosspost-message}
       */
      publish: (channelId: BigString, messageId: BigString) => Promise<Camelize<DiscordMessage>>
      /**
       * Deletes a message from a channel.
       *
       * @param channelId - The ID of the channel to delete the message from.
       * @param messageId - The ID of the message to delete from the channel.
       *
       * @remarks
       * If not deleting own message:
       * - Requires the `MANAGE_MESSAGES` permission.
       *
       * Fires a _Message Delete_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/channel#delete-message}
       */
      delete: (channelId: BigString, messageId: BigString, reason?: string) => Promise<void>
    }
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
        ) => Promise<
          Array<{
            user: Camelize<DiscordUser>
            member?: Camelize<DiscordMember>
          }>
        >
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
    /** Methods related to a guild's templates. */
    templates: {
      /**
       * Creates a template from a guild.
       *
       * @param guildId - The ID of the guild to create the template from.
       * @param options - The parameters for the creation of the template.
       * @returns An instance of the created {@link Template}.
       *
       * @remarks
       * Requires the `MANAGE_GUILD` permission.
       *
       * Fires a _Guild Update_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild-template#create-guild-template}
       */
      create: (guildId: BigString, options: CreateTemplate) => Promise<Camelize<DiscordTemplate>>
      /**
       * Deletes a template from a guild.
       *
       * @param guildId - The ID of the guild to delete the template from.
       * @param templateCode - The code of the template to delete.
       *
       * @remarks
       * Requires the `MANAGE_GUILD` permission.
       *
       * Fires a _Guild Update_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild-template#delete-guild-template}
       */
      delete: (guildId: BigString, templateCode: string) => Promise<void>
      /**
       * Edits a template's settings.
       *
       * @param guildId - The ID of the guild to edit a template of.
       * @param templateCode - The code of the template to edit.
       * @param options - The parameters for the edit of the template.
       * @returns An instance of the edited {@link Template}.
       *
       * @remarks
       * Requires the `MANAGE_GUILD` permission.
       *
       * Fires a _Guild Update_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild-template#modify-guild-template}
       */
      edit: (guildId: BigString, templateCode: string, options: ModifyGuildTemplate) => Promise<Camelize<DiscordTemplate>>
      /**
       * Gets a template by its code.
       *
       * @param templateCode - The code of the template to get.
       * @returns An instance of {@link Template}.
       *
       * @remarks
       * Requires the `MANAGE_GUILD` permission.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild-template#get-guild-template}
       */
      get: (templateCode: string) => Promise<Camelize<DiscordTemplate>>
      /**
       * Gets the list of templates for a guild.
       *
       * @param guildId - The ID of the guild to get the list of templates for.
       * @returns A collection of {@link Template} objects assorted by template code.
       *
       * @remarks
       * Requires the `MANAGE_GUILD` permission.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild-template#get-guild-templates}
       */
      list: (guildId: BigString) => Promise<Camelize<DiscordTemplate[]>>
      /**
       * Synchronises a template with the current state of a guild.
       *
       * @param guildId - The ID of the guild to synchronise a template of.
       * @returns An instance of the edited {@link Template}.
       *
       * @remarks
       * Requires the `MANAGE_GUILD` permission.
       *
       * Fires a _Guild Update_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild-template#get-guild-templates}
       */
      sync: (guildId: BigString) => Promise<Camelize<DiscordTemplate>>
    }

    /* Guild Members related helper methods. */
    members: {
      /**
       * Bans a user from a guild.
       *
       * @param guildId - The ID of the guild to ban the user from.
       * @param userId - The ID of the user to ban from the guild.
       * @param options - The parameters for the creation of the ban.
       *
       * @remarks
       * Requires the `BAN_MEMBERS` permission.
       *
       * Fires a _Guild Ban Add_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild#create-guild-ban}
       */
      ban: (guildId: BigString, userId: BigString, options?: CreateGuildBan) => Promise<void>
      /**
       * Edits the nickname of the bot user.
       *
       * @param guildId - The ID of the guild to edit the nickname of the bot user in.
       * @param options - The parameters for the edit of the nickname.
       * @returns An instance of the edited {@link DiscordMember}
       *
       * @remarks
       * Fires a _Guild Member Update_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild#modify-current-member}
       */
      editSelf: (guildId: BigString, options: EditBotMemberOptions) => Promise<Camelize<DiscordMember>>
      /**
       * Edits a member's properties.
       *
       * @param guildId - The ID of the guild to edit the member of.
       * @param userId - The user ID of the member to edit.
       * @param options - The parameters for the edit of the user.
       *
       * @remarks
       * This endpoint requires various permissions depending on what is edited about the member.
       * To find out the required permission to enact a change, read the documentation of this endpoint's {@link ModifyGuildMember | parameters}.
       *
       * Fires a _Guild Member Update_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-member}
       */
      edit: (guildId: BigString, userId: BigString, options: ModifyGuildMember) => Promise<Camelize<DiscordMember>>
      /**
       * Gets or creates a DM channel with a user.
       *
       * @param userId - The ID of the user to create the DM channel with.
       * @returns An instance of {@link Channel}.
       *
       * @see {@link https://discord.com/developers/docs/resources/user#create-dm}
       */
      dm: (userId: BigString) => Promise<Camelize<DiscordChannel>>
      /**
       * Gets the member object by user ID.
       *
       * @param guildId - The ID of the guild to get the member object for.
       * @param userId - The ID of the user to get the member object for.
       * @returns An instance of {@link DiscordMemberWithUser}.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-member}
       */
      get: (guildId: BigString, userId: BigString) => Promise<Camelize<DiscordMemberWithUser>>
      /**
       * Gets the list of members for a guild.
       *
       * @param guildId - The ID of the guild to get the list of members for.
       * @param options - The parameters for the fetching of the members.
       * @returns A collection of {@link DiscordMemberWithUser} objects assorted by user ID.
       *
       * @remarks
       * Requires the `GUILD_MEMBERS` intent.
       *
       * ⚠️ It is not recommended to use this endpoint with very large bots. Instead, opt to use `fetchMembers()`:
       * REST communication only permits 50 requests to be made per second, while gateways allow for up to 120 requests
       * per minute per shard. For more information, read {@link https://discord.com/developers/docs/topics/rate-limits#rate-limits}.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild#list-guild-members}
       * @see {@link https://discord.com/developers/docs/topics/gateway#request-guild-members}
       * @see {@link https://discord.com/developers/docs/topics/rate-limits#rate-limits}
       */
      list: (guildId: BigString, options: ListGuildMembers) => Promise<Camelize<DiscordMemberWithUser[]>>
      /**
       * Kicks a member from a guild.
       *
       * @param guildId - The ID of the guild to kick the member from.
       * @param userId - The user ID of the member to kick from the guild.
       *
       * @remarks
       * Requires the `KICK_MEMBERS` permission.
       *
       * Fires a _Guild Member Remove_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild#remove-guild-member}
       */
      kick: (guildId: BigString, userId: BigString, reason?: string) => Promise<void>
      /**
       * Initiates the process of pruning inactive members.
       *
       * @param guildId - The ID of the guild to prune the members of.
       * @param options - The parameters for the pruning of members.
       * @returns A number indicating how many members were pruned.
       *
       * @remarks
       * Requires the `KICK_MEMBERS` permission.
       *
       * ❗ Requests to this endpoint will time out for large guilds. To prevent this from happening, set the {@link BeginGuildPrune.computePruneCount} property of the {@link options} object parameter to `false`. This will begin the process of pruning, and immediately return `undefined`, rather than wait for the process to complete before returning the actual count of members that have been kicked.
       *
       * ⚠️ By default, this process will not remove members with a role. To include the members who have a _particular subset of roles_, specify the role(s) in the {@link BeginGuildPrune.includeRoles | includeRoles} property of the {@link options} object parameter.
       *
       * Fires a _Guild Member Remove_ gateway event for every member kicked.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild#begin-guild-prune}
       */
      prune: (guildId: BigString, options: BeginGuildPrune) => Promise<{ pruned: number | null }>
      /**
       * Gets the list of members whose usernames or nicknames start with a provided string.
       *
       * @param guildId - The ID of the guild to search in.
       * @param query - The string to match usernames or nicknames against.
       * @param options - The parameters for searching through the members.
       * @returns A collection of {@link DiscordMember} objects assorted by user ID.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild#search-guild-members}
       */
      search: (guildId: BigString, query: string, options?: Omit<SearchMembers, 'query'>) => Promise<Camelize<DiscordMemberWithUser[]>>
      /**
       * Unbans a user from a guild.
       *
       * @param guildId - The ID of the guild to unban the user in.
       * @param userId - The ID of the user to unban.
       *
       * @remarks
       * Requires the `BAN_MEMBERS` permission.
       *
       * Fires a _Guild Ban Remove_ gateway event.
       *
       * @see {@link https://discord.com/developers/docs/resources/guild#remove-guild-ban}
       */
      unban: (guildId: BigString, userId: BigString) => Promise<void>
    }
    /** Interaction related helper methods. */
    interactions: {
      /** Command related helper methods. */
      commands: {
        /** Methods for creating a command. */
        create: {
          /**
           * Creates an application command accessible globally; across different guilds and channels.
           *
           * @param command - The command to create.
           * @returns An instance of the created {@link ApplicationCommand}.
           *
           * @remarks
           * ⚠️ Creating a command with the same name as an existing command for your application will overwrite the old command.
           * ⚠️ Global commands once created are cached for periods of __an hour__, so changes made to existing commands will take an hour to surface.
           * ⚠️ You can only create up to 200 _new_ commands daily.
           *
           * @see {@link https://discord.com/developers/docs/interactions/application-commands#create-global-application-command}
           */
          global: (command: CreateApplicationCommand) => Promise<Camelize<DiscordApplicationCommand>>
          /**
           * Creates an application command only accessible in a specific guild.
           *
           * @param command - The command to create.
           * @param guildId - The ID of the guild to create the command for.
           * @returns An instance of the created {@link ApplicationCommand}.
           *
           * @remarks
           * ⚠️ Creating a command with the same name as an existing command for your application will overwrite the old command.
           * ⚠️ You can only create up to 200 _new_ commands daily.
           *
           * @see {@link https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command}
           */
          guild: (command: CreateApplicationCommand, guildId: BigString) => Promise<Camelize<DiscordApplicationCommand>>
        }
        /** Methods for deleting a command. */
        delete: {
          /**
           * Deletes an application command registered globally.
           *
           * @param commandId - The ID of the command to delete.
           *
           * @see {@link https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command}
           */
          global: (commandId: BigString) => Promise<void>
          /**
           * Deletes an application command registered in a guild.
           *
           * @param guildId - The ID of the guild to delete the command from.
           * @param commandId - The ID of the command to delete from the guild.
           *
           * @see {@link https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command}
           */
          guild: (commandId: BigString, guildId: BigString) => Promise<void>
        }
        /** Methods for editing a command. */
        edit: {
          /**
           * Edits a global application command.
           *
           * @param commandId - The ID of the command to edit.
           * @param options - The parameters for the edit of the command.
           * @returns An instance of the edited {@link ApplicationCommand}.
           *
           * @see {@link https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command}
           */
          global: (commandId: BigString, options: CreateApplicationCommand) => Promise<Camelize<DiscordApplicationCommand>>
          /**
           * Edits an application command registered in a guild.
           *
           * @param guildId - The ID of the guild the command is registered in.
           * @param commandId - The ID of the command to edit.
           * @param options - The parameters for the edit of the command.
           * @returns An instance of the edited {@link ApplicationCommand}.
           *
           * @see {@link https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command}
           */
          guild: (commandId: BigString, guildId: BigString, options: CreateApplicationCommand) => Promise<Camelize<DiscordApplicationCommand>>
          /**
           * Edits the permissions for a guild application command.
           *
           * @param guildId - The ID of the guild the command is registered in.
           * @param commandId - The ID of the command to edit the permissions of.
           * @param bearerToken - The bearer token to use to make the request.
           * @param options - The parameters for the edit of the command permissions.
           * @returns An instance of the edited {@link ApplicationCommandPermission}.
           *
           * @remarks
           * The bearer token requires the `applications.commands.permissions.update` scope to be enabled, and to have access to the guild whose ID has been provided in the parameters.
           *
           * @see {@link https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions}
           */
          permissions: (
            guildId: BigString,
            commandId: BigString,
            bearerToken: string,
            options: ApplicationCommandPermissions[],
          ) => Promise<Camelize<DiscordApplicationCommandPermissions>>
        }
        /** Methods for getting a command. */
        get: {
          global: {
            /**
             * Gets a global application command by its ID.
             *
             * @param commandId - The ID of the command to get.
             * @returns An instance of {@link ApplicationCommand}.
             *
             * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-command}
             */
            one: (commandId: BigString) => Promise<Camelize<DiscordApplicationCommand>>
            /**
             * Gets the list of your bot's global application commands.
             *
             * @returns A collection of {@link ApplicationCommand} objects assorted by command ID.
             *
             * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands}
             */
            all: () => Promise<Camelize<DiscordApplicationCommand[]>>
          }
          guilds: {
            /**
             * Gets a guild application command by its ID.
             *
             * @param guildId - The ID of the guild the command is registered in.
             * @param commandId - The ID of the command to get.
             * @returns An instance of {@link ApplicationCommand}.
             *
             * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command}
             */
            one: (commandId: BigString, guildId: BigString) => Promise<Camelize<DiscordApplicationCommand>>
            /**
             * Gets the list of application commands registered by your bot in a guild.
             *
             * @param guildId - The ID of the guild the commands are registered in.
             * @returns A collection of {@link ApplicationCommand} objects assorted by command ID.
             *
             * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-commandss}
             */
            all: (guildId: BigString) => Promise<Camelize<DiscordApplicationCommand[]>>
          }
          /**
           * Gets the permissions of a guild application command.
           *
           * @param guildId - The ID of the guild the command is registered in.
           * @param commandId - The ID of the command to get the permissions of.
           * @returns An instance of {@link ApplicationCommandPermission}.
           *
           * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions}
           */
          permission: (guildId: BigString, commandId: BigString) => Promise<Camelize<DiscordApplicationCommandPermissions>>
          /**
           * Gets the permissions of all application commands registered in a guild by the ID of the guild.
           *
           * @param guildId - The ID of the guild to get the permissions objects of.
           * @returns A collection of {@link ApplicationCommandPermission} objects assorted by command ID.
           *
           * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions}
           */
          permissions: (guildId: BigString) => Promise<Camelize<DiscordApplicationCommandPermissions[]>>
        }
        /** Methods for replacing existing commands in bulk. */
        replace: {
          /**
           * Re-registers the list of global application commands, overwriting the previous commands completely.
           *
           * @param commands - The list of commands to use to overwrite the previous list.
           * @returns A collection of {@link ApplicationCommand} objects assorted by command ID.
           *
           * @remarks
           * ❗ Commands that are not present in the `commands` array will be __deleted__.
           *
           * ⚠️ Commands that do not already exist will count towards the daily limit of _200_ new commands.
           *
           * @see {@link https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands}
           */
          global: (commands: CreateApplicationCommand[]) => Promise<Camelize<DiscordApplicationCommand[]>>
          /**
           * Re-registers the list of application commands registered in a guild, overwriting the previous commands completely.
           *
           * @param guildId - The ID of the guild whose list of commands to overwrite.
           * @param commands - The list of commands to use to overwrite the previous list.
           * @returns A collection of {@link ApplicationCommand} objects assorted by command ID.
           *
           * @remarks
           * ❗ Commands that are not present in the `commands` array will be __deleted__.
           *
           * ⚠️ Commands that do not already exist will count towards the daily limit of _200_ new commands.
           *
           * @see {@link https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands}
           */
          guild: (guildId: BigString, commands: CreateApplicationCommand[]) => Promise<Camelize<DiscordApplicationCommand[]>>
        }
      }
      /** Response related helper methods. */
      responses: {
        /** Helper methods related to creating a response. */
        create: {
          /**
           * Sends a follow-up message to an interaction.
           *
           * @param token - The interaction token to use, provided in the original interaction.
           * @param options - The parameters for the creation of the message.
           * @returns An instance of the created {@link Message}.
           *
           * @remarks
           * ⚠️ Interaction tokens are only valid for _15 minutes_.
           *
           * By default, mentions are suppressed. To enable mentions, pass a mention object with the callback data.
           *
           * Unlike `sendMessage()`, this endpoint allows the bot user to act without:
           * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
           * - Requiring the `MESSAGE_CONTENT` intent.
           *
           * Fires a _Message Create_ event.
           *
           * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message}
           */
          followup: (token: string, options: InteractionResponse) => Promise<Camelize<DiscordMessage>>
          /**
           * Sends a response to an interaction.
           *
           * @param interactionId - The ID of the interaction to respond to.
           * @param token - The interaction token to use, provided in the original interaction.
           * @param options - The parameters for the creation of the message.
           * @returns An instance of the created {@link Message}.
           *
           * @remarks
           * ⚠️ Interaction tokens are only valid for _15 minutes_.
           *
           * By default, mentions are suppressed. To enable mentions, pass a mention object with the callback data.
           *
           * Unlike `sendMessage()`, this endpoint allows the bot user to act without:
           * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
           * - Requiring the `MESSAGE_CONTENT` intent.
           *
           * Fires a _Message Create_ event.
           *
           * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response}
           */
          original: (interactionId: BigString, token: string, options: InteractionResponse) => Promise<void>
        }
        /** Helper methods related to deleting a response. */
        delete: {
          /**
           * Deletes a follow-up message to an interaction.
           *
           * @param token - The interaction token to use, provided in the original interaction.
           * @param messageId - The ID of the message to delete.
           *
           * @remarks
           * Unlike `deleteMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
           *
           * Fires a _Message Delete_ event.
           *
           * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message}
           */
          followup: (token: string, messageId: BigString) => Promise<void>
          /**
           * Deletes the initial message response to an interaction.
           *
           * @param token - The interaction token to use, provided in the original interaction.
           *
           * @remarks
           * Unlike `deleteMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
           *
           * Fires a _Message Delete_ event.
           *
           * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response}
           */
          original: (token: string) => Promise<void>
        }
        /** Helper methods related to editing a response. */
        edit: {
          /**
           * Edits a follow-up message to an interaction.
           *
           * @param token - The interaction token to use, provided in the original interaction.
           * @param messageId - The ID of the message to edit.
           * @param options - The parameters for the edit of the message.
           * @returns An instance of the edited {@link Message}.
           *
           * @remarks
           * Unlike `editMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
           *
           * Does not support ephemeral follow-up messages due to these being stateless.
           *
           * Fires a _Message Update_ event.
           *
           * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message}
           */
          followup: (token: string, messageId: BigString, options: InteractionCallbackData) => Promise<Camelize<DiscordMessage>>
          /**
           * Edits the initial message response to an interaction.
           *
           * @param token - The interaction token to use, provided in the original interaction.
           * @param options - The parameters for the edit of the response.
           * @returns An instance of the edited {@link Message}.
           *
           * @remarks
           * Unlike `editMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
           *
           * Does not support ephemeral follow-up messages due to these being stateless.
           *
           * Fires a _Message Update_ event.
           *
           * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response}
           */
          original: (token: string, options: InteractionCallbackData) => Promise<Camelize<DiscordMessage> | undefined>
        }
        /** Helper methods related to getting a response. */
        get: {
          /**
           * Gets a follow-up message to an interaction by the ID of the message.
           *
           * @param token - The interaction token to use, provided in the original interaction.
           * @param messageId - The ID of the message to get.
           * @returns An instance of {@link Message}.
           *
           * @remarks
           * Unlike `getMessage()`, this endpoint allows the bot user to act without:
           * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
           * - Requiring the `MESSAGE_CONTENT` intent.
           *
           * Does not support ephemeral follow-up messages due to these being stateless.
           *
           * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message}
           */
          followup: (token: string, messageId: BigString) => Promise<Camelize<DiscordMessage>>
          /**
           * Gets the initial message response to an interaction.
           *
           * @param token - The interaction token to use, provided in the original interaction.
           * @returns An instance of {@link Message}.
           *
           * @remarks
           * Unlike `getMessage()`, this endpoint allows the bot user to act without:
           * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
           * - Requiring the `MESSAGE_CONTENT` intent.
           *
           * Does not support ephemeral follow-up messages due to these being stateless.
           *
           * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response}
           */
          original: (token: string) => Promise<Camelize<DiscordMessage>>
        }
      }
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
   * Creates an application command accessible globally; across different guilds and channels.
   *
   * @param command - The command to create.
   * @returns An instance of the created {@link ApplicationCommand}.
   *
   * @remarks
   * ⚠️ Creating a command with the same name as an existing command for your application will overwrite the old command.
   * ⚠️ Global commands once created are cached for periods of __an hour__, so changes made to existing commands will take an hour to surface.
   * ⚠️ You can only create up to 200 _new_ commands daily.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#create-global-application-command}
   */
  createGlobalApplicationCommand: (command: CreateApplicationCommand) => Promise<Camelize<DiscordApplicationCommand>>
  /**
   * Creates an application command only accessible in a specific guild.
   *
   * @param command - The command to create.
   * @param guildId - The ID of the guild to create the command for.
   * @returns An instance of the created {@link ApplicationCommand}.
   *
   * @remarks
   * ⚠️ Creating a command with the same name as an existing command for your application will overwrite the old command.
   * ⚠️ You can only create up to 200 _new_ commands daily.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command}
   */
  createGuildApplicationCommand: (command: CreateApplicationCommand, guildId: BigString) => Promise<Camelize<DiscordApplicationCommand>>
  /**
   * Creates a template from a guild.
   *
   * @param guildId - The ID of the guild to create the template from.
   * @param options - The parameters for the creation of the template.
   * @returns An instance of the created {@link Template}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-template#create-guild-template}
   */
  createGuildTemplate: (guildId: BigString, options: CreateTemplate) => Promise<Camelize<DiscordTemplate>>
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
   * Deletes a follow-up message to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @param messageId - The ID of the message to delete.
   *
   * @remarks
   * Unlike `deleteMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
   *
   * Fires a _Message Delete_ event.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message}
   */
  deleteFollowupMessage: (token: string, messageId: BigString) => Promise<void>
  /**
   * Deletes an application command registered globally.
   *
   * @param commandId - The ID of the command to delete.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command}
   */
  deleteGlobalApplicationCommand: (commandId: BigString) => Promise<void>
  /**
   * Deletes an application command registered in a guild.
   *
   * @param guildId - The ID of the guild to delete the command from.
   * @param commandId - The ID of the command to delete from the guild.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command}
   */
  deleteGuildApplicationCommand: (commandId: BigString, guildId: BigString) => Promise<void>
  /**
   * Deletes a template from a guild.
   *
   * @param guildId - The ID of the guild to delete the template from.
   * @param templateCode - The code of the template to delete.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-template#delete-guild-template}
   */
  deleteGuildTemplate: (guildId: BigString, templateCode: string) => Promise<void>
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
   * Deletes a message from a channel.
   *
   * @param channelId - The ID of the channel to delete the message from.
   * @param messageId - The ID of the message to delete from the channel.
   *
   * @remarks
   * If not deleting own message:
   * - Requires the `MANAGE_MESSAGES` permission.
   *
   * Fires a _Message Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#delete-message}
   */
  deleteMessage: (channelId: BigString, messageId: BigString, reason?: string) => Promise<void>
  /**
   * Deletes the initial message response to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   *
   * @remarks
   * Unlike `deleteMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
   *
   * Fires a _Message Delete_ event.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response}
   */
  deleteOriginalInteractionResponse: (token: string) => Promise<void>
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
   * Edits the permissions for a guild application command.
   *
   * @param guildId - The ID of the guild the command is registered in.
   * @param commandId - The ID of the command to edit the permissions of.
   * @param bearerToken - The bearer token to use to make the request.
   * @param options - The parameters for the edit of the command permissions.
   * @returns An instance of the edited {@link ApplicationCommandPermission}.
   *
   * @remarks
   * The bearer token requires the `applications.commands.permissions.update` scope to be enabled, and to have access to the guild whose ID has been provided in the parameters.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions}
   */
  editApplicationCommandPermissions: (
    guildId: BigString,
    commandId: BigString,
    bearerToken: string,
    options: ApplicationCommandPermissions[],
  ) => Promise<Camelize<DiscordApplicationCommandPermissions>>
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
   * Edits a follow-up message to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @param messageId - The ID of the message to edit.
   * @param options - The parameters for the edit of the message.
   * @returns An instance of the edited {@link Message}.
   *
   * @remarks
   * Unlike `editMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
   *
   * Does not support ephemeral follow-up messages due to these being stateless.
   *
   * Fires a _Message Update_ event.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message}
   */
  editFollowupMessage: (token: string, messageId: BigString, options: InteractionCallbackData) => Promise<Camelize<DiscordMessage>>
  /**
   * Edits a global application command.
   *
   * @param commandId - The ID of the command to edit.
   * @param options - The parameters for the edit of the command.
   * @returns An instance of the edited {@link ApplicationCommand}.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command}
   */
  editGlobalApplicationCommand: (commandId: BigString, options: CreateApplicationCommand) => Promise<Camelize<DiscordApplicationCommand>>
  /**
   * Edits an application command registered in a guild.
   *
   * @param guildId - The ID of the guild the command is registered in.
   * @param commandId - The ID of the command to edit.
   * @param options - The parameters for the edit of the command.
   * @returns An instance of the edited {@link ApplicationCommand}.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command}
   */
  editGuildApplicationCommand: (
    commandId: BigString,
    guildId: BigString,
    options: CreateApplicationCommand,
  ) => Promise<Camelize<DiscordApplicationCommand>>
  /**
   * Edits a template's settings.
   *
   * @param guildId - The ID of the guild to edit a template of.
   * @param templateCode - The code of the template to edit.
   * @param options - The parameters for the edit of the template.
   * @returns An instance of the edited {@link Template}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-template#modify-guild-template}
   */
  editGuildTemplate: (guildId: BigString, templateCode: string, options: ModifyGuildTemplate) => Promise<Camelize<DiscordTemplate>>
  /**
   * Edits a message.
   *
   * @param channelId - The ID of the channel to edit the message in.
   * @param messageId - The IDs of the message to edit.
   * @param options - The parameters for the edit of the message.
   * @returns An instance of the edited {@link Message}.
   *
   * @remarks
   * If editing another user's message:
   * - Requires the `MANAGE_MESSAGES` permission.
   * - Only the {@link EditMessage.flags | flags} property of the {@link options} object parameter can be edited.
   *
   * Fires a _Message Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#edit-message}
   */
  editMessage: (channelId: BigString, messageId: BigString, options: EditMessage) => Promise<Camelize<DiscordMessage>>
  /**
   * Edits the initial message response to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @param options - The parameters for the edit of the response.
   * @returns An instance of the edited {@link Message}.
   *
   * @remarks
   * Unlike `editMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
   *
   * Does not support ephemeral follow-up messages due to these being stateless.
   *
   * Fires a _Message Update_ event.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response}
   */
  editOriginalInteractionResponse: (token: string, options: InteractionCallbackData) => Promise<Camelize<DiscordMessage> | undefined>
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
   * Gets the permissions of a guild application command.
   *
   * @param guildId - The ID of the guild the command is registered in.
   * @param commandId - The ID of the command to get the permissions of.
   * @returns An instance of {@link ApplicationCommandPermission}.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions}
   */
  getApplicationCommandPermission: (guildId: BigString, commandId: BigString) => Promise<Camelize<DiscordApplicationCommandPermissions>>
  /**
   * Gets the permissions of all application commands registered in a guild by the ID of the guild.
   *
   * @param guildId - The ID of the guild to get the permissions objects of.
   * @returns A collection of {@link ApplicationCommandPermission} objects assorted by command ID.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions}
   */
  getApplicationCommandPermissions: (guildId: BigString) => Promise<Camelize<DiscordApplicationCommandPermissions[]>>
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
  /**
   * Gets a follow-up message to an interaction by the ID of the message.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @param messageId - The ID of the message to get.
   * @returns An instance of {@link Message}.
   *
   * @remarks
   * Unlike `getMessage()`, this endpoint allows the bot user to act without:
   * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
   * - Requiring the `MESSAGE_CONTENT` intent.
   *
   * Does not support ephemeral follow-up messages due to these being stateless.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message}
   */
  getFollowupMessage: (token: string, messageId: BigString) => Promise<Camelize<DiscordMessage>>
  /** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
  getGatewayBot: () => Promise<Camelize<DiscordGetGatewayBot>>
  /**
   * Gets a global application command by its ID.
   *
   * @param commandId - The ID of the command to get.
   * @returns An instance of {@link ApplicationCommand}.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-command}
   */
  getGlobalApplicationCommand: (commandId: BigString) => Promise<Camelize<DiscordApplicationCommand>>
  /**
   * Gets the list of your bot's global application commands.
   *
   * @returns A collection of {@link ApplicationCommand} objects assorted by command ID.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands}
   */
  getGlobalApplicationCommands: () => Promise<Camelize<DiscordApplicationCommand[]>>
  /**
   * Gets a guild application command by its ID.
   *
   * @param guildId - The ID of the guild the command is registered in.
   * @param commandId - The ID of the command to get.
   * @returns An instance of {@link ApplicationCommand}.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command}
   */
  getGuildApplicationCommand: (commandId: BigString, guildId: BigString) => Promise<Camelize<DiscordApplicationCommand>>
  /**
   * Gets the list of application commands registered by your bot in a guild.
   *
   * @param guildId - The ID of the guild the commands are registered in.
   * @returns A collection of {@link ApplicationCommand} objects assorted by command ID.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-commandss}
   */
  getGuildApplicationCommands: (guildId: BigString) => Promise<Camelize<DiscordApplicationCommand[]>>
  /**
   * Gets a template by its code.
   *
   * @param templateCode - The code of the template to get.
   * @returns An instance of {@link Template}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-template#get-guild-template}
   */
  getGuildTemplate: (templateCode: string) => Promise<Camelize<DiscordTemplate>>
  /**
   * Gets the list of templates for a guild.
   *
   * @param guildId - The ID of the guild to get the list of templates for.
   * @returns A collection of {@link Template} objects assorted by template code.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-template#get-guild-templates}
   */
  getGuildTemplates: (guildId: BigString) => Promise<Camelize<DiscordTemplate[]>>
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
   * Gets the initial message response to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @returns An instance of {@link Message}.
   *
   * @remarks
   * Unlike `getMessage()`, this endpoint allows the bot user to act without:
   * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
   * - Requiring the `MESSAGE_CONTENT` intent.
   *
   * Does not support ephemeral follow-up messages due to these being stateless.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response}
   */
  getOriginalInteractionResponse: (token: string) => Promise<Camelize<DiscordMessage>>
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
   * Cross-posts a message posted in an announcement channel to subscribed channels.
   *
   * @param channelId - The ID of the announcement channel.
   * @param messageId - The ID of the message to cross-post.
   * @returns An instance of the cross-posted {@link Message}.
   *
   * @remarks
   * Requires the `SEND_MESSAGES` permission.
   *
   * If not cross-posting own message:
   * - Requires the `MANAGE_MESSAGES` permission.
   *
   * Fires a _Message Create_ event in the guilds the subscribed channels are in.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#crosspost-message}
   */
  publishMessage: (channelId: BigString, messageId: BigString) => Promise<Camelize<DiscordMessage>>
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
   * Sends a follow-up message to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @param options - The parameters for the creation of the message.
   * @returns An instance of the created {@link Message}.
   *
   * @remarks
   * ⚠️ Interaction tokens are only valid for _15 minutes_.
   *
   * By default, mentions are suppressed. To enable mentions, pass a mention object with the callback data.
   *
   * Unlike `sendMessage()`, this endpoint allows the bot user to act without:
   * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
   * - Requiring the `MESSAGE_CONTENT` intent.
   *
   * Fires a _Message Create_ event.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message}
   */
  sendFollowupMessage: (token: string, options: InteractionResponse) => Promise<Camelize<DiscordMessage>>
  /**
   * Sends a response to an interaction.
   *
   * @param interactionId - The ID of the interaction to respond to.
   * @param token - The interaction token to use, provided in the original interaction.
   * @param options - The parameters for the creation of the message.
   * @returns An instance of the created {@link Message}.
   *
   * @remarks
   * ⚠️ Interaction tokens are only valid for _15 minutes_.
   *
   * By default, mentions are suppressed. To enable mentions, pass a mention object with the callback data.
   *
   * Unlike `sendMessage()`, this endpoint allows the bot user to act without:
   * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
   * - Requiring the `MESSAGE_CONTENT` intent.
   *
   * Fires a _Message Create_ event.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response}
   */
  sendInteractionResponse: (interactionId: BigString, token: string, options: InteractionResponse) => Promise<void>
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
   * Synchronises a template with the current state of a guild.
   *
   * @param guildId - The ID of the guild to synchronise a template of.
   * @returns An instance of the edited {@link Template}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-template#get-guild-templates}
   */
  syncGuildTemplate: (guildId: BigString) => Promise<Camelize<DiscordTemplate>>
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
  /**
   * Re-registers the list of global application commands, overwriting the previous commands completely.
   *
   * @param commands - The list of commands to use to overwrite the previous list.
   * @returns A collection of {@link ApplicationCommand} objects assorted by command ID.
   *
   * @remarks
   * ❗ Commands that are not present in the `commands` array will be __deleted__.
   *
   * ⚠️ Commands that do not already exist will count towards the daily limit of _200_ new commands.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands}
   */
  upsertGlobalApplicationCommands: (commands: CreateApplicationCommand[]) => Promise<Camelize<DiscordApplicationCommand[]>>
  /**
   * Re-registers the list of application commands registered in a guild, overwriting the previous commands completely.
   *
   * @param guildId - The ID of the guild whose list of commands to overwrite.
   * @param commands - The list of commands to use to overwrite the previous list.
   * @returns A collection of {@link ApplicationCommand} objects assorted by command ID.
   *
   * @remarks
   * ❗ Commands that are not present in the `commands` array will be __deleted__.
   *
   * ⚠️ Commands that do not already exist will count towards the daily limit of _200_ new commands.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands}
   */
  upsertGuildApplicationCommands: (guildId: BigString, commands: CreateApplicationCommand[]) => Promise<Camelize<DiscordApplicationCommand[]>>
  /**
 * Bans a user from a guild.
 *

 * @param guildId - The ID of the guild to ban the user from.
 * @param userId - The ID of the user to ban from the guild.
 * @param options - The parameters for the creation of the ban.
 *
 * @remarks
 * Requires the `BAN_MEMBERS` permission.
 *
 * Fires a _Guild Ban Add_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#create-guild-ban}
 */
  banMember: (guildId: BigString, userId: BigString, options?: CreateGuildBan) => Promise<void>
  /**
   * Edits the nickname of the bot user.
   *
   * @param guildId - The ID of the guild to edit the nickname of the bot user in.
   * @param options - The parameters for the edit of the nickname.
   * @returns An instance of the edited {@link DiscordMember}
   *
   * @remarks
   * Fires a _Guild Member Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#modify-current-member}
   */
  editBotMember: (guildId: BigString, options: EditBotMemberOptions) => Promise<Camelize<DiscordMember>>
  /**
   * Edits a member's properties.
   *
   * @param guildId - The ID of the guild to edit the member of.
   * @param userId - The user ID of the member to edit.
   * @param options - The parameters for the edit of the user.
   *
   * @remarks
   * This endpoint requires various permissions depending on what is edited about the member.
   * To find out the required permission to enact a change, read the documentation of this endpoint's {@link ModifyGuildMember | parameters}.
   *
   * Fires a _Guild Member Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-member}
   */
  editMember: (guildId: BigString, userId: BigString, options: ModifyGuildMember) => Promise<Camelize<DiscordMember>>
  /**
 * Gets the member object by user ID.
 *

 * @param guildId - The ID of the guild to get the member object for.
 * @param userId - The ID of the user to get the member object for.
 * @returns An instance of {@link DiscordMemberWithUser}.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-member}
 */
  getMember: (guildId: BigString, userId: BigString) => Promise<Camelize<DiscordMemberWithUser>>
  /**
   * Gets the list of members for a guild.
   *
   * @param guildId - The ID of the guild to get the list of members for.
   * @param options - The parameters for the fetching of the members.
   * @returns A collection of {@link DiscordMemberWithUser} objects assorted by user ID.
   *
   * @remarks
   * Requires the `GUILD_MEMBERS` intent.
   *
   * ⚠️ It is not recommended to use this endpoint with very large bots. Instead, opt to use `fetchMembers()`:
   * REST communication only permits 50 requests to be made per second, while gateways allow for up to 120 requests
   * per minute per shard. For more information, read {@link https://discord.com/developers/docs/topics/rate-limits#rate-limits}.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#list-guild-members}
   * @see {@link https://discord.com/developers/docs/topics/gateway#request-guild-members}
   * @see {@link https://discord.com/developers/docs/topics/rate-limits#rate-limits}
   */
  getMembers: (guildId: BigString, options: ListGuildMembers) => Promise<Camelize<DiscordMemberWithUser[]>>

  /**
 * Kicks a member from a guild.
 *

 * @param guildId - The ID of the guild to kick the member from.
 * @param userId - The user ID of the member to kick from the guild.
 *
 * @remarks
 * Requires the `KICK_MEMBERS` permission.
 *
 * Fires a _Guild Member Remove_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#remove-guild-member}
 */
  kickMember: (guildId: BigString, userId: BigString, reason?: string) => Promise<void>
  /**
 * Initiates the process of pruning inactive members.
 *

 * @param guildId - The ID of the guild to prune the members of.
 * @param options - The parameters for the pruning of members.
 * @returns A number indicating how many members were pruned.
 *
 * @remarks
 * Requires the `KICK_MEMBERS` permission.
 *
 * ❗ Requests to this endpoint will time out for large guilds. To prevent this from happening, set the {@link BeginGuildPrune.computePruneCount} property of the {@link options} object parameter to `false`. This will begin the process of pruning, and immediately return `undefined`, rather than wait for the process to complete before returning the actual count of members that have been kicked.
 *
 * ⚠️ By default, this process will not remove members with a role. To include the members who have a _particular subset of roles_, specify the role(s) in the {@link BeginGuildPrune.includeRoles | includeRoles} property of the {@link options} object parameter.
 *
 * Fires a _Guild Member Remove_ gateway event for every member kicked.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#begin-guild-prune}
 */
  pruneMembers: (guildId: BigString, options: BeginGuildPrune) => Promise<{ pruned: number | null }>
  /**
 * Gets the list of members whose usernames or nicknames start with a provided string.
 *

 * @param guildId - The ID of the guild to search in.
 * @param query - The string to match usernames or nicknames against.
 * @param options - The parameters for searching through the members.
 * @returns A collection of {@link DiscordMember} objects assorted by user ID.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#search-guild-members}
 */
  searchMembers: (guildId: BigString, query: string, options?: Omit<SearchMembers, 'query'>) => Promise<Camelize<DiscordMemberWithUser[]>>
  /**
 * Unbans a user from a guild.
 *

 * @param guildId - The ID of the guild to unban the user in.
 * @param userId - The ID of the user to unban.
 *
 * @remarks
 * Requires the `BAN_MEMBERS` permission.
 *
 * Fires a _Guild Ban Remove_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#remove-guild-ban}
 */
  unbanMember: (guildId: BigString, userId: BigString) => Promise<void>
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
  /** Additional request options, used for things like overriding authorization header. */
  options?: Record<string, any>
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
export interface CreateTemplate {
  /** Name which the template should have */
  name: string
  /** Description of the template */
  description?: string
}
/** https://discord.com/developers/docs/resources/template#modify-guild-template */
export interface ModifyGuildTemplate {
  /** Name of the template (1-100 characters) */
  name?: string
  /** Description of the template (0-120 characters) */
  description?: string | null
}
/** https://discord.com/developers/docs/resources/guild#create-guild-ban */
export interface CreateGuildBan extends WithReason {
  /** Number of seconds to delete messages for, between 0 and 604800 (7 days) */
  deleteMessageSeconds?: number
}
export interface EditBotMemberOptions extends WithReason {
  nick?: string | null
}
/** https://discord.com/developers/docs/resources/guild#modify-guild-member */
export interface ModifyGuildMember {
  /** Value to set users nickname to. Requires the `MANAGE_NICKNAMES` permission */
  nick?: string | null
  /** Array of role ids the member is assigned. Requires the `MANAGE_ROLES` permission */
  roles?: BigString[] | null
  /** Whether the user is muted in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the `MUTE_MEMBERS` permission */
  mute?: boolean | null
  /** Whether the user is deafened in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the `MOVE_MEMBERS` permission */
  deaf?: boolean | null
  /** Id of channel to move user to (if they are connected to voice). Requires the `MOVE_MEMBERS` permission */
  channelId?: BigString | null
  /** when the user's timeout will expire and the user will be able to communicate in the guild again (up to 28 days in the future), set to null to remove timeout. Requires the `MODERATE_MEMBERS` permission */
  communicationDisabledUntil?: number | null
}
/** https://discord.com/developers/docs/resources/guild#begin-guild-prune */
export interface BeginGuildPrune {
  /** Number of days to prune (1 or more), default: 7 */
  days?: number
  /** Whether 'pruned' is returned, discouraged for large guilds, default: true */
  computePruneCount?: boolean
  /** Role(s) ro include, default: none */
  includeRoles?: string[]
}
