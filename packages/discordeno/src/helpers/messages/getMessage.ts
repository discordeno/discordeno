import type { Bot } from "../../bot.ts";
import { Message } from "../../transformers/message.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Gets a message from a channel by the ID of the message.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel from which to get the message.
 * @param messageId - The ID of the message to get.
 * @returns An instance of {@link Message}.
 *
 * @remarks
 * Requires that the bot user be able to see the contents of the channel in which the message was posted.
 *
 * If getting a message from a guild channel:
 * - Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#get-channel-message}
 */
export async function getMessage(bot: Bot, channelId: BigString, messageId: BigString): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "GET",
    bot.constants.routes.CHANNEL_MESSAGE(channelId, messageId),
  );

  return bot.transformers.message(bot, result);
}
