// import { cacheHandlers } from "../../cache.ts";
import type { Bot } from "../../bot.ts";

/** Delete a message with the channel id and message id only. */
export async function deleteMessage(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  reason?: string,
  delayMilliseconds = 0
) {
  if (delayMilliseconds) await bot.utils.delay(delayMilliseconds);

  return await bot.rest.runMethod<undefined>(
    bot.rest,
    "delete",
    bot.constants.endpoints.CHANNEL_MESSAGE(channelId, messageId),
    { reason }
  );
}
