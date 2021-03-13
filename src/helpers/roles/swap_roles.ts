import { RequestManager } from "../../rest/request_manager.ts";
import { PositionSwap } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Modify the positions of a set of role objects for the guild. Requires the MANAGE_ROLES permission. */
export async function swapRoles(guildID: string, rolePositons: PositionSwap) {
  await requireBotGuildPermissions(guildID, ["MANAGE_ROLES"]);

  const result = await RequestManager.patch(
    endpoints.GUILD_ROLES(guildID),
    rolePositons,
  );

  return result;
}
