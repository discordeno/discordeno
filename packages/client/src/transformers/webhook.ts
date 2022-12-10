import type { DiscordWebhook, Optionalize } from '@discordeno/types'
import type { Client } from '../client.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformWebhook (client: Client, payload: DiscordWebhook) {
  const webhook = {
    id: client.transformers.snowflake(payload.id),
    type: payload.type,
    guildId: payload.guild_id
      ? client.transformers.snowflake(payload.guild_id)
      : undefined,
    channelId: payload.channel_id
      ? client.transformers.snowflake(payload.channel_id)
      : undefined,
    user: payload.user
      ? client.transformers.user(client, payload.user)
      : undefined,
    name: payload.name ?? '',
    avatar: payload.avatar
      ? client.utils.iconHashToBigInt(payload.avatar)
      : undefined,
    token: payload.token,
    applicationId: payload.application_id
      ? client.transformers.snowflake(payload.application_id)
      : undefined,
    sourceGuild: payload.source_guild
      ? {
          id: client.transformers.snowflake(payload.source_guild.id!),
          name: payload.source_guild.name!,
          icon: payload.source_guild.icon
            ? client.utils.iconHashToBigInt(payload.source_guild.icon)
            : undefined
        }
      : undefined,
    /** The channel that this webhook is following (returned for Channel Follower Webhooks) */
    sourceChannel: payload.source_channel
      ? {
          id: client.transformers.snowflake(payload.source_channel.id!),
          name: payload.source_channel.name ?? ''
        }
      : undefined,
    /** The url used for executing the webhook (returned by the webhooks OAuth2 flow) */
    url: payload.url
  }

  return webhook as Optionalize<typeof webhook>
}

export interface Webhook extends ReturnType<typeof transformWebhook> {}
