import type { Bot } from "../../bot.ts";

/** Remove the ban for a user. Requires BAN_MEMBERS permission */
export async function unbanMember(bot: Bot, guildId: bigint, id: bigint): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "DELETE", bot.constants.routes.GUILD_BAN(guildId, id));
}
