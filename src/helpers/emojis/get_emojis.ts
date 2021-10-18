import {Bot} from "../../bot.ts";
import type { Emoji } from "../../types/emojis/emoji.ts";
import { Errors } from "../../types/discordeno/errors.ts";
import { Collection } from "../../util/collection.ts";

/**
 * Returns a list of emojis for the given guild.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. Always use cache.guilds.get()?.emojis
 */
export async function getEmojis(bot: Bot, guildId: bigint, addToCache = true) {
  const result = await bot.rest.runMethod<Emoji[]>(bot.rest,"get", bot.constants.endpoints.GUILD_EMOJIS(guildId));

  if (addToCache) {
    const guild = await bot.cache.guilds.get("guilds", guildId);
    if (!guild) throw new Error(Errors.GUILD_NOT_FOUND);

    result.forEach((emoji) => {
      bot.events.debug("loop", `Running forEach loop in get_emojis file.`);
      guild.emojis.set(bot.transformers.snowflake(emoji.id!), emoji);
    });

    await bot.cache.guilds.set(guildId, guild);
  }

  return new Collection(result.map((e) => [e.id!, e]));
}
