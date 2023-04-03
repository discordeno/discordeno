import type { GetMessagesOptions, GetScheduledEventUsers } from '@discordeno/types'
import { isGetMessagesAfter, isGetMessagesAround, isGetMessagesBefore, isGetMessagesLimit } from '@discordeno/utils'
import type { RestRoutes } from './typings/routes.js'

export function createRoutes(): RestRoutes {
  return {
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

    sticker: (stickerId) => {
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
  }
}
