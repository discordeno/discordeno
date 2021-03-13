import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Gets the invites for this channel. Requires MANAGE_CHANNEL */
export async function getChannelInvites(channelID: string) {
  await requireBotChannelPermissions(channelID, ["MANAGE_CHANNELS"]);

  const result = await RequestManager.get(endpoints.CHANNEL_INVITES(channelID));

  return result;
}
