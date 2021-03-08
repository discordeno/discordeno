import { RequestManager } from "../../../../../rest/request_manager.ts";
import { endpoints } from "../../../../../util/constants.ts";
import { botHasChannelPermissions } from "../../../../../util/permissions.ts";

/** Removes all reactions for all emojis on this message. */
export async function removeAllReactions(channelID: string, messageID: string) {
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
    endpoints.CHANNEL_MESSAGE_REACTIONS(channelID, messageID),
  );

  return result;
}
