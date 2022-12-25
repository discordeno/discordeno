import type { Camelize, DiscordVoiceRegion } from '@discordeno/types'

export function c1amelize1VoiceRegion (payload: DiscordVoiceRegion): Camelize<DiscordVoiceRegion> {
  return {
    id: payload.id,
    name: payload.name,
    custom: payload.custom,
    optimal: payload.optimal,
    deprecated: payload.deprecated
  }
}
