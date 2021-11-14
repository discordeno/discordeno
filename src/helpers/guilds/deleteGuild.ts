import type { Bot } from "../../bot.ts";

/** Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event. */
export async function deleteGuild(bot: Bot, guildId: bigint) {
  return await bot.rest.runMethod<undefined>(bot.rest, "delete", bot.constants.endpoints.GUILDS_BASE(guildId));
}
