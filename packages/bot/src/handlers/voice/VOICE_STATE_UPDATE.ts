import { DiscordGatewayPayload, DiscordVoiceState } from '@discordeno/types'
import { Bot } from '../../bot.js'

export async function handleVoiceStateUpdate (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordVoiceState
  if (!payload.guild_id) return

  const guildId = bot.transformers.snowflake(payload.guild_id)

  bot.events.voiceStateUpdate(
    bot,
    bot.transformers.voiceState(bot, { voiceState: payload, guildId })
  )
}
