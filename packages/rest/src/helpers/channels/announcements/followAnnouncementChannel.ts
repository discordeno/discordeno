import type { BigString, DiscordFollowedChannel } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

/**
 * Follows an announcement channel, allowing messages posted within it to be cross-posted into the target channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param sourceChannelId - The ID of the announcement channel to follow.
 * @param targetChannelId - The ID of the target channel - the channel to cross-post to.
 * @returns An instance of {@link DiscordFollowedChannel}.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission in the __target channel__.
 *
 * Fires a _Webhooks Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#follow-announcement-channel}
 */
export async function followAnnouncementChannel (
  rest: RestManager,
  sourceChannelId: BigString,
  targetChannelId: BigString
): Promise<DiscordFollowedChannel> {
  const result = await rest.runMethod<DiscordFollowedChannel>(
    rest,
    'POST',
    rest.constants.routes.CHANNEL_FOLLOW(sourceChannelId),
    {
      webhook_channel_id: targetChannelId
    }
  )

  return result
}
