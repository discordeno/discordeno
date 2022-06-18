/** Unpin a message in a channel. Requires MANAGE_MESSAGES. */
import { Bot } from "../../bot.ts";

export async function unpinMessage(bot: Bot, channelId: bigint, messageId: bigint) {
  await bot.rest.runMethod<undefined>(bot.rest, "DELETE", bot.constants.routes.CHANNEL_PIN(channelId, messageId));
}
