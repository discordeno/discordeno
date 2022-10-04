import type { Bot } from "../../bot.ts";
import { Message } from "../../transformers/message.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";

export const publishMessage = crosspostMessage;

/**
 * Cross-posts a message posted in an announcement channel to subscribed channels.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the announcement channel.
 * @param messageId - The ID of the message to cross-post.
 * @returns An instance of the cross-posted {@link Message}.
 *
 * @remarks
 * Requires the `SEND_MESSAGES` permission.
 *
 * If not cross-posting own message:
 * - Requires the `MANAGE_MESSAGES` permission.
 *
 * Fires a _Message Create_ event in the guilds the subscribed channels are in.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#crosspost-message}
 */
export async function crosspostMessage(bot: Bot, channelId: BigString, messageId: BigString): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "POST",
    bot.constants.routes.CHANNEL_MESSAGE_CROSSPOST(channelId, messageId),
  );

  return bot.transformers.message(bot, result);
}
