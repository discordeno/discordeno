import type { Bot } from "../../../bot.ts";
import { BigString } from "../../../types/shared.ts";
import { processReactionString } from "./getReactions.ts";

/**
 * Deletes all reactions for an emoji from a message.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel the message to delete the reactions from is in.
 * @param messageId - The ID of the message to delete the reactions from.
 * @param reaction - The reaction to remove from the message.
 *
 * @remarks
 * Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * Requires the `MANAGE_MESSAGES` permission.
 *
 * Fires a _Message Reaction Remove Emoji_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji}
 */
export async function deleteReactionsEmoji(
  bot: Bot,
  channelId: BigString,
  messageId: BigString,
  reaction: string,
): Promise<void> {
  reaction = processReactionString(reaction);

  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_MESSAGE_REACTION(channelId, messageId, reaction),
  );
}
