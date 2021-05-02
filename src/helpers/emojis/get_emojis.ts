import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { Emoji } from "../../types/emojis/emoji.ts";
import { Errors } from "../../types/misc/errors.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";

/**
 * Returns a list of emojis for the given guild.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. Always use cache.guilds.get()?.emojis
 */
export async function getEmojis(guildId: bigint, addToCache = true) {
  const result = await rest.runMethod<Emoji[]>(
    "get",
    endpoints.GUILD_EMOJIS(guildId),
  );

  if (addToCache) {
    const guild = await cacheHandlers.get("guilds", guildId);
    if (!guild) throw new Error(Errors.GUILD_NOT_FOUND);

    result.forEach((emoji) => {
      eventHandlers.debug?.(
        "loop",
        `Running forEach loop in get_emojis file.`,
      );
      guild.emojis.set(emoji.id!, emoji);
    });

    await cacheHandlers.set("guilds", guildId, guild);
  }

  return new Collection(result.map((e) => [e.id!, e]));
}
