import type { DiscordGatewayPayload, DiscordIntegrationCreateUpdate } from '@discordeno/types'
import type { Bot } from '../../index.js'

export function handleIntegrationCreate(bot: Bot, data: DiscordGatewayPayload) {
  bot.events.integrationCreate?.(bot.transformers.integration(bot, data.d as DiscordIntegrationCreateUpdate))
}
