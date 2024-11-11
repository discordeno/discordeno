import type { DiscordWebhook } from '@discordeno/types'
import { type InternalBot, type Webhook, iconHashToBigInt } from '../index.js'

export function transformWebhook(bot: InternalBot, payload: DiscordWebhook): typeof bot.transformers.$inferredTypes.webhook {
  const props = bot.transformers.desiredProperties.webhook
  const webhook = {} as Webhook

  if (props.id && payload.id) webhook.id = bot.transformers.snowflake(payload.id)
  if (props.type && payload.type) webhook.type = payload.type
  if (props.guildId && payload.guild_id) webhook.guildId = bot.transformers.snowflake(payload.guild_id)
  if (props.channelId && payload.channel_id) webhook.channelId = bot.transformers.snowflake(payload.channel_id)
  if (props.user && payload.user) webhook.user = bot.transformers.user(bot, payload.user)
  if (props.name && payload.name) webhook.name = payload.name
  if (props.avatar && payload.avatar) webhook.avatar = iconHashToBigInt(payload.avatar)
  if (props.token && payload.token) webhook.token = payload.token
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
  if (props.url && payload.url) webhook.url = payload.url

  return bot.transformers.customizers.webhook(bot, payload, webhook)
}
