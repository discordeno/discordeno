import { DiscordGatewayPayload, DiscordIntegrationCreateUpdate } from '@discordeno/types'
import { Bot } from '../../bot.js'

export function handleIntegrationCreate (bot: Bot, data: DiscordGatewayPayload) {
  bot.events.integrationCreate(
    bot,
    bot.transformers.integration(bot, data.d as DiscordIntegrationCreateUpdate)
  )
}
