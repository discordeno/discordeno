import type { Bot } from "../../bot.ts";
import { DiscordChannel } from "../../types/discord.ts";

/** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. Bot needs MANAGE_THREADS permissions in the server if deleting thread. */
export async function deleteChannel(bot: Bot, channelId: bigint, reason?: string) {
  await bot.rest.runMethod<DiscordChannel>(
    bot.rest,
    "delete",
    bot.constants.routes.CHANNEL(channelId),
    {
      reason,
    },
  );
}
