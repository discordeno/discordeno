import type { Camelize, DiscordWebhook } from '@discordeno/types'
import { c1amelize1User } from './member.js'

export function c1amelize1Webhook (
  payload: DiscordWebhook
): Camelize<DiscordWebhook> {
  return {
    id: payload.id,
    type: payload.type,
    guildId: payload.guild_id ?? '',
    channelId: payload.channel_id ?? '',
    user: payload.user && c1amelize1User(payload.user),
    name: payload.name ?? '',
    avatar: payload.avatar,
    token: payload.token,
    applicationId: payload.application_id,
    sourceGuild: payload.source_guild && {
      id: payload.source_guild.id!,
      name: payload.source_guild.name!,
      icon: payload.source_guild.icon
    },
    /** The channel that this webhook is following (returned for Channel Follower Webhooks) */
    sourceChannel: payload.source_channel && {
      id: payload.source_channel.id!,
      name: payload.source_channel.name ?? ''
    },
    /** The url used for executing the webhook (returned by the webhooks OAuth2 flow) */
    url: payload.url
  }
}
