import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

// TODO: Remove `delayMilliseconds` parameter.

/**
 * Deletes a message from a channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel to delete the message from.
 * @param messageId - The ID of the message to delete from the channel.
 *
 * @remarks
 * If not deleting own message:
 * - Requires the `MANAGE_MESSAGES` permission.
 *
 * Fires a _Message Delete_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#delete-message}
 */
export async function deleteMessage(
  bot: Bot,
  channelId: BigString,
  messageId: BigString,
  reason?: string,
  delayMilliseconds = 0,
): Promise<void> {
  if (delayMilliseconds) await bot.utils.delay(delayMilliseconds);

  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_MESSAGE(channelId, messageId),
    { reason },
  );
}
