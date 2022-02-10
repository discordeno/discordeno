import type { VoiceRegion } from "../../types/voice/voiceRegion.ts";
import type { Bot } from "../../bot.ts";
import { Collection } from "../../util/collection.ts";

/** Returns an array of voice regions that can be used when creating servers. */
export async function getAvailableVoiceRegions(bot: Bot) {
  const result = await bot.rest.runMethod<VoiceRegion[]>(bot.rest, "get", bot.constants.endpoints.VOICE_REGIONS);

  return new Collection(
    result.map((region) => {
      const voiceRegion = bot.transformers.voiceRegion(bot, region);
      return [voiceRegion.id, voiceRegion];
    }),
  );
}
