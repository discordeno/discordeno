import { Bot } from "../bot.ts";
import { DiscordVoiceRegion } from "../types/discord.ts";

export function transformVoiceRegion(bot: Bot, payload: DiscordVoiceRegion) {
  return {
    id: payload.id,
    name: payload.name,
    optimal: payload.optimal,
    deprecated: payload.deprecated,
    custom: payload.custom,
  };
}

export interface VoiceRegions extends ReturnType<typeof transformVoiceRegion> {}
