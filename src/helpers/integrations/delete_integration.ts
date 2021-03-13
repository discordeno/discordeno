import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Delete the attached integration object for the guild with this id. Requires MANAGE_GUILD permission. */
export async function deleteIntegration(guildID: string, id: string) {
  await requireBotGuildPermissions(guildID, ["MANAGE_GUILD"]);

  const result = await RequestManager.delete(
    endpoints.GUILD_INTEGRATION(guildID, id),
  );

  return result;
}
