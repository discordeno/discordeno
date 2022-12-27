import type { Camelize, DiscordRole } from '@discordeno/types'

export function s1nakelize1Role (payload: Camelize<DiscordRole>): DiscordRole {
  return {
    id: payload.id,
    icon: payload.icon,
    name: payload.name,
    color: payload.color,
    hoist: payload.hoist,
    managed: payload.managed,
    position: payload.position,
    permissions: payload.permissions,
    mentionable: payload.mentionable,
    unicode_emoji: payload.unicodeEmoji,

    tags: payload.tags && {
      bot_id: payload.tags.botId,
      integration_id: payload.tags.integrationId,
      premium_subscriber: payload.tags.premiumSubscriber
    }
  }
}
