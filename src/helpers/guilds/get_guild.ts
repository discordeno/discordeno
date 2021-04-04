import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/**
 * ⚠️ **If you need this, you are probably doing something wrong. Always use cache.guilds.get()
 *
 * Advanced Devs:
 * This function fetches a guild's data. This is not the same data as a GUILD_CREATE.
 * So it does not cache the guild, you must do it manually.
 * */
export async function getGuild(guildId: string, counts = true) {
  const result = await rest.runMethod("get", endpoints.GUILDS_BASE(guildId), {
    with_counts: counts,
  });

  return result as UpdateGuildPayload;
}
