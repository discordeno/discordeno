import { addReaction } from "./add_reaction.ts";

/** Adds multiple reactions to a message. If `ordered` is true(default is false), it will add the reactions one at a time in the order provided. Note: Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
export async function addReactions(
  channelID: string,
  messageID: string,
  reactions: string[],
  ordered = false,
) {
  if (!ordered) {
    await Promise.all(
      reactions.map((reaction) => addReaction(channelID, messageID, reaction)),
    );
  } else {
    for (const reaction of reactions) {
      await addReaction(channelID, messageID, reaction);
    }
  }
}
