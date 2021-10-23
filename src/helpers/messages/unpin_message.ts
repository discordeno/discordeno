/** Unpin a message in a channel. Requires MANAGE_MESSAGES. */
import type { Bot } from "../../bot.ts";

export async function unpin(bot: Bot, channelId: bigint, messageId: bigint): Promise<undefined> {
  await bot.utils.requireBotChannelPermissions(bot, channelId, ["MANAGE_MESSAGES"]);

  return await bot.rest.runMethod<undefined>(
    bot.rest,
    "delete",
    bot.constants.endpoints.CHANNEL_PIN(channelId, messageId)
  );
}

// aliases
export { unpin as unpinMessage };
