import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/**
 * ⚠️ **If you need this, you are probably doing something wrong. Always use cache.guilds.get()
 *
 * Advanced Devs:
 * This function fetches a guild's data. This is not the same data as a GUILD_CREATE.
 * So it does not cache the guild, you must do it manually.
 * */
export async function getGuild(guildID: string, counts = true) {
  const result = await RequestManager.get(endpoints.GUILDS_BASE(guildID), {
    with_counts: counts,
  });

  return result as UpdateGuildPayload;
}
