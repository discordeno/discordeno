import type { Bot } from "../../bot.ts";
import { Emoji } from "../../transformers/emoji.ts";
import { Sticker } from "../../transformers/sticker.ts";
import { DiscordGuildPreview } from "../../types/discord.ts";
import { BigString, GuildFeatures } from "../../types/shared.ts";

export type GuildPreview = {
  id: BigString;
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

// TODO: Move `GuildPreview` into its own transformer file.

/**
 * Gets the preview of a guild by a guild's ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the preview of.
 * @returns An instance of {@link GuildPreview}.
 *
 * @remarks
 * If the bot user is not in the guild, the guild must be lurkable.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-preview}
 */
export async function getGuildPreview(bot: Bot, guildId: BigString): Promise<GuildPreview> {
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
