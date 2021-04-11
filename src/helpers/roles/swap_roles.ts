import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Modify the positions of a set of role objects for the guild. Requires the MANAGE_ROLES permission. */
export async function swapRoles(guildId: string, rolePositions: PositionSwap) {
  await requireBotGuildPermissions(guildId, ["MANAGE_ROLES"]);

  const result = await rest.runMethod(
    "patch",
    endpoints.GUILD_ROLES(guildId),
    rolePositions,
  );

  return result;
}
