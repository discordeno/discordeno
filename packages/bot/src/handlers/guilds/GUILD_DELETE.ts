import type { DiscordGatewayPayload, DiscordUnavailableGuild } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleGuildDelete(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  if (!bot.events.guildDelete) return

  const payload = data.d as DiscordUnavailableGuild

  bot.events.guildDelete(
    {
      id: bot.transformers.snowflake(payload.id),
      unavailable: payload.unavailable ?? false,
    },
    shardId,
  )
}
