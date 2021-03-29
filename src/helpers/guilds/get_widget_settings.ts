import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Returns the guild widget object. Requires the MANAGE_GUILD permission. */
export async function getWidgetSettings(guildId: string) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  const result = await RequestManager.get(endpoints.GUILD_WIdGET(guildId));

  return result;
}
