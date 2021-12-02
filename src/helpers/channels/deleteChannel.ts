import type { Bot } from "../../bot.ts";
import { Channel } from "../../types/channels/channel.ts";

/** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. Bot needs MANAGE_THREADS permissions in the server if deleting thread. */
export async function deleteChannel(bot: Bot, channelId: bigint, reason?: string) {
  await bot.rest.runMethod<Channel>(
    bot.rest,
    "delete",
    bot.constants.endpoints.CHANNEL_BASE(channelId),
    {
      reason,
    }
  );
}
