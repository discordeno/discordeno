import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Modify the behavior and settings of an integration object for the guild. Requires the MANAGE_GUILD permission. */
export async function editIntegration(
  guildId: string,
  id: string,
  options: EditIntegrationOptions,
) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  const result = await RequestManager.patch(
    endpoints.GUILD_INTEGRATION(guildId, id),
    options,
  );

  return result;
}
