import type { Bot } from "../../bot.ts";

/** Pin a message in a channel. Requires MANAGE_MESSAGES. Max pins allowed in a channel = 50. */
export async function pinMessage(bot: Bot, channelId: bigint, messageId: bigint): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "PUT", bot.constants.routes.CHANNEL_PIN(channelId, messageId));
}
