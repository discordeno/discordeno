import type {Bot} from "../../bot.ts";

/** Remove a role from the member */
export async function removeRole(bot: Bot, guildId: bigint, memberId: bigint, roleId: bigint, reason?: string) {
  const isHigherRolePosition = await bot.utils.isHigherPosition(bot,guildId, bot.id, roleId);
  if (!isHigherRolePosition) {
    throw new Error(bot.constants.Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
  }

  await bot.utils.requireBotGuildPermissions(bot,guildId, ["MANAGE_ROLES"]);

  return await bot.rest.runMethod<undefined>(bot.rest,"delete", bot.constants.endpoints.GUILD_MEMBER_ROLE(guildId, memberId, roleId), { reason });
}
