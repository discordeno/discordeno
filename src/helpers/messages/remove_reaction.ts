import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Removes a reaction from the given user on this message, defaults to bot. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
export async function removeReaction(
  channelId: string,
  messageId: string,
  reaction: string,
  userId?: string,
) {
  if (userId) {
    await requireBotChannelPermissions(channelId, ["MANAGE_MESSAGES"]);
  }

  if (reaction.startsWith("<:")) {
    reaction = reaction.substring(2, reaction.length - 1);
  } else if (reaction.startsWith("<a:")) {
    reaction = reaction.substring(3, reaction.length - 1);
  }

  return await rest.runMethod<undefined>(
    "delete",
    userId
      ? endpoints.CHANNEL_MESSAGE_REACTION_USER(
        channelId,
        messageId,
        reaction,
        userId,
      )
      : endpoints.CHANNEL_MESSAGE_REACTION_ME(channelId, messageId, reaction),
  );
}
