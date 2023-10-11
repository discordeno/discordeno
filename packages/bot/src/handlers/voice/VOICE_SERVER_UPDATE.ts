import type { DiscordGatewayPayload, DiscordVoiceServerUpdate } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleVoiceServerUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.voiceServerUpdate) return

  const payload = data.d as DiscordVoiceServerUpdate

  bot.events.voiceServerUpdate({
    token: payload.token,
    guildId: bot.transformers.snowflake(payload.guild_id),
    endpoint: payload.endpoint ?? undefined,
  })
}
