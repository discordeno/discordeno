import type { DiscordGatewayPayload, DiscordUnavailableGuild } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleGuildDelete(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  const payload = data.d as DiscordUnavailableGuild

  if (bot.events.guildUnavailable && payload.unavailable) {
    bot.events.guildUnavailable(bot.transformers.snowflake(payload.id), shardId)
    return
  }

  if (bot.events.guildDelete) {
    bot.events.guildDelete(bot.transformers.snowflake(payload.id), shardId)
  }
}
