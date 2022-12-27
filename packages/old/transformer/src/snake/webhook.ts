import type { Camelize, DiscordWebhook } from '@discordeno/types'
import { s1nakelize1User } from './member.js'

export function s1nakelize1Webhook (
  payload: Camelize<DiscordWebhook>
): DiscordWebhook {
  return {
    id: payload.id,
    type: payload.type,
    guild_id: payload.guildId ?? undefined,
    channel_id: payload.channelId ?? '',
    user: payload.user && s1nakelize1User(payload.user),
    name: payload.name,
    avatar: payload.avatar,
    token: payload.token,
    application_id: payload.applicationId,
    source_guild: payload.sourceGuild && {
      id: payload.sourceGuild.id!,
      name: payload.sourceGuild.name!,
      icon: payload.sourceGuild.icon
    },
    /** The channel that this webhook is following (returned for Channel Follower Webhooks) */
    source_channel: payload.sourceChannel && {
      id: payload.sourceChannel.id,
      name: payload.sourceChannel.name ?? ''
    },
    /** The url used for executing the webhook (returned by the webhooks OAuth2 flow) */
    url: payload.url
  }
}
