import type { DiscordWebhook } from '@discordeno/types'
import { iconHashToBigInt, type Bot } from '../index.js'
import type { Optionalize } from '../optionalize.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformWebhook(bot: Bot, payload: DiscordWebhook) {
  const webhook = {
    id: bot.transformers.snowflake(payload.id),
    type: payload.type,
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    channelId: payload.channel_id ? bot.transformers.snowflake(payload.channel_id) : undefined,
    user: payload.user ? bot.transformers.user(bot, payload.user) : undefined,
    name: payload.name ?? '',
    avatar: payload.avatar ? iconHashToBigInt(payload.avatar) : undefined,
    token: payload.token,
    applicationId: payload.application_id ? bot.transformers.snowflake(payload.application_id) : undefined,
    sourceGuild: payload.source_guild
      ? {
          id: bot.transformers.snowflake(payload.source_guild.id!),
          name: payload.source_guild.name!,
          icon: payload.source_guild.icon ? iconHashToBigInt(payload.source_guild.icon) : undefined,
        }
      : undefined,
    /** The channel that this webhook is following (returned for Channel Follower Webhooks) */
    sourceChannel: payload.source_channel
      ? {
          id: bot.transformers.snowflake(payload.source_channel.id!),
          name: payload.source_channel.name ?? '',
        }
      : undefined,
    /** The url used for executing the webhook (returned by the webhooks OAuth2 flow) */
    url: payload.url,
  }

  return webhook as Optionalize<typeof webhook>
}

export interface Webhook extends ReturnType<typeof transformWebhook> {}
