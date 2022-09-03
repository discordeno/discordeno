import type { Bot } from "../../../bot.ts";
import { processReactionString } from "./getReactions.ts";

/** Create a reaction for the message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
export async function addReaction(bot: Bot, channelId: bigint, messageId: bigint, reaction: string): Promise<void> {
  reaction = processReactionString(reaction);

  return await bot.rest.runMethod<void>(
    bot.rest,
    "PUT",
    bot.constants.routes.CHANNEL_MESSAGE_REACTION_ME(channelId, messageId, reaction),
  );
}
