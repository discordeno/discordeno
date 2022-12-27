import type { Camelize, DiscordFollowedChannel } from '@discordeno/types'

export function c1amelize1FollowedChannel (
  payload: DiscordFollowedChannel
): Camelize<DiscordFollowedChannel> {
  return {
    channelId: payload.channel_id,
    webhookId: payload.webhook_id
  }
}
