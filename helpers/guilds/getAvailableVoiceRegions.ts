import type { Bot } from "../../bot.ts";
import { VoiceRegions } from "../../transformers/voiceRegion.ts";
import { DiscordVoiceRegion } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

/** Returns an array of voice regions that can be used when creating servers. */
export async function getAvailableVoiceRegions(bot: Bot): Promise<Collection<string, VoiceRegions>> {
  const result = await bot.rest.runMethod<DiscordVoiceRegion[]>(
    bot.rest,
    "GET",
    bot.constants.routes.VOICE_REGIONS(),
  );

  return new Collection(
    result.map((region) => {
      const voiceRegion = bot.transformers.voiceRegion(bot, region);
      return [voiceRegion.id, voiceRegion];
    }),
  );
}
