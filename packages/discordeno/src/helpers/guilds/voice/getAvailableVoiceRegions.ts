import type { Bot } from "../../../bot.ts";
import { VoiceRegions } from "../../../transformers/voiceRegion.ts";
import { DiscordVoiceRegion } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";

/**
 * Gets the list of available voice regions.
 *
 * @param bot - The bot instance to use to make the request.
 * @returns A collection of {@link VoiceRegions | VoiceRegion} objects assorted by voice region ID.
 */
export async function getAvailableVoiceRegions(bot: Bot): Promise<Collection<string, VoiceRegions>> {
  const results = await bot.rest.runMethod<DiscordVoiceRegion[]>(
    bot.rest,
    "GET",
    bot.constants.routes.VOICE_REGIONS(),
  );

  return new Collection(
    results.map((result) => {
      const region = bot.transformers.voiceRegion(bot, result);
      return [region.id, region];
    }),
  );
}
