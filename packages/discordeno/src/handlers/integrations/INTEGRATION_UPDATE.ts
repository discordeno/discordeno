import { Bot } from '../../bot.js'
import { DiscordGatewayPayload, DiscordIntegrationCreateUpdate } from '../../types/discord.js'

export function handleIntegrationUpdate(bot: Bot, data: DiscordGatewayPayload) {
  bot.events.integrationUpdate(
    bot,
    bot.transformers.integration(bot, data.d as DiscordIntegrationCreateUpdate)
  )
}
