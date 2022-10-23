import type { Bot } from "../../../bot.ts";
import { DiscordFollowedChannel } from "../../../types/discord.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Follows an announcement channel, allowing messages posted within it to be cross-posted into the target channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param sourceChannelId - The ID of the announcement channel to follow.
 * @param targetChannelId - The ID of the target channel - the channel to cross-post to.
 * @returns An instance of {@link FollowedChannel}.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission in the __target channel__.
 *
 * Fires a _Webhooks Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#follow-announcement-channel}
 */
export async function followAnnouncementChannel(
  bot: Bot,
  sourceChannelId: BigString,
  targetChannelId: BigString,
): Promise<bigint> {
  const webhookId = await bot.rest.followAnnouncementChannel(sourceChannelId, targetChannelId);

  return bot.transformers.snowflake(webhookId);
}
