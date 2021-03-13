import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Sync an integration. Requires the MANAGE_GUILD permission. */
export async function syncIntegration(guildID: string, id: string) {
  await requireBotGuildPermissions(guildID, ["MANAGE_GUILD"]);

  const result = await RequestManager.post(
    endpoints.GUILD_INTEGRATION_SYNC(guildID, id),
  );

  return result;
}
