import { Bot } from "../bot.ts";
import { DiscordVoiceRegion, Optionalize } from "../deps.ts";

export function transformVoiceRegion(bot: Bot, payload: DiscordVoiceRegion) {
  const voiceRegion = {
    id: payload.id,
    name: payload.name,
    optimal: payload.optimal,
    deprecated: payload.deprecated,
    custom: payload.custom,
  };

  return voiceRegion as Optionalize<typeof voiceRegion>;
}

export interface VoiceRegions extends ReturnType<typeof transformVoiceRegion> {}
