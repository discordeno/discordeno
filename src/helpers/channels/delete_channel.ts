import type { Bot } from "../../bot.ts";

/** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export async function deleteChannel(bot: Bot, channelId: bigint, reason?: string) {
  return await bot.rest.runMethod<undefined>(bot.rest, "delete", bot.constants.endpoints.CHANNEL_BASE(channelId), {
    reason,
  });
}
