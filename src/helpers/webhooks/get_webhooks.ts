import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Returns a list of guild webhooks objects. Requires the MANAGE_WEBHOOKs permission. */
export async function getWebhooks(guildId: string) {
  await requireBotGuildPermissions(guildId, ["MANAGE_WEBHOOKS"]);

  const result = await RequestManager.get(endpoints.GUILD_WEBHOOKS(guildId));

  return result;
}
