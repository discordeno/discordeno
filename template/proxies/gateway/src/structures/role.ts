import { DiscordRole } from "../../../../../types/discord.ts";

export function proxyRole(payload: DiscordRole) {
  return {
    id: payload.id,
    name: payload.name,
    icon: payload.icon,
    hoist: payload.hoist,
    permissions: payload.permissions,
    managed: payload.managed,
    mentionable: payload.mentionable,
    color: payload.color,
    position: payload.position,
    unicodeEmoji: payload.unicode_emoji,
    tags: payload.tags
      ? {
        botId: payload.tags.bot_id,
        integrationId: payload.tags.integration_id,
        premiumSubscriber: payload.tags.premium_subscriber,
      }
      : undefined,
  };
}
