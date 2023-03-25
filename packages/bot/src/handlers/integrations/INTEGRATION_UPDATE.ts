import type { DiscordGatewayPayload, DiscordIntegrationCreateUpdate } from '@discordeno/types'
import type { Bot } from '../../index.js'

export function handleIntegrationUpdate(bot: Bot, data: DiscordGatewayPayload) {
  bot.events.integrationUpdate?.(bot.transformers.integration(bot, data.d as DiscordIntegrationCreateUpdate))
}
