import type { DiscordGatewayPayload, DiscordInteraction } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleInteractionCreate(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  if (!bot.events.interactionCreate) return

  bot.events.interactionCreate(
    bot.transformers.interaction(bot, {
      interaction: data.d as DiscordInteraction,
      shardId,
    }),
  )
}
