import type { Camelize, DiscordWebhook } from '@discordeno/types'
import TRANSFORMERS from '../index.js'

export function c1amelize1Webhook (payload: DiscordWebhook): Camelize<DiscordWebhook> {
  return {
    id: payload.id,
    url: payload.url,
    name: payload.name,
    type: payload.type,
    token: payload.token,
    avatar: payload.avatar,

    guildId: payload.guild_id,
    channelId: payload.channel_id,
    applicationId: payload.application_id,

    sourceChannel: payload.source_channel && {
      id: payload.source_channel.id
    },
    sourceGuild: payload.source_guild && {
      id: payload.source_guild.id
    },

    user: payload.user && TRANSFORMERS.user(payload.user)
  }
}
