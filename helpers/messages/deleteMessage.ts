import type { Bot } from "../../bot.ts";

/** Delete a message with the channel id and message id only. */
export async function deleteMessage(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  reason?: string,
  delayMilliseconds = 0,
): Promise<void> {
  if (delayMilliseconds) await bot.utils.delay(delayMilliseconds);

  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_MESSAGE(channelId, messageId),
    { reason },
  );
}
