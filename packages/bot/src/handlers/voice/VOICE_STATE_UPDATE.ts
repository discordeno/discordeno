import type { DiscordGatewayPayload, DiscordVoiceState } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleVoiceStateUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.voiceStateUpdate) return

  const payload = data.d as DiscordVoiceState
  // TODO: We have to wait for #4372 to get merged to remove this check...
  if (!payload.guild_id) return

  const guildId = bot.transformers.snowflake(payload.guild_id)

  bot.events.voiceStateUpdate(bot.transformers.voiceState(bot, payload, { guildId }))
}
