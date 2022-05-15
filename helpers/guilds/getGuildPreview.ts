import type { Bot } from "../../bot.ts";
import { DiscordGuildPreview } from "../../types/discord.ts";

/** Returns the guild preview object for the given id. If the bot is not in the guild, then the guild must be Discoverable. */
export async function getGuildPreview(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordGuildPreview>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_PREVIEW(guildId),
  );

  return bot.transformers.guildPreview(bot, result);
}
