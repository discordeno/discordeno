import { DiscordGatewayPayload, DiscordGuild } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export function handleGuildUpdate (
  bot: Bot,
  data: DiscordGatewayPayload,
  shardId: number
): void {
  const payload = data.d as DiscordGuild

  bot.events.guildUpdate(
    bot,
    bot.transformers.guild(bot, { guild: payload, shardId })
  )
}
