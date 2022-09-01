/** Unpin a message in a channel. Requires MANAGE_MESSAGES. */
import type { Bot } from "../../bot.ts";

export async function unpinMessage(bot: Bot, channelId: bigint, messageId: bigint): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_PIN(channelId, messageId),
  );
}
