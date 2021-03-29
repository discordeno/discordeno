import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Sync an integration. Requires the MANAGE_GUILD permission. */
export async function syncIntegration(guildId: string, id: string) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  const result = await RequestManager.post(
    endpoints.GUILD_INTEGRATION_SYNC(guildId, id),
  );

  return result;
}
