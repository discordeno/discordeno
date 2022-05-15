import type { Bot } from "../../bot.ts";
import { DiscordGuildVanity } from "../../types/discord.ts";

/** Returns the code and uses of the vanity url for this server if it is enabled else `code` will be null. Requires the `MANAGE_GUILD` permission. */
export async function getVanityUrl(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordGuildVanity>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_VANITY_URL(guildId),
  );

  return bot.transformers.guildVanity(bot, result);
}
