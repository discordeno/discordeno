import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/**
 * Returns an emoji for the given guild and emoji Id.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. Always use cache.guilds.get()?.emojis
 */
export async function getEmoji(
  guildId: string,
  emojiId: string,
  addToCache = true,
) {
  const result = (await RequestManager.get(
    endpoints.GUILD_EMOJI(guildId, emojiId),
  )) as Emoji;

  if (addToCache) {
    const guild = await cacheHandlers.get("guilds", guildId);
    if (!guild) throw new Error(Errors.GUILD_NOT_FOUND);
    guild.emojis.set(result.id ?? result.name, result);
    cacheHandlers.set(
      "guilds",
      guildId,
      guild,
    );
  }

  return result;
}
