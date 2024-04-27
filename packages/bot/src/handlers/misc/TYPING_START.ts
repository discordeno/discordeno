import type { DiscordGatewayPayload, DiscordTypingStart } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleTypingStart(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.typingStart) return

  const payload = data.d as DiscordTypingStart

  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined
  const userId = bot.transformers.snowflake(payload.user_id)

  bot.events.typingStart({
    guildId,
    channelId: bot.transformers.snowflake(payload.channel_id),
    userId,
    timestamp: payload.timestamp,
    member: payload.member && guildId ? bot.transformers.member(bot, payload.member, guildId, userId) : undefined,
  })
}
