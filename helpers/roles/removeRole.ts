import type { Bot } from "../../bot.ts";

/** Remove a role from the member */
export async function removeRole(bot: Bot, guildId: bigint, memberId: bigint, roleId: bigint, reason?: string) {
  await bot.rest.runMethod<undefined>(
    bot.rest,
    "DELETE",
    bot.constants.routes.GUILD_MEMBER_ROLE(guildId, memberId, roleId),
    { reason },
  );
}
