import { botID } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import {
  highestRole,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";

/** Kick a member from the server */
export async function kick(guildID: string, memberID: string, reason?: string) {
  const botsHighestRole = await highestRole(guildID, botID);
  const membersHighestRole = await highestRole(guildID, memberID);
  if (
    botsHighestRole && membersHighestRole &&
    botsHighestRole.position <= membersHighestRole.position
  ) {
    throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
  }

  await requireBotGuildPermissions(guildID, ["KICK_MEMBERS"]);

  const result = await RequestManager.delete(
    endpoints.GUILD_MEMBER(guildID, memberID),
    { reason },
  );

  return result;
}

// aliases
export { kick as kickMember };
