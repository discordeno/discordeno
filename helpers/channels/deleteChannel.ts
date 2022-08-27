import type { Bot } from "../../bot.ts";

/** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. Bot needs MANAGE_THREADS permissions in the server if deleting thread. */
export async function deleteChannel(bot: Bot, channelId: bigint, reason?: string): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL(channelId),
    {
      reason,
    },
  );
}
