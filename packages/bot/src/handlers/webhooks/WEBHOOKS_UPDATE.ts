import { DiscordGatewayPayload, DiscordWebhookUpdate } from '@discordeno/types'
import { Bot } from '../../bot.js'

export function handleWebhooksUpdate (bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordWebhookUpdate
  bot.events.webhooksUpdate(bot, {
    channelId: bot.transformers.snowflake(payload.channel_id),
    guildId: bot.transformers.snowflake(payload.guild_id)
  })
}
