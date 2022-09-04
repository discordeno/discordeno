import type { Bot } from "../../../bot.ts";
import { processReactionString } from "./getReactions.ts";

/** Removes all reactions for a single emoji on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
export async function deleteReactionsEmoji(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  reaction: string,
): Promise<void> {
  reaction = processReactionString(reaction);

  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_MESSAGE_REACTION(channelId, messageId, reaction),
  );
}
