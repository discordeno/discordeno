import { Bot } from '../../bot.js'
import { DiscordGatewayPayload, DiscordIntegrationCreateUpdate } from '../../types/discord.js'

export function handleIntegrationCreate(bot: Bot, data: DiscordGatewayPayload) {
  bot.events.integrationCreate(
    bot,
    bot.transformers.integration(bot, data.d as DiscordIntegrationCreateUpdate)
  )
}
