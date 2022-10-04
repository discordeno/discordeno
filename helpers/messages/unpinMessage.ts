import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Unpins a pinned message in a channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel where the message is pinned.
 * @param messageId - The ID of the message to unpin.
 *
 * @remarks
 * Requires that the bot user be able to see the contents of the channel in which the messages were posted.
 *
 * Requires the `MANAGE_MESSAGES` permission.
 *
 * Fires a _Channel Pins Update_ event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#unpin-message}
 */
export async function unpinMessage(
  bot: Bot,
  channelId: BigString,
  messageId: BigString,
  reason?: string,
): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_PIN(channelId, messageId),
    reason ? { reason } : undefined,
  );
}
