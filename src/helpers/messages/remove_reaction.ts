import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Removes a reaction from the bot on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
export async function removeReaction(
  channelId: string,
  messageId: string,
  reaction: string,
) {
  if (reaction.startsWith("<:")) {
    reaction = reaction.substring(2, reaction.length - 1);
  } else if (reaction.startsWith("<a:")) {
    reaction = reaction.substring(3, reaction.length - 1);
  }

  const result = await rest.runMethod(
    "delete",
    endpoints.CHANNEL_MESSAGE_REACTION_ME(channelId, messageId, reaction),
  );

  return result;
}
