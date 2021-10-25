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
  const message = await bot.cache.messages.get(messageId);

  if (message && message.authorId !== bot.id) {
    await bot.utils.requireBotChannelPermissions(bot, message.channelId, ["MANAGE_MESSAGES"]);
  }

  if (delayMilliseconds) await bot.utils.delay(delayMilliseconds);

  return await bot.rest.runMethod<undefined>(
    bot.rest,
    "delete",
    bot.constants.endpoints.CHANNEL_MESSAGE(channelId, messageId),
    { reason }
  );
}
