import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Delete a guild role. Requires the MANAGE_ROLES permission. */
export async function deleteRole(guildID: string, id: string) {
  await requireBotGuildPermissions(guildID, ["MANAGE_ROLES"]);

  const result = await RequestManager.delete(endpoints.GUILD_ROLE(guildID, id));

  return result;
}
