import type { Message } from "../../types/messages/message.ts";
import type { Bot } from "../../bot.ts";

/** Get pinned messages in this channel. */
export async function getPins(bot: Bot, channelId: bigint) {
  const result = await bot.rest.runMethod<Message[]>(bot.rest, "get", bot.constants.endpoints.CHANNEL_PINS(channelId));

  return result.map(bot.transformers.message);
}
