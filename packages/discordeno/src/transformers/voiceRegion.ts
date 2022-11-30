import { Bot } from '../bot.js'
import { DiscordVoiceRegion } from '../types/discord.js'
import { Optionalize } from '../types/shared.js'

// TODO: Rename `VoiceRegions` to `VoiceRegion`.

export function transformVoiceRegion(bot: Bot, payload: DiscordVoiceRegion) {
  const voiceRegion = {
    id: payload.id,
    name: payload.name,
    optimal: payload.optimal,
    deprecated: payload.deprecated,
    custom: payload.custom
  }

  return voiceRegion as Optionalize<typeof voiceRegion>
}

export interface VoiceRegions extends ReturnType<typeof transformVoiceRegion> { }
