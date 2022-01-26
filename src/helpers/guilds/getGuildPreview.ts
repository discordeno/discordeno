import type { GuildPreview } from "../../types/guilds/guildPreview.ts";
import type { Bot } from "../../bot.ts";

/** Returns the guild preview object for the given id. If the bot is not in the guild, then the guild must be Discoverable. */
export async function getGuildPreview(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<GuildPreview>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_PREVIEW(guildId)
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
    stickers: result.stickers,
  };
}
