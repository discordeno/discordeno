import type { DiscordGatewayPayload, DiscordVoiceChannelEffectSend } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleVoiceChannelEffectSend(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.voiceChannelEffectSend) return

  const payload = data.d as DiscordVoiceChannelEffectSend

  bot.events.voiceChannelEffectSend({
    guildId: bot.transformers.snowflake(payload.guild_id),
    channelId: bot.transformers.snowflake(payload.channel_id),
    userId: bot.transformers.snowflake(payload.user_id),
    animationType: payload.animation_type ?? undefined,
    animationId: payload.animation_id ?? undefined,
    emoji: payload.emoji ? bot.transformers.emoji(bot, payload.emoji) : undefined,
    soundId: typeof payload.sound_id === 'string' ? bot.transformers.snowflake(payload.sound_id) : payload.sound_id,
    soundVolume: payload.sound_volume,
  })
}
