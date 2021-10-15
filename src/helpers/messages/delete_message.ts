import { Bot } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { delay } from "../../util/utils.ts";

/** Delete a message with the channel id and message id only. */
export async function deleteMessage(bot: Bot, channelId: bigint, messageId: bigint, reason?: string, delayMilliseconds = 0) {
  const message = await cacheHandlers.get("messages", messageId);

  if (message && message.authorId !== bot.id) {
    await bot.utils.requireBotChannelPermissions(message.channelId, ["MANAGE_MESSAGES"]);
  }

  if (delayMilliseconds) await delay(delayMilliseconds);

  return await bot.rest.runMethod<undefined>(bot.rest,"delete", bot.constants.endpoints.CHANNEL_MESSAGE(channelId, messageId), { reason });
}
