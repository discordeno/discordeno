import { DiscordVoiceRegion, Optionalize } from '@discordeno/types'
import { Bot } from '../bot.js'

// TODO: Rename `VoiceRegions` to `VoiceRegion`.

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformVoiceRegion (bot: Bot, payload: DiscordVoiceRegion) {
  const voiceRegion = {
    id: payload.id,
    name: payload.name,
    optimal: payload.optimal,
    deprecated: payload.deprecated,
    custom: payload.custom
  }

  return voiceRegion as Optionalize<typeof voiceRegion>
}

export interface VoiceRegions extends ReturnType<typeof transformVoiceRegion> {}
