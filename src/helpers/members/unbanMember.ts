import type { Bot } from "../../bot.ts";

/** Remove the ban for a user. Requires BAN_MEMBERS permission */
export async function unbanMember(bot: Bot, guildId: bigint, id: bigint) {
  await bot.rest.runMethod<undefined>(bot.rest, "delete", bot.constants.endpoints.GUILD_BAN(guildId, id));
}
