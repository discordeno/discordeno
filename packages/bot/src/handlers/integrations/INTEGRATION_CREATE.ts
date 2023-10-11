import type { DiscordGatewayPayload, DiscordIntegrationCreateUpdate } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleIntegrationCreate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.integrationCreate) return

  bot.events.integrationCreate(bot.transformers.integration(bot, data.d as DiscordIntegrationCreateUpdate))
}
