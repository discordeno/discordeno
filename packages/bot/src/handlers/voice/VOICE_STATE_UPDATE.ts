import type { DiscordGatewayPayload, DiscordVoiceState } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleVoiceStateUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.voiceStateUpdate) return

  const payload = data.d as DiscordVoiceState
  if (!payload.guild_id) return

  const guildId = bot.transformers.snowflake(payload.guild_id)

  bot.events.voiceStateUpdate(bot.transformers.voiceState(bot, { voiceState: payload, guildId }))
}
