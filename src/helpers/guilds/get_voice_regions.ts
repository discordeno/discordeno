import type { VoiceRegion } from "../../types/voice/voice_region.ts";
import { Collection } from "../../util/collection.ts";
import type { Bot } from "../../bot.ts";

/** Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled. */
export async function getVoiceRegions(boot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<VoiceRegion[]>(bot.rest,"get", bot.constants.endpoints.GUILD_REGIONS(guildId));

  return new Collection<string, VoiceRegion>(result.map((region) => [region.id, region]));
}
