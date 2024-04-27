import type { DiscordVoiceRegion } from '@discordeno/types'
import type { Bot, VoiceRegion } from '../index.js'

export function transformVoiceRegion(bot: Bot, payload: DiscordVoiceRegion): VoiceRegion {
  const voiceRegion = {
    id: payload.id,
    name: payload.name,
    optimal: payload.optimal,
    deprecated: payload.deprecated,
    custom: payload.custom,
  } as VoiceRegion

  return bot.transformers.customizers.voiceRegion(bot, payload, voiceRegion)
}
