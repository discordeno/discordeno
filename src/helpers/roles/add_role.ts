import type { Bot } from "../../bot.ts";

/** Add a role to the member */
export async function addRole(bot: Bot, guildId: bigint, memberId: bigint, roleId: bigint, reason?: string) {
  return await bot.rest.runMethod<undefined>(
    bot.rest,
    "put",
    bot.constants.endpoints.GUILD_MEMBER_ROLE(guildId, memberId, roleId),
    { reason }
  );
}
