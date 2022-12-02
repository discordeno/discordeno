import { DiscordGatewayPayload, DiscordInteraction } from '@discordeno/types'
import { Bot } from '../../bot.js'

export async function handleInteractionCreate (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<void> {
  bot.cache.unrepliedInteractions.add(
    bot.transformers.snowflake((data.d as DiscordInteraction).id)
  )
  bot.events.interactionCreate(
    bot,
    bot.transformers.interaction(bot, data.d as DiscordInteraction)
  )
}
