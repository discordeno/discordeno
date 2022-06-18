import { Bot } from "../../bot.ts";

/** Add a role to the member */
export async function addRole(bot: Bot, guildId: bigint, memberId: bigint, roleId: bigint, reason?: string) {
  await bot.rest.runMethod<undefined>(
    bot.rest,
    "PUT",
    bot.constants.routes.GUILD_MEMBER_ROLE(guildId, memberId, roleId),
    { reason },
  );
}
