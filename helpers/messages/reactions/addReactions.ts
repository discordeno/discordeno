import type { Bot } from "../../../bot.ts";
import { BigString } from "../../../types/shared.ts";

// TODO: Improve typing of the `reactions` parameter.

/**
 * Adds multiple a reaction to a message.
 *
 * This function uses the `addReaction()` helper behind the scenes.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel the message to add reactions to is in.
 * @param messageId - The ID of the message to add the reactions to.
 * @param reactions - The reactions to add to the message.
 * @param ordered - Whether the reactions must be added in order or not.
 *
 * @remarks
 * Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * If nobody else has reacted to the message:
 * - Requires the `ADD_REACTIONS` permission.
 *
 * Fires a _Message Reaction Add_ gateway event for every reaction added.
 */
export async function addReactions(
  bot: Bot,
  channelId: BigString,
  messageId: BigString,
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
