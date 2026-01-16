import type { GetMessagesOptions, GetScheduledEventUsers } from '@discordeno/types'
import { isGetMessagesAfter, isGetMessagesAround, isGetMessagesBefore, isGetMessagesLimit } from '@discordeno/utils'
import type { RestRoutes } from './typings/routes.js'

/**
 * Creates the available discord API routes
 *
 * @param disableURIEncode Don't encode strings, except where required - Danger: disabling URI encoding may lead to path traversal if unsafe strings are used
 * @returns The available discord API routes
 */
export function createRoutes(disableURIEncode: boolean = false): RestRoutes {
  const encode: typeof encodeComponent = disableURIEncode ? (x) => x.toString() : encodeComponent

  return {
    webhooks: {
      id: (webhookId) => {
        return `/webhooks/${encode(webhookId)}`
      },
      message: (webhookId, token, messageId, options) => {
        let url = `/webhooks/${encode(webhookId)}/${encode(token)}/messages/${encode(messageId)}?`

        if (options) {
          if (options.threadId) url += `thread_id=${encode(options.threadId)}`
          if (options.withComponents) url += `&with_components=${encode(options.withComponents)}`
        }

        return url
      },
      webhook: (webhookId, token, options) => {
        let url = `/webhooks/${encode(webhookId)}/${encode(token)}?`

        if (options) {
          if (options?.wait !== undefined) url += `wait=${encode(options.wait)}`
          if (options.threadId) url += `&thread_id=${encode(options.threadId)}`
          if (options.withComponents) url += `&with_components=${encode(options.withComponents)}`
        }

        return url
      },
    },

    // Channel Endpoints
    channels: {
      bulk: (channelId) => {
        return `/channels/${encode(channelId)}/messages/bulk-delete`
      },
      dm: () => {
        return '/users/@me/channels'
      },
      dmRecipient: (channelId, userId) => {
        return `/channels/${encode(channelId)}/recipients/${encode(userId)}`
      },
      pin: (channelId, messageId) => {
        return `/channels/${encode(channelId)}/pins/${encode(messageId)}`
      },
      pins: (channelId) => {
        return `/channels/${encode(channelId)}/pins`
      },
      messagePins: (channelId, options) => {
        let url = `/channels/${encode(channelId)}/messages/pins?`

        if (options) {
          if (options.before) url += `before=${encode(options.before)}`
          if (options.limit) url += `&limit=${encode(options.limit)}`
        }

        return url
      },
      messagePin: (channelId, messageId) => {
        return `/channels/${encode(channelId)}/messages/pins/${encode(messageId)}`
      },
      reactions: {
        bot: (channelId, messageId, emoji) => {
          return `/channels/${encode(channelId)}/messages/${encode(messageId)}/reactions/${encodeURIComponent(emoji)}/@me`
        },
        user: (channelId, messageId, emoji, userId) => {
          return `/channels/${encode(channelId)}/messages/${encode(messageId)}/reactions/${encodeURIComponent(emoji)}/${encode(userId)}`
        },
        all: (channelId, messageId) => {
          return `/channels/${encode(channelId)}/messages/${encode(messageId)}/reactions`
        },
        emoji: (channelId, messageId, emoji, options) => {
          let url = `/channels/${encode(channelId)}/messages/${encode(messageId)}/reactions/${encodeURIComponent(emoji)}?`

          if (options) {
            if (options.type) url += `type=${encode(options.type)}`
            if (options.after) url += `&after=${encode(options.after)}`
            if (options.limit) url += `&limit=${encode(options.limit)}`
          }

          return url
        },
        message: (channelId, messageId, emoji, options) => {
          let url = `/channels/${encode(channelId)}/messages/${encode(messageId)}/reactions/${encodeURIComponent(emoji)}?`

          if (options) {
            if (options.after) url += `after=${encode(options.after)}`
            if (options.limit) url += `&limit=${encode(options.limit)}`
          }

          return url
        },
      },
      webhooks: (channelId) => {
        return `/channels/${encode(channelId)}/webhooks`
      },

      channel: (channelId) => {
        return `/channels/${encode(channelId)}`
      },

      follow: (channelId) => {
        return `/channels/${encode(channelId)}/followers`
      },

      forum: (channelId) => {
        return `/channels/${encode(channelId)}/threads`
      },

      invites: (channelId) => {
        return `/channels/${encode(channelId)}/invites`
      },

      message: (channelId, messageId) => {
        return `/channels/${encode(channelId)}/messages/${encode(messageId)}`
      },

      messages: (channelId, options?: GetMessagesOptions) => {
        let url = `/channels/${encode(channelId)}/messages?`

        if (options) {
          if (isGetMessagesAfter(options) && options.after) {
            url += `after=${encode(options.after)}`
          }
          if (isGetMessagesBefore(options) && options.before) {
            url += `&before=${encode(options.before)}`
          }
          if (isGetMessagesAround(options) && options.around) {
            url += `&around=${encode(options.around)}`
          }
          if (isGetMessagesLimit(options) && options.limit) {
            url += `&limit=${encode(options.limit)}`
          }
        }

        return url
      },

      overwrite: (channelId, overwriteId) => {
        return `/channels/${encode(channelId)}/permissions/${encode(overwriteId)}`
      },

      crosspost: (channelId, messageId) => {
        return `/channels/${encode(channelId)}/messages/${encode(messageId)}/crosspost`
      },

      stages: () => {
        return '/stage-instances'
      },

      stage: (channelId) => {
        return `/stage-instances/${encode(channelId)}`
      },

      // Thread Endpoints
      threads: {
        message: (channelId, messageId) => {
          return `/channels/${encode(channelId)}/messages/${encode(messageId)}/threads`
        },
        all: (channelId) => {
          return `/channels/${encode(channelId)}/threads`
        },
        active: (guildId) => {
          return `/guilds/${encode(guildId)}/threads/active`
        },
        members: (channelId, options) => {
          let url = `/channels/${encode(channelId)}/thread-members?`

          if (options) {
            if (options.withMember) url += `with_member=${encode(options.withMember)}`
            if (options.limit) url += `&limit=${encode(options.limit)}`
            if (options.after) url += `&after=${encode(options.after)}`
          }

          return url
        },
        me: (channelId) => {
          return `/channels/${encode(channelId)}/thread-members/@me`
        },
        getUser(channelId, userId, options) {
          let url = `/channels/${encode(channelId)}/thread-members/${encode(userId)}?`

          if (options) {
            if (options.withMember) url += `with_member=${encode(options.withMember)}`
          }

          return url
        },
        user: (channelId, userId) => {
          return `/channels/${encode(channelId)}/thread-members/${encode(userId)}`
        },
        archived: (channelId) => {
          return `/channels/${encode(channelId)}/threads/archived`
        },
        public: (channelId, options) => {
          let url = `/channels/${encode(channelId)}/threads/archived/public?`

          if (options) {
            if (options.before) {
              const iso = new Date(options.before).toISOString()
              url += `before=${encode(iso)}`
            }
            if (options.limit) url += `&limit=${encode(options.limit)}`
          }

          return url
        },
        private: (channelId, options) => {
          let url = `/channels/${encode(channelId)}/threads/archived/private?`

          if (options) {
            if (options.before) {
              const iso = new Date(options.before).toISOString()
              url += `before=${encode(iso)}`
            }
            if (options.limit) url += `&limit=${encode(options.limit)}`
          }

          return url
        },
        joined: (channelId, options) => {
          let url = `/channels/${encode(channelId)}/users/@me/threads/archived/private?`

          if (options) {
            if (options.before) {
              const iso = new Date(options.before).toISOString()
              url += `before=${encode(iso)}`
            }
            if (options.limit) url += `&limit=${encode(options.limit)}`
          }

          return url
        },
      },

      typing: (channelId) => {
        return `/channels/${encode(channelId)}/typing`
      },

      polls: {
        votes: (channelId, messageId, answerId, options) => {
          let url = `/channels/${encode(channelId)}/polls/${encode(messageId)}/answers/${encode(answerId)}?`

          if (options) {
            if (options.after) url += `after=${encode(options.after)}`
            if (options.limit) url += `&limit=${encode(options.limit)}`
          }

          return url
        },
        expire: (channelId, messageId) => {
          return `/channels/${encode(channelId)}/polls/${encode(messageId)}/expire`
        },
      },
    },

    // Guild Endpoints
    guilds: {
      all: () => {
        return '/guilds'
      },
      userGuilds: (options) => {
        let url = '/users/@me/guilds?'

        if (options) {
          if (options.after) url += `after=${encode(options.after)}`
          if (options.before) url += `&before=${encode(options.before)}`
          if (options.limit) url += `&limit=${encode(options.limit)}`
          if (options.withCounts) url += `&with_counts=${encode(options.withCounts)}`
        }

        return url
      },
      auditlogs: (guildId, options) => {
        let url = `/guilds/${encode(guildId)}/audit-logs?`

        if (options) {
          if (options.actionType) url += `action_type=${encode(options.actionType)}`
          if (options.before) url += `&before=${encode(options.before)}`
          if (options.after) url += `&after=${encode(options.after)}`
          if (options.limit) url += `&limit=${encode(options.limit)}`
          if (options.userId) url += `&user_id=${encode(options.userId)}`
        }

        return url
      },
      automod: {
        rule: (guildId, ruleId) => {
          return `/guilds/${encode(guildId)}/auto-moderation/rules/${encode(ruleId)}`
        },
        rules: (guildId) => {
          return `/guilds/${encode(guildId)}/auto-moderation/rules`
        },
      },
      channels: (guildId) => {
        return `/guilds/${encode(guildId)}/channels`
      },
      emoji: (guildId, emojiId) => {
        return `/guilds/${encode(guildId)}/emojis/${encode(emojiId)}`
      },
      emojis: (guildId) => {
        return `/guilds/${encode(guildId)}/emojis`
      },
      events: {
        events: (guildId, withUserCount?: boolean) => {
          let url = `/guilds/${encode(guildId)}/scheduled-events?`

          if (withUserCount !== undefined) {
            url += `with_user_count=${encode(withUserCount)}`
          }
          return url
        },
        event: (guildId, eventId, withUserCount?: boolean) => {
          let url = `/guilds/${encode(guildId)}/scheduled-events/${encode(eventId)}`

          if (withUserCount !== undefined) {
            url += `with_user_count=${encode(withUserCount)}`
          }

          return url
        },
        users: (guildId, eventId, options?: GetScheduledEventUsers) => {
          let url = `/guilds/${encode(guildId)}/scheduled-events/${encode(eventId)}/users?`

          if (options) {
            if (options.limit !== undefined) url += `limit=${encode(options.limit)}`
            if (options.withMember !== undefined) {
              url += `&with_member=${encode(options.withMember)}`
            }
            if (options.after !== undefined) url += `&after=${encode(options.after)}`
            if (options.before !== undefined) url += `&before=${encode(options.before)}`
          }

          return url
        },
      },
      guild(guildId, withCounts) {
        let url = `/guilds/${encode(guildId)}?`

        if (withCounts !== undefined) {
          url += `with_counts=${encode(withCounts)}`
        }

        return url
      },
      integration(guildId, integrationId) {
        return `/guilds/${encode(guildId)}/integrations/${encode(integrationId)}`
      },
      integrations: (guildId) => {
        return `/guilds/${encode(guildId)}/integrations?include_applications=true`
      },
      invite(inviteCode, options) {
        let url = `/invites/${encode(inviteCode)}?`

        if (options) {
          if (options.withCounts !== undefined) {
            url += `with_counts=${encode(options.withCounts)}`
          }
          if (options.scheduledEventId) {
            url += `&guild_scheduled_event_id=${encode(options.scheduledEventId)}`
          }
        }

        return url
      },
      inviteTargetUsers(inviteCode) {
        return `/invites/${encode(inviteCode)}/target-users`
      },
      inviteTargetUsersJobStatus(inviteCode) {
        return `/invites/${encode(inviteCode)}/target-users/job-status`
      },
      invites: (guildId) => {
        return `/guilds/${encode(guildId)}/invites`
      },
      leave: (guildId) => {
        return `/users/@me/guilds/${encode(guildId)}`
      },
      members: {
        ban: (guildId, userId) => {
          return `/guilds/${encode(guildId)}/bans/${encode(userId)}`
        },
        bans: (guildId, options) => {
          let url = `/guilds/${encode(guildId)}/bans?`

          if (options) {
            if (options.limit) url += `limit=${encode(options.limit)}`
            if (options.after) url += `&after=${encode(options.after)}`
            if (options.before) url += `&before=${encode(options.before)}`
          }

          return url
        },
        bulkBan: (guildId) => {
          return `/guilds/${encode(guildId)}/bulk-ban`
        },
        bot: (guildId) => {
          return `/guilds/${encode(guildId)}/members/@me`
        },
        member: (guildId, userId) => {
          return `/guilds/${encode(guildId)}/members/${encode(userId)}`
        },
        currentMember: (guildId) => {
          return `/users/@me/guilds/${encode(guildId)}/member`
        },
        members: (guildId, options) => {
          let url = `/guilds/${encode(guildId)}/members?`

          if (options !== undefined) {
            if (options.limit) url += `limit=${encode(options.limit)}`
            if (options.after) url += `&after=${encode(options.after)}`
          }

          return url
        },
        search: (guildId, query, options) => {
          let url = `/guilds/${encode(guildId)}/members/search?query=${encode(query)}`

          if (options) {
            if (options.limit !== undefined) url += `&limit=${encode(options.limit)}`
          }

          return url
        },
        prune: (guildId, options) => {
          let url = `/guilds/${encode(guildId)}/prune?`

          if (options) {
            if (options.days) url += `days=${encode(options.days)}`
            if (Array.isArray(options.includeRoles)) {
              url += `&include_roles=${encode(options.includeRoles.join(','))}`
            } else if (options.includeRoles) {
              url += `&include_roles=${encode(options.includeRoles)}`
            }
          }

          return url
        },
      },
      preview: (guildId) => {
        return `/guilds/${encode(guildId)}/preview`
      },
      prune: (guildId, options) => {
        let url = `/guilds/${encode(guildId)}/prune?`

        if (options) {
          if (options.days) url += `days=${encode(options.days)}`
          if (Array.isArray(options.includeRoles)) {
            url += `&include_roles=${encode(options.includeRoles.join(','))}`
          } else if (options.includeRoles) {
            url += `&include_roles=${encode(options.includeRoles)}`
          }
        }

        return url
      },
      roles: {
        one: (guildId, roleId) => {
          return `/guilds/${encode(guildId)}/roles/${encode(roleId)}`
        },
        all: (guildId) => {
          return `/guilds/${encode(guildId)}/roles`
        },
        member: (guildId, memberId, roleId) => {
          return `/guilds/${encode(guildId)}/members/${encode(memberId)}/roles/${encode(roleId)}`
        },
        memberCounts: (guildId) => {
          return `/guilds/${guildId}/roles/member-counts`
        },
      },
      stickers: (guildId) => {
        return `/guilds/${encode(guildId)}/stickers`
      },
      sticker: (guildId, stickerId) => {
        return `/guilds/${encode(guildId)}/stickers/${encode(stickerId)}`
      },
      voice: (guildId, userId) => {
        return `/guilds/${encode(guildId)}/voice-states/${encode(userId ?? '@me')}`
      },
      templates: {
        code: (code) => {
          return `/guilds/templates/${encode(code)}`
        },
        guild: (guildId, code) => {
          return `/guilds/${encode(guildId)}/templates/${encode(code)}`
        },
        all: (guildId) => {
          return `/guilds/${encode(guildId)}/templates`
        },
      },
      vanity: (guildId) => {
        return `/guilds/${encode(guildId)}/vanity-url`
      },
      regions: (guildId) => {
        return `/guilds/${encode(guildId)}/regions`
      },
      webhooks: (guildId) => {
        return `/guilds/${encode(guildId)}/webhooks`
      },
      welcome: (guildId) => {
        return `/guilds/${encode(guildId)}/welcome-screen`
      },
      widget: (guildId) => {
        return `/guilds/${encode(guildId)}/widget`
      },
      widgetJson: (guildId) => {
        return `/guilds/${encode(guildId)}/widget.json`
      },
      onboarding: (guildId) => {
        return `/guilds/${encode(guildId)}/onboarding`
      },
      incidentActions: (guildId) => {
        return `/guilds/${encode(guildId)}/incident-actions`
      },
    },

    sticker: (stickerId) => {
      return `/stickers/${encode(stickerId)}`
    },

    regions: () => {
      return '/voice/regions'
    },

    // Interaction Endpoints
    interactions: {
      commands: {
        // Application Endpoints
        commands: (applicationId, withLocalizations) => {
          let url = `/applications/${encode(applicationId)}/commands?`

          if (withLocalizations !== undefined) {
            url += `with_localizations=${encode(withLocalizations)}`
          }

          return url
        },

        guilds: {
          all(applicationId, guildId, withLocalizations) {
            let url = `/applications/${encode(applicationId)}/guilds/${encode(guildId)}/commands?`

            if (withLocalizations !== undefined) {
              url += `with_localizations=${encode(withLocalizations)}`
            }

            return url
          },

          one(applicationId, guildId, commandId) {
            return `/applications/${encode(applicationId)}/guilds/${encode(guildId)}/commands/${encode(commandId)}`
          },
        },
        permissions: (applicationId, guildId) => {
          return `/applications/${encode(applicationId)}/guilds/${encode(guildId)}/commands/permissions`
        },
        permission: (applicationId, guildId, commandId) => {
          return `/applications/${encode(applicationId)}/guilds/${encode(guildId)}/commands/${encode(commandId)}/permissions`
        },
        command: (applicationId, commandId, withLocalizations) => {
          let url = `/applications/${encode(applicationId)}/commands/${encode(commandId)}?`

          if (withLocalizations !== undefined) {
            url += `withLocalizations=${encode(withLocalizations)}`
          }

          return url
        },
      },

      responses: {
        // Interaction Endpoints
        callback: (interactionId, token, options) => {
          return `/interactions/${encode(interactionId)}/${encode(token)}/callback?with_response=${encode(!!options?.withResponse)}`
        },
        original: (interactionId, token) => {
          return `/webhooks/${encode(interactionId)}/${encode(token)}/messages/@original`
        },
        message: (applicationId, token, messageId) => {
          return `/webhooks/${encode(applicationId)}/${encode(token)}/messages/${encode(messageId)}`
        },
      },
    },

    // OAuth2 endpoints
    oauth2: {
      tokenExchange: () => {
        return '/oauth2/token'
      },
      tokenRevoke: () => {
        return '/oauth2/token/revoke'
      },
      currentAuthorization: () => {
        return '/oauth2/@me'
      },
      application: () => {
        return '/oauth2/applications/@me'
      },
      connections: () => {
        return '/users/@me/connections'
      },
      roleConnections: (applicationId) => {
        return `/users/@me/applications/${encode(applicationId)}/role-connection`
      },
    },

    monetization: {
      entitlements: (applicationId, options) => {
        let url = `/applications/${encode(applicationId)}/entitlements?`

        if (options) {
          if (options.after) url += `after=${encode(options.after)}`
          if (options.before) url += `&before=${encode(options.before)}`
          if (options.excludeEnded) url += `&exclude_ended=${encode(options.excludeEnded)}`
          if (options.guildId) url += `&guild_id=${encode(options.guildId)}`
          if (options.limit) url += `&limit=${encode(options.limit)}`
          if (options.skuIds) url += `&sku_ids=${encode(options.skuIds.join(','))}`
          if (options.userId) url += `&user_id=${encode(options.userId)}`
        }

        return url
      },
      entitlement: (applicationId, entitlementId) => {
        return `/applications/${encode(applicationId)}/entitlements/${encode(entitlementId)}`
      },
      consumeEntitlement: (applicationId, entitlementId) => {
        return `/applications/${encode(applicationId)}/entitlements/${encode(entitlementId)}/consume`
      },

      skus: (applicationId) => {
        return `/applications/${encode(applicationId)}/skus`
      },

      subscription: (skuId, subscriptionId) => {
        return `/skus/${encode(skuId)}/subscriptions/${encode(subscriptionId)}`
      },

      subscriptions: (skuId, options) => {
        let url = `/skus/${encode(skuId)}/subscriptions?`

        if (options) {
          if (options.after) url += `after=${encode(options.after)}`
          if (options.before) url += `&before=${encode(options.before)}`
          if (options.userId) url += `&user_id=${encode(options.userId)}`
          if (options.limit) url += `&limit=${encode(options.limit)}`
        }

        return url
      },
    },

    soundboard: {
      sendSound: (channelId) => {
        return `/channels/${encode(channelId)}`
      },
      listDefault: () => {
        return `/soundboard-default-sounds`
      },
      guildSounds: (guildId) => {
        return `/guilds/${encode(guildId)}/soundboard-sounds`
      },
      guildSound: (guildId, soundId) => {
        return `/guilds/${encode(guildId)}/soundboard-sounds/${encode(soundId)}`
      },
    },

    lobby: {
      create: () => {
        return '/lobbies'
      },

      lobby: (lobbyId) => {
        return `/lobbies/${encode(lobbyId)}`
      },

      member: (lobbyId, userId) => {
        return `/lobbies/${encode(lobbyId)}/members/${encode(userId)}`
      },

      leave: (lobbyId) => {
        return `/lobbies/${encode(lobbyId)}/members/@me`
      },

      link: (lobbyId) => {
        return `/lobbies/${encode(lobbyId)}/channel-linking`
      },
    },

    applicationEmoji(applicationId, emojiId) {
      return `/applications/${encode(applicationId)}/emojis/${encode(emojiId)}`
    },

    applicationEmojis(applicationId) {
      return `/applications/${encode(applicationId)}/emojis`
    },

    applicationRoleConnectionMetadata(applicationId) {
      return `/applications/${encode(applicationId)}/role-connections/metadata`
    },

    // User endpoints
    user(userId) {
      return `/users/${encode(userId)}`
    },

    application() {
      return '/applications/@me'
    },

    applicationActivityInstance(applicationId, instanceId) {
      return `/applications/${encode(applicationId)}/activity-instances/${encode(instanceId)}`
    },

    currentUser() {
      return '/users/@me'
    },

    gatewayBot() {
      return '/gateway/bot'
    },

    stickerPack(stickerPackId) {
      return `/sticker-packs/${encode(stickerPackId)}`
    },

    stickerPacks() {
      return '/sticker-packs'
    },
  }
}

function encodeComponent(uriComponent: string | number | bigint | boolean): string {
  if (typeof uriComponent !== 'string') return uriComponent.toString()
  if (/^\d+$/.test(uriComponent)) return uriComponent

  return encodeURIComponent(uriComponent)
}
