import type { Bot } from "../../bot.ts";

/** Delete a message with the channel id and message id only. */
export async function deleteMessage(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  reason?: string,
  delayMilliseconds = 0,
) {
  if (delayMilliseconds) await bot.utils.delay(delayMilliseconds);

  await bot.rest.runMethod<undefined>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_MESSAGE(channelId, messageId),
    { reason },
  );
}
