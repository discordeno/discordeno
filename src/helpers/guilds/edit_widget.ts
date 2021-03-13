import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Modify a guild widget object for the guild. Requires the MANAGE_GUILD permission. */
export async function editWidget(
  guildID: string,
  enabled: boolean,
  channelID?: string | null,
) {
  await requireBotGuildPermissions(guildID, ["MANAGE_GUILD"]);

  const result = await RequestManager.patch(endpoints.GUILD_WIDGET(guildID), {
    enabled,
    channel_id: channelID,
  });

  return result;
}
