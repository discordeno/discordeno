import type { Bot } from "../../../bot.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Deletes all reactions for all emojis from a message.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel the message to delete the reactions from is in.
 * @param messageId - The ID of the message to delete the reactions from.
 *
 * @remarks
 * Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * Requires the `MANAGE_MESSAGES` permission.
 *
 * Fires a _Message Reaction Remove All_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#delete-all-reactions}
 */
export async function deleteReactionsAll(bot: Bot, channelId: BigString, messageId: BigString): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_MESSAGE_REACTIONS(channelId, messageId),
  );
}
