import type { VoiceRegion } from "../../types/voice/voiceRegion.ts";
import type { Bot } from "../../bot.ts";

/** Returns an array of voice regions that can be used when creating servers. */
export async function getAvailableVoiceRegions(bot: Bot) {
  return await bot.rest.runMethod<VoiceRegion>(bot.rest, "get", bot.constants.endpoints.VOICE_REGIONS);
}
