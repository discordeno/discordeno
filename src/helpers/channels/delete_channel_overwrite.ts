import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Delete the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
export async function deleteChannelOverwrite(
  guildID: string,
  channelID: string,
  overwriteID: string,
) {
  await requireBotGuildPermissions(guildID, ["MANAGE_ROLES"]);

  const result = await RequestManager.delete(
    endpoints.CHANNEL_OVERWRITE(channelID, overwriteID),
  );

  return result;
}
