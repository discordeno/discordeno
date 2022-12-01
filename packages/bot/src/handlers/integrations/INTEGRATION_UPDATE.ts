import {
  DiscordGatewayPayload,
  DiscordIntegrationCreateUpdate
} from '@discordeno/types'
import { Bot } from '../../bot.js'

export function handleIntegrationUpdate (
  bot: Bot,
  data: DiscordGatewayPayload
): void {
  bot.events.integrationUpdate(
    bot,
    bot.transformers.integration(bot, data.d as DiscordIntegrationCreateUpdate)
  )
}
