import { DiscordGatewayPayload, DiscordIntegrationCreateUpdate } from '@discordeno/types'
import { Bot } from '../../bot.js'

export function handleIntegrationUpdate (bot: Bot, data: DiscordGatewayPayload) {
  bot.events.integrationUpdate(
    bot,
    bot.transformers.integration(bot, data.d as DiscordIntegrationCreateUpdate)
  )
}
