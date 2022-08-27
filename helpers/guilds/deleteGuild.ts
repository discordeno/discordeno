import type { Bot } from "../../bot.ts";

/** Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event. */
export async function deleteGuild(bot: Bot, guildId: bigint): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "DELETE", bot.constants.routes.GUILD(guildId));
}
