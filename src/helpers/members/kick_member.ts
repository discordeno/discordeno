import {Bot} from "../../bot.ts";
/** Kick a member from the server */
export async function kick(bot: Bot, guildId: bigint, memberId: bigint, reason?: string) {
  const botsHighestRole = await bot.utils.highestRole(bot,guildId, botId);
  const membersHighestRole = await bot.utils.highestRole(bot,guildId, memberId);
  if (botsHighestRole && membersHighestRole && botsHighestRole.position <= membersHighestRole.position) {
    throw new Error(bot.constants.Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
  }

  await bot.utils.requireBotGuildPermissions(bot,guildId, ["KICK_MEMBERS"]);

  return await bot.rest.runMethod<undefined>(bot.rest,"delete", bot.constants.endpoints.GUILD_MEMBER(guildId, memberId), { reason });
}

// aliases
export { kick as kickMember };
