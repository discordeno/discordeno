import type { Bot } from "../../bot.ts";

/** Add a role to the member */
export async function addRole(
  bot: Bot,
  guildId: bigint,
  memberId: bigint,
  roleId: bigint,
  reason?: string,
): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "PUT",
    bot.constants.routes.GUILD_MEMBER_ROLE(guildId, memberId, roleId),
    { reason },
  );
}
