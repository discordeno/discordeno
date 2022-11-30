import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Pins a message in a channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel where the message is to be pinned.
 * @param messageId - The ID of the message to pin.
 *
 * @remarks
 * Requires that the bot user be able to see the contents of the channel in which the messages were posted.
 *
 * Requires the `MANAGE_MESSAGES` permission.
 *
 * ⚠️ There can only be at max 50 messages pinned in a channel.
 *
 * Fires a _Channel Pins Update_ event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#pin-message}
 */
export async function pinMessage(bot: Bot, channelId: BigString, messageId: BigString, reason?: string): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "PUT",
    bot.constants.routes.CHANNEL_PIN(channelId, messageId),
    reason ? { reason } : undefined,
  );
}
