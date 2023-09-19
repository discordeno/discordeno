import type { DiscordWebhook, WebhookTypes } from '@discordeno/types'
import { iconHashToBigInt, type Bot, type Channel, type Guild, type User } from '../index.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformWebhook(bot: Bot, payload: DiscordWebhook) {
  const props = bot.transformers.desiredProperties.webhook
  const webhook = {} as Webhook

  if (props.id) webhook.id = bot.transformers.snowflake(payload.id)
  if (props.type) webhook.type = payload.type
  if (props.guildId && payload.guild_id) webhook.guildId = bot.transformers.snowflake(payload.guild_id)
  if (props.channelId && payload.channel_id) webhook.channelId = bot.transformers.snowflake(payload.channel_id)
  if (props.user && payload.user) webhook.user = bot.transformers.user(bot, payload.user)
  if (props.name) webhook.name = payload.name ?? ''
  if (props.avatar && payload.avatar) webhook.avatar = iconHashToBigInt(payload.avatar)
  if (props.token) webhook.token = payload.token
  if (props.applicationId && payload.application_id) webhook.applicationId = bot.transformers.snowflake(payload.application_id)
  if (props.sourceGuild && payload.source_guild)
    webhook.sourceGuild = {
      id: bot.transformers.snowflake(payload.source_guild.id!),
      name: payload.source_guild.name!,
      icon: payload.source_guild.icon ? iconHashToBigInt(payload.source_guild.icon) : undefined,
    }
  if (props.sourceChannel && payload.source_channel)
    webhook.sourceChannel = {
      id: bot.transformers.snowflake(payload.source_channel.id!),
      name: payload.source_channel.name ?? '',
    }
  if (props.url) webhook.url = payload.url

  return webhook
}

export interface Webhook {
  /** The type of the webhook */
  type: WebhookTypes
  /** The secure token of the webhook (returned for Incoming Webhooks) */
  token?: string
  /** The url used for executing the webhook (returned by the webhooks OAuth2 flow) */
  url?: string

  /** The id of the webhook */
  id: bigint
  /** The guild id this webhook is for */
  guildId?: bigint
  /** The channel id this webhook is for */
  channelId?: bigint
  /** The user this webhook was created by (not returned when getting a webhook with its token) */
  user?: User
  /** The default name of the webhook */
  name?: string
  /** The default user avatar hash of the webhook */
  avatar?: bigint
  /** The bot/OAuth2 application that created this webhook */
  applicationId?: bigint
  /** The guild of the channel that this webhook is following (returned for Channel Follower Webhooks) */
  sourceGuild?: Partial<Guild>
  /** The channel that this webhook is following (returned for Channel Follower Webhooks) */
  sourceChannel?: Partial<Channel>
}
