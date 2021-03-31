import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Removes a reaction from the specified user on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
export async function removeUserReaction(
  channelId: string,
  messageId: string,
  reaction: string,
  userId: string,
) {
  await requireBotChannelPermissions(channelId, ["MANAGE_MESSAGES"]);

  if (reaction.startsWith("<:")) {
    reaction = reaction.substring(2, reaction.length - 1);
  } else if (reaction.startsWith("<a:")) {
    reaction = reaction.substring(3, reaction.length - 1);
  }

  const result = await RequestManager.delete(
    endpoints.CHANNEL_MESSAGE_REACTION_USER(
      channelId,
      messageId,
      reaction,
      userId,
    ),
  );

  return result;
}
