import type { DiscordGatewayPayload, DiscordInteraction } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleInteractionCreate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.interactionCreate) return

  bot.events.interactionCreate(bot.transformers.interaction(bot, data.d as DiscordInteraction))
}
