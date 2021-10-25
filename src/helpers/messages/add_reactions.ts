import type { Bot } from "../../bot.ts";

/** Adds multiple reactions to a message. If `ordered` is true(default is false), it will add the reactions one at a time in the order provided. Note: Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
export async function addReactions(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  reactions: string[],
  ordered = false
) {
  if (!ordered) {
    await Promise.all(reactions.map((reaction) => bot.helpers.addReaction(bot, channelId, messageId, reaction)));
  } else {
    for (const reaction of reactions) {
      bot.events.debug("Running for of loop in addReactions function.");
      await bot.helpers.addReaction(bot, channelId, messageId, reaction);
    }
  }
}
