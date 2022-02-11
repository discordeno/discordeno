import type { Message } from "../../types/messages/message.ts";
import type { Bot } from "../../bot.ts";

/** Fetch a single message from the server. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessage(bot: Bot, channelId: bigint, id: bigint) {
  const result = await bot.rest.runMethod<Message>(
    bot.rest,
    "get",
    bot.constants.endpoints.CHANNEL_MESSAGE(channelId, id),
  );

  return bot.transformers.message(bot, result);
}
