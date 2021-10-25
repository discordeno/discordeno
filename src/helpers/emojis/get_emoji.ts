import type { Emoji } from "../../types/emojis/emoji.ts";
import { Errors } from "../../types/discordeno/errors.ts";
import type { Bot } from "../../bot.ts";

/**
 * Returns an emoji for the given guild and emoji Id.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. Always use cache.guilds.get()?.emojis
 */
export async function getEmoji(bot: Bot, guildId: bigint, emojiId: bigint, addToCache = true) {
  const result = await bot.rest.runMethod<Emoji>(bot.rest, "get", bot.constants.endpoints.GUILD_EMOJI(guildId, emojiId));

  if (addToCache) {
    const guild = await bot.cache.guilds.get(guildId);
    if (!guild) throw new Error(Errors.GUILD_NOT_FOUND);
    guild.emojis.set(emojiId, result);
    await bot.cache.guilds.set(guildId, guild);
  }

  return result;
}
