import { DiscordGuildPreview } from "../types/discord.ts";
import { Bot } from "../bot.ts";
import { Optionalize } from "../types/shared.ts";

export function transformGuildPreview(bot: Bot, payload: DiscordGuildPreview) {
  const guildPreview = {
    id: bot.transformers.snowflake(payload.id),
    name: payload.name,
    icon: payload.icon ?? undefined,
    splash: payload.splash ?? undefined,
    discoverySplash: payload.discovery_splash ?? undefined,
    emojis: payload.emojis.map((emoji) => bot.transformers.emoji(bot, emoji)),
    features: payload.features,
    approximateMemberCount: payload.approximate_member_count,
    approximatePresenceCount: payload.approximate_presence_count,
    description: payload.description ?? undefined,
    stickers: payload.stickers.map((sticker) => bot.transformers.sticker(bot, sticker)),
  };
  return guildPreview as Optionalize<typeof guildPreview>;
}

export interface GuildPreview extends ReturnType<typeof transformGuildPreview> {}
