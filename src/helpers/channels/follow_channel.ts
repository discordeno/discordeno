import type { FollowedChannel } from "../../types/channels/followed_channel.ts";
import type { Bot } from "../../bot.ts";

/** Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel. Returns the webhook id. */
export async function followChannel(bot: Bot, sourceChannelId: bigint, targetChannelId: bigint) {
  const data = await bot.rest.runMethod<FollowedChannel>(
    bot.rest,
    "post",
    bot.constants.endpoints.CHANNEL_FOLLOW(sourceChannelId),
    {
      webhook_channel_id: targetChannelId,
    }
  );

  return bot.transformers.snowflake(data.webhook_id);
}
