import { rest } from "../../rest/rest.ts";
import {
  DiscordVoiceRegion,
  VoiceRegion,
} from "../../types/voice/voice_region.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled. */
export async function getVoiceRegions(guildId: string) {
  const result = await rest.runMethod(
    "get",
    endpoints.GUILD_REGIONS(guildId),
  ) as DiscordVoiceRegion[];

  const convertedRegions = snakeKeysToCamelCase<VoiceRegion[]>(result);

  return new Collection<string, VoiceRegion>(
    convertedRegions.map((region) => [region.id, region]),
  );
}
