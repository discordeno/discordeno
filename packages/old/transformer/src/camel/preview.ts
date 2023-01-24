import type { Camelize, DiscordGuildPreview } from '@discordeno/types'
import TRANSFORMERS from '...js'

export function c1amelize1GuildPreview (payload: DiscordGuildPreview): Camelize<DiscordGuildPreview> {
  return {
    approximateMemberCount: payload.approximate_member_count,
    approximatePresenceCount: payload.approximate_presence_count,
    description: payload.description,
    discoverySplash: payload.discovery_splash,
    emojis: payload.emojis.map(emoji => TRANSFORMERS.emoji(emoji)),
    features: payload.features,
    icon: payload.icon,
    id: payload.id,
    name: payload.name,
    splash: payload.splash,
    stickers: payload.stickers.map(sticker => TRANSFORMERS.sticker(sticker))
  }
}
