import { RequestManager } from "../../../../../rest/request_manager.ts";
import { endpoints } from "../../../../../util/constants.ts";
import { botHasChannelPermissions } from "../../../../../util/permissions.ts";

/** Removes a reaction from the specified user on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
export async function removeUserReaction(
  channelID: string,
  messageID: string,
  reaction: string,
  userID: string,
) {
  const hasManageMessagesPerm = await botHasChannelPermissions(
    channelID,
    ["MANAGE_MESSAGES"],
  );
  if (!hasManageMessagesPerm) {
    throw new Error(Errors.MISSING_MANAGE_MESSAGES);
  }

  if (reaction.startsWith("<:")) {
    reaction = reaction.substring(2, reaction.length - 1);
  } else if (reaction.startsWith("<a:")) {
    reaction = reaction.substring(3, reaction.length - 1);
  }

  const result = await RequestManager.delete(
    endpoints.CHANNEL_MESSAGE_REACTION_USER(
      channelID,
      messageID,
      reaction,
      userID,
    ),
  );

  return result;
}
