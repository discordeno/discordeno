import type { DiscordGatewayPayload, DiscordVoiceState } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleVoiceStateUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.voiceStateUpdate) return

  const payload = data.d as DiscordVoiceState

  bot.events.voiceStateUpdate(bot.transformers.voiceState(bot, payload, { guildId: payload.guild_id }))
}
