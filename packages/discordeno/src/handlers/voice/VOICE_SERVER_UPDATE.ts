import { Bot } from '../../bot.js'
import { DiscordGatewayPayload, DiscordVoiceServerUpdate } from '../../types/discord.js'

export async function handleVoiceServerUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordVoiceServerUpdate

  bot.events.voiceServerUpdate(bot, {
    token: payload.token,
    guildId: bot.transformers.snowflake(payload.guild_id),
    endpoint: payload.endpoint ?? undefined
  })
}
