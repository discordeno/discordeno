import type { Bot } from "../../bot.ts";
import { Emoji } from "../../transformers/emoji.ts";
import { Sticker } from "../../transformers/sticker.ts";
import { DiscordGuildPreview } from "../../types/discord.ts";
import { GuildFeatures } from "../../types/shared.ts";

export type GuildPreview = {
  id: bigint;
  name?: string;
  icon?: string;
  splash?: string;
  discoverySplash?: string;
  emojis?: Emoji[];
  features: GuildFeatures[];
  approximateMemberCount: number;
  approximatePresenceCount: number;
  description?: string;
  stickers: Sticker[];
};

/** Returns the guild preview object for the given id. If the bot is not in the guild, then the guild must be Discoverable. */
export async function getGuildPreview(bot: Bot, guildId: bigint): Promise<GuildPreview> {
  const result = await bot.rest.runMethod<DiscordGuildPreview>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_PREVIEW(guildId),
  );

  return {
    id: bot.transformers.snowflake(result.id),
    name: result.name,
    icon: result.icon ?? undefined,
    splash: result.splash ?? undefined,
    discoverySplash: result.discovery_splash ?? undefined,
    emojis: result.emojis.map((emoji) => bot.transformers.emoji(bot, emoji)),
    features: result.features,
    approximateMemberCount: result.approximate_member_count,
    approximatePresenceCount: result.approximate_presence_count,
    description: result.description ?? undefined,
    stickers: result.stickers.map((sticker) => bot.transformers.sticker(bot, sticker)),
  };
}
