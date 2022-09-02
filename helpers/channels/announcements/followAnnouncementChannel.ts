import type { Bot } from "../../../bot.ts";
import { DiscordFollowedChannel } from "../../../types/discord.ts";

/** Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel. Returns the webhook id. */
export async function followAnnouncementChannel(
  bot: Bot,
  sourceChannelId: bigint,
  targetChannelId: bigint,
): Promise<bigint> {
  const result = await bot.rest.runMethod<DiscordFollowedChannel>(
    bot.rest,
    "POST",
    bot.constants.routes.CHANNEL_FOLLOW(sourceChannelId),
    {
      webhook_channel_id: targetChannelId,
    },
  );

  return bot.transformers.snowflake(result.webhook_id);
}
