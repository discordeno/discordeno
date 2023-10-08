import type { DiscordGatewayPayload, DiscordGuild } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleGuildUpdate(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  if (bot.events.guildUpdate === undefined) return

  const payload = data.d as DiscordGuild

  bot.events.guildUpdate(bot.transformers.guild(bot, { guild: payload, shardId }))
}
