import {
  DiscordGatewayPayload,
  DiscordUnavailableGuild
} from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleGuildDelete (
  bot: Bot,
  data: DiscordGatewayPayload,
  shardId: number
): Promise<void> {
  const payload = data.d as DiscordUnavailableGuild
  bot.events.guildDelete(bot, bot.transformers.snowflake(payload.id), shardId)
}
