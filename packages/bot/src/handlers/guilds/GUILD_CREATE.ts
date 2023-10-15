import type { DiscordGatewayPayload, DiscordGuild } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleGuildCreate(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  if (!bot.events.guildCreate) return

  const payload = data.d as DiscordGuild
  bot.events.guildCreate(bot.transformers.guild(bot, { guild: payload, shardId }))
}
