import { RequestManager } from "../../../../rest/request_manager.ts";
import { endpoints } from "../../../../util/constants.ts";
import { botHasChannelPermissions } from "../../../../util/permissions.ts";

/** Unpin a message in a channel. Requires MANAGE_MESSAGES. */
export async function unpin(channelID: string, messageID: string) {
  const hasManageMessagesPerm = await botHasChannelPermissions(
    channelID,
    ["MANAGE_MESSAGES"],
  );
  if (
    !hasManageMessagesPerm
  ) {
    throw new Error(Errors.MISSING_MANAGE_MESSAGES);
  }

  const result = await RequestManager.delete(
    endpoints.CHANNEL_PIN(channelID, messageID),
  );

  return result;
}
