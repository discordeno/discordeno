/** Removes all reactions for a single emoji on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
import type { Bot } from "../../bot.ts";

export async function removeReactionEmoji(bot: Bot, channelId: bigint, messageId: bigint, reaction: string) {
  if (reaction.startsWith("<:")) {
    reaction = reaction.substring(2, reaction.length - 1);
  } else if (reaction.startsWith("<a:")) {
    reaction = reaction.substring(3, reaction.length - 1);
  }

  await bot.rest.runMethod<undefined>(
    bot.rest,
    "delete",
    bot.constants.routes.CHANNEL_MESSAGE_REACTION(channelId, messageId, reaction),
  );
}
