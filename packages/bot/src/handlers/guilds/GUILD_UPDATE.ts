import type { DiscordGatewayPayload, DiscordGuild } from '@discordeno/types'
import type { Bot } from '../../bot.js'
import type { Guild } from '../../transformers/guild.js'

export function handleGuildUpdate(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordGuild

  bot.events.guildUpdate?.(bot.transformers.guild(bot, { guild: payload, shardId }) as Guild)
}
