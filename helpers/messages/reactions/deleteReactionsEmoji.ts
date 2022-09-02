import type { Bot } from "../../../bot.ts";

/** Removes all reactions for a single emoji on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
export async function deleteReactionsEmoji(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  reaction: string,
): Promise<void> {
  if (reaction.startsWith("<:")) {
    reaction = reaction.substring(2, reaction.length - 1);
  } else if (reaction.startsWith("<a:")) {
    reaction = reaction.substring(3, reaction.length - 1);
  }

  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_MESSAGE_REACTION(channelId, messageId, reaction),
  );
}
