import type { Bot } from "../../bot.ts";

/** Adds multiple reactions to a message. If `ordered` is true(default is false), it will add the reactions one at a time in the order provided. Note: Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
export async function addReactions(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  reactions: string[],
  ordered = false,
): Promise<void> {
  if (!ordered) {
    return void await Promise.all(reactions.map((reaction) => bot.helpers.addReaction(channelId, messageId, reaction)));
  }

  for (const reaction of reactions) {
    await bot.helpers.addReaction(channelId, messageId, reaction);
  }
}
