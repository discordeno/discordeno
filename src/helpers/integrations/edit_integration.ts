import { RequestManager } from "../../rest/request_manager.ts";
import { EditIntegrationOptions } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Modify the behavior and settings of an integration object for the guild. Requires the MANAGE_GUILD permission. */
export async function editIntegration(
  guildID: string,
  id: string,
  options: EditIntegrationOptions,
) {
  await requireBotGuildPermissions(guildID, ["MANAGE_GUILD"]);

  const result = await RequestManager.patch(
    endpoints.GUILD_INTEGRATION(guildID, id),
    options,
  );

  return result;
}
