import { Bot } from "../../bot.ts";
import { DiscordEmoji } from "../../deps.ts";
import { BotCollection as Collection } from "../../util/collection.ts";

/**
 * Returns a list of emojis for the given guild.
 */
export async function getEmojis(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordEmoji[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_EMOJIS(guildId),
  );

  return new Collection(result.map((e) => [bot.transformers.snowflake(e.id!), bot.transformers.emoji(bot, e)]));
}
