/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-const-assign */
import { InteractionResponseTypes } from '@discordeno/types'
import {
  calculateBits,
  camelize,
  camelToSnakeCase,
  delay,
  encode,
  getBotIdFromToken,
  isGetMessagesAfter,
  isGetMessagesAround,
  isGetMessagesBefore,
  isGetMessagesLimit,
  logger,
  processReactionString,
  urlToBase64,
} from '@discordeno/utils'
import fetch from 'node-fetch'

import { createInvalidRequestBucket } from './invalidBucket.js'
import { Queue } from './queue.js'

import type {
  BigString,
  Camelize,
  DiscordApplication,
  DiscordApplicationCommand,
  DiscordApplicationCommandPermissions,
  DiscordAuditLog,
  DiscordAutoModerationRule,
  DiscordBan,
  DiscordChannel,
  DiscordEmoji,
  DiscordFollowedChannel,
  DiscordGetGatewayBot,
  DiscordGuild,
  DiscordGuildPreview,
  DiscordGuildWidget,
  DiscordGuildWidgetSettings,
  DiscordIntegration,
  DiscordInvite,
  DiscordInviteMetadata,
  DiscordListActiveThreads,
  DiscordListArchivedThreads,
  DiscordMember,
  DiscordMemberWithUser,
  DiscordMessage,
  DiscordPrunedCount,
  DiscordRole,
  DiscordScheduledEvent,
  DiscordStageInstance,
  DiscordSticker,
  DiscordStickerPack,
  DiscordTemplate,
  DiscordThreadMember,
  DiscordUser,
  DiscordVanityUrl,
  DiscordVoiceRegion,
  DiscordWebhook,
  DiscordWelcomeScreen,
  FileContent,
  GetMessagesOptions,
  GetScheduledEventUsers,
  MfaLevels,
  ModifyGuildTemplate,
} from '@discordeno/types'
import type { CreateRequestBodyOptions, CreateRestManagerOptions, RestManager, SendRequestOptions } from './types.js'

// TODO: make dynamic based on package.json file
const version = '19.0.0-alpha.1'

export function createRestManager(options: CreateRestManagerOptions): RestManager {
  // Falsy token string check
  if (!options.token) throw new Error('You must provide a valid token.')

  const rest: RestManager = {
    token: options.token,
    applicationId: options.applicationId ? BigInt(options.applicationId) : getBotIdFromToken(options.token),
    version: options.version ?? 10,
    baseUrl: options.proxy?.baseUrl ?? 'https://discord.com/api',
    maxRetryCount: Infinity,
    globallyRateLimited: false,
    processingRateLimitedPaths: false,
    deleteQueueDelay: 60000,
    queues: new Map(),
    rateLimitedPaths: new Map(),
    invalidBucket: createInvalidRequestBucket({}),
    authorization: options.proxy?.authorization,

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
        bulk: (channelId) => {
          return `/channels/${channelId}/messages/bulk-delete`
        },
        dm: () => {
          return '/users/@me/channels'
        },
        pin: (channelId, messageId) => {
          return `/channels/${channelId}/pins/${messageId}`
        },
        pins: (channelId) => {
          return `/channels/${channelId}/pins`
        },
        reactions: {
          bot: (channelId, messageId, emoji) => {
            return `/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}/@me`
          },
          user: (channelId, messageId, emoji, userId) => {
            return `/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}/${userId}`
          },
          all: (channelId, messageId) => {
            return `/channels/${channelId}/messages/${messageId}/reactions`
          },
          emoji: (channelId, messageId, emoji, options) => {
            let url = `/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}?`

            if (options) {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.after) url += `after=${options.after}`
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.limit) url += `&limit=${options.limit}`
            }

            return url
          },
          message: (channelId, messageId, emoji, options) => {
            let url = `/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}?`

            if (options) {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.after) url += `after=${options.after}`
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.limit) url += `&limit=${options.limit}`
            }

            return url
          },
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
          let url = `/channels/${channelId}/messages?`

          if (options) {
            if (isGetMessagesAfter(options) && options.after) {
              url += `after=${options.after}`
            }
            if (isGetMessagesBefore(options) && options.before) {
              url += `&before=${options.before}`
            }
            if (isGetMessagesAround(options) && options.around) {
              url += `&around=${options.around}`
            }
            if (isGetMessagesLimit(options) && options.limit) {
              url += `&limit=${options.limit}`
            }
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
        all: () => {
          return '/guilds'
        },
        auditlogs: (guildId, options) => {
          let url = `/guilds/${guildId}/audit-logs?`

          if (options) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            if (options.actionType) url += `action_type=${options.actionType}`
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            if (options.before) url += `&before=${options.before}`
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            if (options.after) url += `&after=${options.after}`
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            if (options.limit) url += `&limit=${options.limit}`
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            if (options.userId) url += `&user_id=${options.userId}`
          }

          return url
        },
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
        guild(guildId, withCounts) {
          let url = `/guilds/${guildId}?`

          if (withCounts !== undefined) {
            url += `with_counts=${withCounts.toString()}`
          }

          return url
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
        leave: (guildId) => {
          return `/users/@me/guilds/${guildId}`
        },
        members: {
          ban: (guildId, userId) => {
            return `/guilds/${guildId}/bans/${userId}`
          },
          bans: (guildId, options) => {
            let url = `/guilds/${guildId}/bans?`

            if (options) {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.limit) url += `limit=${options.limit}`
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.after) url += `&after=${options.after}`
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              if (options.before) url += `&before=${options.before}`
            }

            return url
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
        mfa: (guildId) => `/guilds/${guildId}/mfa`,
        preview: (guildId) => {
          return `/guilds/${guildId}/preview`
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
        roles: {
          one: (guildId, roleId) => {
            return `/guilds/${guildId}/roles/${roleId}`
          },
          all: (guildId) => {
            return `/guilds/${guildId}/roles`
          },
          member: (guildId, memberId, roleId) => {
            return `/guilds/${guildId}/members/${memberId}/roles/${roleId}`
          },
        },
        stickers: (guildId) => {
          return `/guilds/${guildId}/stickers`
        },
        sticker: (guildId, stickerId) => {
          return `/guilds/${guildId}/stickers/${stickerId}`
        },
        voice: (guildId, userId) => {
          return `/guilds/${guildId}/voice-states/${userId ?? '@me'}`
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
        vanity: (guildId) => {
          return `/guilds/${guildId}/vanity-url`
        },
        regions: (guildId) => {
          return `/guilds/${guildId}/regions`
        },
        webhooks: (guildId) => {
          return `/guilds/${guildId}/webhooks`
        },
        welcome: (guildId) => {
          return `/guilds/${guildId}/welcome-screen`
        },
        widget: (guildId) => {
          return `/guilds/${guildId}/widget`
        },
        widgetJson: (guildId) => {
          return `/guilds/${guildId}/widget.json`
        },
      },

      sticker: (stickerId: BigString) => {
        return `/stickers/${stickerId}`
      },

      regions: () => {
        return '/voice/regions'
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

    changeToDiscordFormat(obj: any): any {
      if (obj === null) return null

      if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
          return obj.map((item) => rest.changeToDiscordFormat(item))
        }

        const newObj: any = {}

        for (const key of Object.keys(obj)) {
          // Keys that dont require snake casing
          if (['permissions', 'allow', 'deny'].includes(key)) {
            newObj[key] = calculateBits(obj[key])
            continue
          }

          if (key === 'defaultMemberPermissions') {
            newObj.default_member_permissions = calculateBits(obj[key])
            continue
          }

          newObj[camelToSnakeCase(key)] = rest.changeToDiscordFormat(obj[key])
        }

        return newObj
      }

      if (typeof obj === 'bigint') return obj.toString()

      return obj
    },

    createRequest(method, options) {
      const headers: Record<string, string> = {
        'user-agent': `DiscordBot (https://github.com/discordeno/discordeno, v${version})`,
      }

      if (!options?.unauthorized) headers.authorization = `Bot ${rest.token}`

      // IF A REASON IS PROVIDED ENCODE IT IN HEADERS
      if (options?.reason !== undefined) {
        headers['x-audit-log-reason'] = encodeURIComponent(options?.reason)
      }

      let body: string | FormData | undefined

      // TODO: check if we need to add specific check for GET method
      // Since GET does not allow bodies

      // Have to check for attachments first, since body then has to be send in a different way.
      if (options?.files !== undefined) {
        const form = new FormData()
        for (let i = 0; i < options.files.length; ++i) {
          form.append(`file${i}`, options.files[i].blob, options.files[i].name)
        }

        form.append('payload_json', JSON.stringify({ ...options.body, files: undefined }))

        body = form

        // No need to set the `content-type` header since `fetch` does that automatically for us when we use a `FormData` object.
      } else if (options?.body !== undefined) {
        if (options.body instanceof FormData) {
          body = options.body
          // No need to set the `content-type` header since `fetch` does that automatically for us when we use a `FormData` object.
        } else {
          body = JSON.stringify(rest.changeToDiscordFormat(options.body))
          headers['content-type'] = `application/json`
        }
      }

      // SOMETIMES SPECIAL HEADERS (E.G. CUSTOM AUTHORIZATION) NEED TO BE USED
      if (options?.headers) {
        Object.assign(headers, options.headers)
      }

      return {
        body,
        headers,
        method,
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
      const url = options.url.startsWith('https://') ? options.url : `${rest.baseUrl}/v${rest.version}${options.url}`
      const payload = rest.createRequest(options.method, options.requestBodyOptions)

      logger.debug(`sending request to ${url}`, 'with payload:', { ...payload, headers: { ...payload.headers, authorization: 'Bot tokenhere' } })
      const response = await fetch(url, payload)
      logger.debug(`request fetched from ${url} with status ${response.status} & ${response.statusText}`)

      // Set the bucket id if it was available on the headers
      const bucketId = rest.processHeaders(rest.simplifyUrl(options.url, options.method), response.headers)
      if (bucketId) options.bucketId = bucketId

      if (response.status < 200 || response.status >= 400) {
        logger.debug(`Request to ${url} failed.`)

        if (response.status === 429) {
          logger.debug(`Request to ${url} was ratelimited.`)
          // Too many attempts, get rid of request from queue.
          if (options.retryCount++ >= rest.maxRetryCount) {
            logger.debug(`Request to ${url} exceeded the maximum allowed retries.`, 'with payload:', payload)
            // rest.debug(`[REST - RetriesMaxed] ${JSON.stringify(options)}`)
            // Remove item from queue to prevent retry
            options.reject({
              ok: false,
              status: response.status,
              error: 'The options was rate limited and it maxed out the retries limit.',
            })
            return
          }

          // Rate limited, add back to queue
          rest.invalidBucket.handleCompletedRequest(response.status, response.headers.get('X-RateLimit-Scope') === 'shared')

          const resetAfter = response.headers.get('x-ratelimit-reset-after')
          if (resetAfter) await delay(Number(resetAfter) * 1000)
          // process the response to prevent mem leak
          await response.json()

          return await options.retryRequest?.(options)
        }

        options.reject({ ok: false, status: response.status, body: JSON.stringify(await response.json()) })
        return
      }

      const is204 = response.status === 204
      const json = is204 ? undefined : await response.json()
      // Discord sometimes sends no response with 204 code
      options.resolve({ ok: true, status: response.status, body: JSON.stringify(json) })
    },

    simplifyUrl(url, method) {
      const parts = url.split('/')
      const secondLastPart = parts[parts.length - 2]

      if (secondLastPart === 'channels' || secondLastPart === 'guilds') {
        return url
      }

      if (secondLastPart === 'reactions' || parts[parts.length - 1] === '@me') {
        parts.splice(-2)
        parts.push('reactions')
      } else {
        parts.splice(-1)
        parts.push('x')
      }

      if (parts[parts.length - 3] === 'reactions') {
        parts.splice(-2)
      }

      if (method === 'DELETE' && secondLastPart === 'messages') {
        return `D${parts.join('/')}`
      }

      return parts.join('/')
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
        const bucketQueue = new Queue(rest, { url, deleteQueueDelay: rest.deleteQueueDelay })

        // Add request to queue
        bucketQueue.makeRequest(request)
        // Save queue
        rest.queues.set(url, bucketQueue)
      }
    },

    async makeRequest(method, url, options) {
      if (!rest.baseUrl.startsWith('https://discord.com') && url[0] === '/') {
        // Special handling for sending blobs across http to proxy
        // TODO: fix this hacky handling
        if (!(options?.body instanceof FormData) && !Array.isArray(options?.body) && options?.body?.file) {
          if (!Array.isArray(options.body.file)) {
            options.body.file = [options.body.file]
          }
          // convert blobs to string before sending to proxy
          options.body.file = await Promise.all(
            (options.body.file as FileContent[]).map(async (f: FileContent) => {
              const url = encode(await f.blob.arrayBuffer())

              return { name: f.name, blob: `data:${f.blob.type};base64,${url}` }
            }),
          )
        }

        const headers: HeadersInit = {
          Authorization: rest.authorization ?? '',
        }
        if (options?.body) {
          headers['Content-Type'] = 'application/json'
        }

        const result = await fetch(`${rest.baseUrl}${url}`, {
          body: options?.body ? JSON.stringify(options.body) : undefined,
          headers,
          method,
        })

        if (!result.ok) {
          const err = (await result.json().catch(() => { })) as Record<string, any>
          // Legacy Handling to not break old code or when body is missing
          if (!err?.body) throw new Error(`Error: ${err.message ?? result.statusText}`)
          throw new Error(JSON.stringify(err))
        }

        return result.status !== 204 ? ((await result.json()) as any) : undefined
      }

      return await new Promise((resolve, reject) => {
        const payload: SendRequestOptions = {
          url,
          method,
          requestBodyOptions: options,
          retryCount: 0,
          retryRequest: async function(payload: SendRequestOptions) {
            rest.processRequest(payload)
          },
          resolve: (data) => {
            resolve(data.status !== 204 ? JSON.parse(data.body ?? '{}') : undefined)
          },
          reject,
        }

        rest.processRequest(payload)
      })
    },

    async get<T = Record<string, unknown>>(url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) {
      return camelize(await rest.makeRequest('GET', url, options)) as Camelize<T>
    },

    async post<T = Record<string, unknown>>(url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) {
      return camelize(await rest.makeRequest('POST', url, options)) as Camelize<T>
    },

    async delete(url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) {
      camelize(await rest.makeRequest('DELETE', url, options))
    },

    async patch<T = Record<string, unknown>>(url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) {
      return camelize(await rest.makeRequest('PATCH', url, options)) as Camelize<T>
    },

    async put<T = void>(url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) {
      return camelize(await rest.makeRequest('PUT', url, options)) as Camelize<T>
    },

    async addReaction(channelId, messageId, reaction) {
      reaction = processReactionString(reaction)

      await rest.put(rest.routes.channels.reactions.bot(channelId, messageId, reaction))
    },

    async addReactions(channelId, messageId, reactions, ordered = false) {
      if (!ordered) {
        await Promise.all(
          reactions.map(async (reaction) => {
            await rest.addReaction(channelId, messageId, reaction)
          }),
        )
        return
      }

      for (const reaction of reactions) {
        await rest.addReaction(channelId, messageId, reaction)
      }
    },

    async addRole(guildId, userId, roleId, reason) {
      await rest.put(rest.routes.guilds.roles.member(guildId, userId, roleId), { reason })
    },

    async addThreadMember(channelId, userId) {
      await rest.put(rest.routes.channels.threads.user(channelId, userId))
    },

    async createAutomodRule(guildId, body) {
      return await rest.post<DiscordAutoModerationRule>(rest.routes.guilds.automod.rules(guildId), { body })
    },

    async createChannel(guildId, body) {
      return await rest.post<DiscordChannel>(rest.routes.guilds.channels(guildId), { body })
    },

    async createEmoji(guildId, body) {
      return await rest.post<DiscordEmoji>(rest.routes.guilds.emojis(guildId), { body })
    },

    async createGlobalApplicationCommand(body) {
      return await rest.post<DiscordApplicationCommand>(rest.routes.interactions.commands.commands(rest.applicationId), { body })
    },

    async createGuild(body) {
      return await rest.post<DiscordGuild>(rest.routes.guilds.all(), { body })
    },

    async createGuildApplicationCommand(body, guildId) {
      return await rest.post<DiscordApplicationCommand>(rest.routes.interactions.commands.guilds.all(rest.applicationId, guildId), { body })
    },

    async createGuildFromTemplate(templateCode, body) {
      if (body.icon) {
        body.icon = await urlToBase64(body.icon)
      }

      return await rest.post<DiscordGuild>(rest.routes.guilds.templates.code(templateCode), { body })
    },

    async createGuildSticker(guildId, options) {
      const form = new FormData()
      form.append('file', options.file.blob, options.file.name)
      form.append('name', options.name)
      form.append('description', options.description)
      form.append('tags', options.tags)

      return await rest.post<DiscordSticker>(rest.routes.guilds.stickers(guildId), { body: form })
    },

    async createGuildTemplate(guildId, body) {
      return await rest.post<DiscordTemplate>(rest.routes.guilds.templates.all(guildId), { body })
    },

    async createForumThread(channelId, body) {
      return await rest.post<DiscordChannel>(rest.routes.channels.forum(channelId), { body, files: body.files })
    },

    async createInvite(channelId, body = {}) {
      return await rest.post<DiscordInvite>(rest.routes.channels.invites(channelId), { body })
    },

    async createRole(guildId, body, reason) {
      return await rest.post<DiscordRole>(rest.routes.guilds.roles.all(guildId), { body, reason })
    },

    async createScheduledEvent(guildId, body) {
      return await rest.post<DiscordScheduledEvent>(rest.routes.guilds.events.events(guildId), { body })
    },

    async createStageInstance(body) {
      return await rest.post<DiscordStageInstance>(rest.routes.channels.stages(), { body })
    },

    async createWebhook(channelId, options, reason) {
      return await rest.post<DiscordWebhook>(rest.routes.channels.webhooks(channelId), {
        body: {
          name: options.name,
          avatar: options.avatar ? await urlToBase64(options.avatar) : undefined,
        },
        reason,
      })
    },

    async deleteAutomodRule(guildId, ruleId, reason) {
      await rest.delete(rest.routes.guilds.automod.rule(guildId, ruleId), { reason })
    },

    async deleteChannel(channelId, reason) {
      await rest.delete(rest.routes.channels.channel(channelId), {
        reason,
      })
    },

    async deleteChannelPermissionOverride(channelId, overwriteId, reason) {
      await rest.delete(rest.routes.channels.overwrite(channelId, overwriteId), { reason })
    },

    async deleteEmoji(guildId, id, reason) {
      await rest.delete(rest.routes.guilds.emoji(guildId, id), { reason })
    },

    async deleteFollowupMessage(token, messageId) {
      await rest.delete(rest.routes.interactions.responses.message(rest.applicationId, token, messageId))
    },

    async deleteGlobalApplicationCommand(commandId) {
      await rest.delete(rest.routes.interactions.commands.command(rest.applicationId, commandId))
    },

    async deleteGuild(guildId) {
      await rest.delete(rest.routes.guilds.guild(guildId))
    },

    async deleteGuildApplicationCommand(commandId, guildId) {
      await rest.delete(rest.routes.interactions.commands.guilds.one(rest.applicationId, guildId, commandId))
    },

    async deleteGuildSticker(guildId, stickerId, reason) {
      await rest.delete(rest.routes.guilds.sticker(guildId, stickerId), { reason })
    },

    async deleteGuildTemplate(guildId, templateCode) {
      await rest.delete(rest.routes.guilds.templates.guild(guildId, templateCode))
    },

    async deleteIntegration(guildId, integrationId) {
      await rest.delete(rest.routes.guilds.integration(guildId, integrationId))
    },

    async deleteInvite(inviteCode, reason) {
      await rest.delete(rest.routes.guilds.invite(inviteCode), { reason })
    },

    async deleteMessage(channelId, messageId, reason) {
      await rest.delete(rest.routes.channels.message(channelId, messageId), { reason })
    },

    async deleteMessages(channelId, messageIds, reason) {
      await rest.post(rest.routes.channels.bulk(channelId), {
        body: {
          messages: messageIds.slice(0, 100).map((id) => id.toString()),
        },
        reason,
      })
    },

    async deleteOriginalInteractionResponse(token) {
      await rest.delete(rest.routes.interactions.responses.original(rest.applicationId, token))
    },

    async deleteOwnReaction(channelId, messageId, reaction) {
      reaction = processReactionString(reaction)

      await rest.delete(rest.routes.channels.reactions.bot(channelId, messageId, reaction))
    },

    async deleteReactionsAll(channelId, messageId) {
      await rest.delete(rest.routes.channels.reactions.all(channelId, messageId))
    },

    async deleteReactionsEmoji(channelId, messageId, reaction) {
      reaction = processReactionString(reaction)

      await rest.delete(rest.routes.channels.reactions.emoji(channelId, messageId, reaction))
    },

    async deleteRole(guildId, roleId) {
      await rest.delete(rest.routes.guilds.roles.one(guildId, roleId))
    },

    async deleteScheduledEvent(guildId, eventId) {
      await rest.delete(rest.routes.guilds.events.event(guildId, eventId))
    },

    async deleteStageInstance(channelId, reason) {
      await rest.delete(rest.routes.channels.stage(channelId), { reason })
    },

    async deleteUserReaction(channelId, messageId, userId, reaction) {
      reaction = processReactionString(reaction)

      await rest.delete(rest.routes.channels.reactions.user(channelId, messageId, reaction, userId))
    },

    async deleteWebhook(webhookId, reason) {
      await rest.delete(rest.routes.webhooks.id(webhookId), { reason })
    },

    async deleteWebhookMessage(webhookId, token, messageId, options) {
      await rest.delete(rest.routes.webhooks.message(webhookId, token, messageId, options))
    },

    async deleteWebhookWithToken(webhookId, token) {
      await rest.delete(rest.routes.webhooks.webhook(webhookId, token))
    },

    async editApplicationCommandPermissions(guildId, commandId, bearerToken, permissions) {
      return await rest.put<DiscordApplicationCommandPermissions>(
        rest.routes.interactions.commands.permission(rest.applicationId, guildId, commandId),
        {
          body: {
            permissions,
          },
          headers: { authorization: `Bearer ${bearerToken}` },
        },
      )
    },

    async editAutomodRule(guildId, ruleId, body) {
      return await rest.patch<DiscordAutoModerationRule>(rest.routes.guilds.automod.rule(guildId, ruleId), { body })
    },

    async editBotProfile(options) {
      const avatar = options?.botAvatarURL ? await urlToBase64(options?.botAvatarURL) : options?.botAvatarURL

      return await rest.patch<DiscordUser>(rest.routes.userBot(), {
        body: {
          username: options.username?.trim(),
          avatar,
        },
      })
    },

    async editChannel(channelId, body) {
      return await rest.patch<DiscordChannel>(rest.routes.channels.channel(channelId), { body })
    },

    async editChannelPermissionOverrides(channelId, body) {
      await rest.put(rest.routes.channels.overwrite(channelId, body.id), { body })
    },

    async editChannelPositions(guildId, body) {
      await rest.patch(rest.routes.guilds.channels(guildId), { body })
    },

    async editEmoji(guildId, id, body) {
      return await rest.patch<DiscordEmoji>(rest.routes.guilds.emoji(guildId, id), { body })
    },

    async editFollowupMessage(token, messageId, body) {
      return await rest.patch<DiscordMessage>(rest.routes.interactions.responses.message(rest.applicationId, token, messageId), {
        body,
        files: body.files,
      })
    },

    async editGlobalApplicationCommand(commandId, body) {
      return await rest.patch<DiscordApplicationCommand>(rest.routes.interactions.commands.command(rest.applicationId, commandId), { body })
    },

    async editGuild(guildId, body) {
      return await rest.patch<DiscordGuild>(rest.routes.guilds.guild(guildId), { body })
    },

    async editGuildApplicationCommand(commandId, guildId, body) {
      return await rest.patch<DiscordApplicationCommand>(rest.routes.interactions.commands.guilds.one(rest.applicationId, guildId, commandId), {
        body,
      })
    },

    async editGuildMfaLevel(guildId: BigString, mfaLevel: MfaLevels, reason?: string): Promise<void> {
      await rest.post(rest.routes.guilds.mfa(guildId), { body: { level: mfaLevel }, reason })
    },

    async editGuildSticker(guildId, stickerId, body) {
      return await rest.patch<DiscordSticker>(rest.routes.guilds.sticker(guildId, stickerId), { body })
    },

    async editGuildTemplate(guildId, templateCode: string, body: ModifyGuildTemplate): Promise<Camelize<DiscordTemplate>> {
      return await rest.patch<DiscordTemplate>(rest.routes.guilds.templates.guild(guildId, templateCode), { body })
    },

    async editMessage(channelId, messageId, body) {
      return await rest.patch<DiscordMessage>(rest.routes.channels.message(channelId, messageId), { body })
    },

    async editOriginalInteractionResponse(token, body) {
      return await rest.patch<DiscordMessage>(rest.routes.interactions.responses.original(rest.applicationId, token), {
        body,
        files: body.files,
      })
    },

    async editOriginalWebhookMessage(webhookId, token, options) {
      return await rest.patch<DiscordMessage>(rest.routes.webhooks.original(webhookId, token, options), {
        body: {
          type: InteractionResponseTypes.UpdateMessage,
          data: options,
        },
        files: options.files,
      })
    },

    async editOwnVoiceState(guildId, options) {
      await rest.patch(rest.routes.guilds.voice(guildId), {
        body: {
          ...options,
          request_to_speak_timestamp: options.requestToSpeakTimestamp
            ? new Date(options.requestToSpeakTimestamp).toISOString()
            : options.requestToSpeakTimestamp,
        },
      })
    },

    async editScheduledEvent(guildId, eventId, body) {
      return await rest.patch<DiscordScheduledEvent>(rest.routes.guilds.events.event(guildId, eventId), { body })
    },

    async editRole(guildId, roleId, body) {
      return await rest.patch<DiscordRole>(rest.routes.guilds.roles.one(guildId, roleId), { body })
    },

    async editRolePositions(guildId, body) {
      return await rest.patch<DiscordRole[]>(rest.routes.guilds.roles.all(guildId), { body })
    },

    async editStageInstance(channelId, topic, reason?: string) {
      return await rest.patch<DiscordStageInstance>(rest.routes.channels.stage(channelId), { body: { topic }, reason })
    },

    async editUserVoiceState(guildId, options) {
      await rest.patch(rest.routes.guilds.voice(guildId, options.userId), { body: options })
    },

    async editWebhook(webhookId, body) {
      return await rest.patch<DiscordWebhook>(rest.routes.webhooks.id(webhookId), { body })
    },

    async editWebhookMessage(webhookId, token, messageId, options) {
      return await rest.patch<DiscordMessage>(rest.routes.webhooks.message(webhookId, token, messageId, options), {
        body: options,
        files: options.files,
      })
    },

    async editWebhookWithToken(webhookId, token, body) {
      return await rest.patch<DiscordWebhook>(rest.routes.webhooks.webhook(webhookId, token), { body })
    },

    async editWelcomeScreen(guildId, body) {
      return await rest.patch<DiscordWelcomeScreen>(rest.routes.guilds.welcome(guildId), { body })
    },

    async editWidgetSettings(guildId, body) {
      return await rest.patch<DiscordGuildWidgetSettings>(rest.routes.guilds.widget(guildId), { body })
    },

    async executeWebhook(webhookId, token, options) {
      return await rest.post<DiscordMessage>(rest.routes.webhooks.webhook(webhookId, token, options), { body: options })
    },

    async followAnnouncement(sourceChannelId, targetChannelId) {
      return await rest.post<DiscordFollowedChannel>(rest.routes.channels.follow(sourceChannelId), {
        body: {
          webhook_channel_id: targetChannelId,
        },
      })
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

    async getAuditLog(guildId, options) {
      return await rest.get<DiscordAuditLog>(rest.routes.guilds.auditlogs(guildId, options))
    },

    async getAutomodRule(guildId, ruleId) {
      return await rest.get<DiscordAutoModerationRule>(rest.routes.guilds.automod.rule(guildId, ruleId))
    },

    async getAutomodRules(guildId) {
      return await rest.get<DiscordAutoModerationRule[]>(rest.routes.guilds.automod.rules(guildId))
    },

    async getAvailableVoiceRegions() {
      return await rest.get<DiscordVoiceRegion[]>(rest.routes.regions())
    },

    async getBan(guildId, userId) {
      return await rest.get<DiscordBan>(rest.routes.guilds.members.ban(guildId, userId))
    },

    async getBans(guildId, options) {
      return await rest.get<DiscordBan[]>(rest.routes.guilds.members.bans(guildId, options))
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
        body: { recipient_id: userId },
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

    async getGuild(guildId, options = { counts: true }) {
      return await rest.get<DiscordGuild>(rest.routes.guilds.guild(guildId, options.counts))
    },

    async getGuildApplicationCommand(commandId, guildId) {
      return await rest.get<DiscordApplicationCommand>(rest.routes.interactions.commands.guilds.one(rest.applicationId, guildId, commandId))
    },

    async getGuildApplicationCommands(guildId) {
      return await rest.get<DiscordApplicationCommand[]>(rest.routes.interactions.commands.guilds.all(rest.applicationId, guildId))
    },

    async getGuildPreview(guildId) {
      return await rest.get<DiscordGuildPreview>(rest.routes.guilds.preview(guildId))
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

    async getMessage(channelId, messageId) {
      return await rest.get<DiscordMessage>(rest.routes.channels.message(channelId, messageId))
    },

    async getMessages(channelId, options) {
      return await rest.get<DiscordMessage[]>(rest.routes.channels.messages(channelId, options))
    },

    async getNitroStickerPacks() {
      return await rest.get<DiscordStickerPack[]>(rest.routes.nitroStickerPacks())
    },

    async getOriginalInteractionResponse(token) {
      return await rest.get<DiscordMessage>(rest.routes.interactions.responses.original(rest.applicationId, token))
    },

    async getPinnedMessages(channelId) {
      return await rest.get<DiscordMessage[]>(rest.routes.channels.pins(channelId))
    },

    async getPrivateArchivedThreads(channelId, options) {
      return await rest.get<DiscordListArchivedThreads>(rest.routes.channels.threads.private(channelId, options))
    },

    async getPrivateJoinedArchivedThreads(channelId, options) {
      return await rest.get<DiscordListArchivedThreads>(rest.routes.channels.threads.joined(channelId, options))
    },

    async getPruneCount(guildId, options) {
      return await rest.get<DiscordPrunedCount>(rest.routes.guilds.prune(guildId, options))
    },

    async getPublicArchivedThreads(channelId, options) {
      return await rest.get<DiscordListArchivedThreads>(rest.routes.channels.threads.public(channelId, options))
    },

    async getRoles(guildId) {
      return await rest.get<DiscordRole[]>(rest.routes.guilds.roles.all(guildId))
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

    async getSticker(stickerId: BigString) {
      return await rest.get<DiscordSticker>(rest.routes.sticker(stickerId))
    },

    async getGuildSticker(guildId, stickerId) {
      return await rest.get<DiscordSticker>(rest.routes.guilds.sticker(guildId, stickerId))
    },

    async getGuildStickers(guildId) {
      return await rest.get<DiscordSticker[]>(rest.routes.guilds.stickers(guildId))
    },

    async getThreadMember(channelId, userId) {
      return await rest.get<DiscordThreadMember>(rest.routes.channels.threads.user(channelId, userId))
    },

    async getThreadMembers(channelId) {
      return await rest.get<DiscordThreadMember[]>(rest.routes.channels.threads.members(channelId))
    },

    async getReactions(channelId, messageId, reaction, options) {
      return await rest.get<DiscordUser[]>(rest.routes.channels.reactions.message(channelId, messageId, reaction, options))
    },

    async getUser(id) {
      return await rest.get<DiscordUser>(rest.routes.user(id))
    },

    async getVanityUrl(guildId) {
      return await rest.get<DiscordVanityUrl>(rest.routes.guilds.vanity(guildId))
    },

    async getVoiceRegions(guildId) {
      return await rest.get<DiscordVoiceRegion[]>(rest.routes.guilds.regions(guildId))
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

    async getWelcomeScreen(guildId) {
      return await rest.get<DiscordWelcomeScreen>(rest.routes.guilds.welcome(guildId))
    },

    async getWidget(guildId) {
      return await rest.get<DiscordGuildWidget>(rest.routes.guilds.widgetJson(guildId))
    },

    async getWidgetSettings(guildId) {
      return await rest.get<DiscordGuildWidgetSettings>(rest.routes.guilds.widget(guildId))
    },

    async joinThread(channelId) {
      await rest.put(rest.routes.channels.threads.me(channelId))
    },

    async leaveGuild(guildId) {
      await rest.delete(rest.routes.guilds.leave(guildId))
    },

    async leaveThread(channelId) {
      await rest.delete(rest.routes.channels.threads.me(channelId))
    },

    async publishMessage(channelId, messageId) {
      return await rest.post<DiscordMessage>(rest.routes.channels.crosspost(channelId, messageId))
    },

    async removeRole(guildId, userId, roleId, reason) {
      await rest.delete(rest.routes.guilds.roles.member(guildId, userId, roleId), { reason })
    },

    async removeThreadMember(channelId, userId) {
      await rest.delete(rest.routes.channels.threads.user(channelId, userId))
    },

    // TODO: why that
    async sendFollowupMessage(token, options) {
      return await new Promise((resolve, reject) => {
        rest.sendRequest({
          url: rest.routes.webhooks.webhook(rest.applicationId, token),
          method: 'POST', 
          requestBodyOptions: { body: options, files: options.files },
          retryCount: 0,
          retryRequest: async function(options: SendRequestOptions) {
            // TODO: should change to reprocess queue item
            await rest.sendRequest(options)
          },
          resolve: (data) => {
            resolve(data.status !== 204 ? JSON.parse(data.body ?? '{}') : undefined)
          },
          reject,
        })
      })
    },

    // TODO: why that
    async sendInteractionResponse(interactionId, token, options) {
      await new Promise((resolve, reject) => {
        rest.sendRequest({
          url: rest.routes.interactions.responses.callback(interactionId, token),
          method: 'POST',
          requestBodyOptions: { body: options },
          retryCount: 0,
          retryRequest: async function(options: SendRequestOptions) {
            // TODO: should change to reprocess queue item
            await rest.sendRequest(options)
          },
          resolve: (data) => {
            resolve(data.status !== 204 ? JSON.parse(data.body ?? '{}') : undefined)
          },
          reject,
        })
      })
    },

    async sendMessage(channelId, body) {
      return await rest.post<DiscordMessage>(rest.routes.channels.messages(channelId), { body, files: body.files })
    },

    async startThreadWithMessage(channelId, messageId, body) {
      return await rest.post<DiscordChannel>(rest.routes.channels.threads.message(channelId, messageId), { body })
    },

    async startThreadWithoutMessage(channelId, body) {
      return await rest.post<DiscordChannel>(rest.routes.channels.threads.all(channelId), { body })
    },

    async syncGuildTemplate(guildId) {
      return await rest.put<DiscordTemplate>(rest.routes.guilds.templates.all(guildId))
    },

    async banMember(guildId, userId, body) {
      await rest.put<void>(rest.routes.guilds.members.ban(guildId, userId), { body })
    },

    async editBotMember(guildId, body) {
      return await rest.patch<DiscordMember>(rest.routes.guilds.members.bot(guildId), { body })
    },

    async editMember(guildId, userId, body) {
      return await rest.patch<DiscordMemberWithUser>(rest.routes.guilds.members.member(guildId, userId), { body })
    },

    async getMember(guildId, userId) {
      return await rest.get<DiscordMemberWithUser>(rest.routes.guilds.members.member(guildId, userId))
    },

    async getMembers(guildId, options) {
      return await rest.get<DiscordMemberWithUser[]>(rest.routes.guilds.members.members(guildId, options))
    },

    async kickMember(guildId, userId, reason) {
      await rest.delete(rest.routes.guilds.members.member(guildId, userId), {
        reason,
      })
    },

    async pinMessage(channelId, messageId, reason) {
      await rest.put(rest.routes.channels.pin(channelId, messageId), { reason })
    },

    async pruneMembers(guildId, body) {
      return await rest.post<{ pruned: number | null }>(rest.routes.guilds.members.prune(guildId), { body })
    },

    async searchMembers(guildId, query, options) {
      return await rest.get<DiscordMemberWithUser[]>(rest.routes.guilds.members.search(guildId, query, options))
    },

    async unbanMember(guildId, userId) {
      await rest.delete(rest.routes.guilds.members.ban(guildId, userId))
    },

    async unpinMessage(channelId, messageId, reason) {
      await rest.delete(rest.routes.channels.pin(channelId, messageId), { reason })
    },

    async triggerTypingIndicator(channelId) {
      await rest.post(rest.routes.channels.typing(channelId))
    },

    async upsertGlobalApplicationCommands(body) {
      return await rest.put<DiscordApplicationCommand[]>(rest.routes.interactions.commands.commands(rest.applicationId), { body })
    },

    async upsertGuildApplicationCommands(guildId, body) {
      return await rest.put<DiscordApplicationCommand[]>(rest.routes.interactions.commands.guilds.all(rest.applicationId, guildId), { body })
    },
  }

  return rest
}
