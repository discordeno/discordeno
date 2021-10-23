import { cacheHandlers } from "../../cache.ts";
import type { Message } from "../../types/messages/message.ts";
import type { Bot } from "../../bot.ts";
import type { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Fetch a single message from the server. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessage(bot: Bot, channelId: bigint, id: bigint) {
  if (await cacheHandlers.has("channels", channelId)) {
    await bot.utils.requireBotChannelPermissions(bot, channelId, ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]);
  }

  const result = await bot.rest.runMethod<SnakeCasedPropertiesDeep<Message>>(
    bot.rest,
    "get",
    bot.constants.endpoints.CHANNEL_MESSAGE(channelId, id)
  );

  return bot.transformers.message(bot, result);
}
