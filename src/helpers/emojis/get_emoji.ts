import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/**
 * Returns an emoji for the given guild and emoji ID.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. Always use cache.guilds.get()?.emojis
 */
export async function getEmoji(
  guildID: string,
  emojiID: string,
  addToCache = true,
) {
  const result = (await RequestManager.get(
    endpoints.GUILD_EMOJI(guildID, emojiID),
  )) as Emoji;

  if (addToCache) {
    const guild = await cacheHandlers.get("guilds", guildID);
    if (!guild) throw new Error(Errors.GUILD_NOT_FOUND);
    guild.emojis.set(result.id ?? result.name, result);
    cacheHandlers.set(
      "guilds",
      guildID,
      guild,
    );
  }

  return result;
}
