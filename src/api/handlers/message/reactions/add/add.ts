import { RequestManager } from "../../../../../rest/request_manager.ts";
import { endpoints } from "../../../../../util/constants.ts";
import { botHasChannelPermissions } from "../../../../../util/permissions.ts";

/** Create a reaction for the message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
export async function addReaction(
  channelID: string,
  messageID: string,
  reaction: string,
) {
  const hasAddReactionsPerm = await botHasChannelPermissions(
    channelID,
    ["ADD_REACTIONS"],
  );
  if (!hasAddReactionsPerm) {
    throw new Error(Errors.MISSING_ADD_REACTIONS);
  }

  const hasReadMessageHistoryPerm = await botHasChannelPermissions(
    channelID,
    ["READ_MESSAGE_HISTORY"],
  );
  if (
    !hasReadMessageHistoryPerm
  ) {
    throw new Error(Errors.MISSING_READ_MESSAGE_HISTORY);
  }

  if (reaction.startsWith("<:")) {
    reaction = reaction.substring(2, reaction.length - 1);
  } else if (reaction.startsWith("<a:")) {
    reaction = reaction.substring(3, reaction.length - 1);
  }

  const result = await RequestManager.put(
    endpoints.CHANNEL_MESSAGE_REACTION_ME(
      channelID,
      messageID,
      reaction,
    ),
  );

  return result;
}
