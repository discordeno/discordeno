import { Bot } from '../../bot.js'
import { DiscordGatewayPayload, DiscordWebhookUpdate } from '../../types/discord.js'

export function handleWebhooksUpdate (bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordWebhookUpdate
  bot.events.webhooksUpdate(bot, {
    channelId: bot.transformers.snowflake(payload.channel_id),
    guildId: bot.transformers.snowflake(payload.guild_id)
  })
}
