import { botId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import {
  isHigherPosition,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";

/** Add a role to the member */
export async function addRole(
  guildId: string,
  memberId: string,
  roleId: string,
  reason?: string,
) {
  const isHigherRolePosition = await isHigherPosition(
    guildId,
    botId,
    roleId,
  );
  if (!isHigherRolePosition) {
    throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
  }

  await requireBotGuildPermissions(guildId, ["MANAGE_ROLES"]);

  const result = await rest.runMethod(
    "put",
    endpoints.GUILD_MEMBER_ROLE(guildId, memberId, roleId),
    { reason },
  );

  return result;
}
