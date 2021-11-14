import { ChannelTypes } from "../../types/channels/channelTypes.ts";
import type { Bot } from "../../bot.ts";

/**
 * Trigger a typing indicator for the specified channel. Generally bots should **NOT** implement this route.
 * However, if a bot is responding to a command and expects the computation to take a few seconds,
 * this endpoint may be called to let the user know that the bot is processing their message.
 */
export async function startTyping(bot: Bot, channelId: bigint) {
  return await bot.rest.runMethod<undefined>(bot.rest, "post", bot.constants.endpoints.CHANNEL_TYPING(channelId));
}
