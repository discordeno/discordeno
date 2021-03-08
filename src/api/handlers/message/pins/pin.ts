import { RequestManager } from "../../../../rest/request_manager.ts";
import { endpoints } from "../../../../util/constants.ts";
import { botHasChannelPermissions } from "../../../../util/permissions.ts";

/** Pin a message in a channel. Requires MANAGE_MESSAGES. Max pins allowed in a channel = 50. */
export async function pin(channelID: string, messageID: string) {
  const hasManageMessagesPerm = await botHasChannelPermissions(
    channelID,
    ["MANAGE_MESSAGES"],
  );
  if (
    !hasManageMessagesPerm
  ) {
    throw new Error(Errors.MISSING_MANAGE_MESSAGES);
  }

  const result = await RequestManager.put(
    endpoints.CHANNEL_PIN(channelID, messageID),
  );

  return result;
}
