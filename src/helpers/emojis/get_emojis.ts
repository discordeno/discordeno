import type { Bot } from "../../bot.ts";
import type { Emoji } from "../../types/emojis/emoji.ts";
import { Errors } from "../../types/discordeno/errors.ts";
import { Collection } from "../../util/collection.ts";

/**
 * Returns a list of emojis for the given guild.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. Always use cache.guilds.get()?.emojis
 */
export async function getEmojis(bot: Bot, guildId: bigint, addToCache = true) {
  const result = await bot.rest.runMethod<Emoji[]>(bot.rest, "get", bot.constants.endpoints.GUILD_EMOJIS(guildId));

  return new Collection(result.map((e) => [bot.transformers.snowflake(e.id), bot.transformers.emoji(bot, e)]));
}
