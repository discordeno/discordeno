import type { Camelize, DiscordRole } from '@discordeno/types'

export function c1amelize1Role (payload: DiscordRole): Camelize<DiscordRole> {
  return {
    id: payload.id,
    name: payload.name,
    color: payload.color,
    hoist: payload.hoist,
    icon: payload.icon,
    unicodeEmoji: payload.unicode_emoji,
    position: payload.position,
    permissions: payload.permissions,
    managed: payload.managed,
    mentionable: payload.mentionable,
    tags: payload.tags && {
      botId: payload.tags.bot_id,
      integrationId: payload.tags.integration_id,
      premiumSubscriber: payload.tags.premium_subscriber,
      guildConnections: payload.tags.guild_connections
    }
  }
}
