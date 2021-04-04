import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled. */
export async function getVoiceRegions(guildId: string) {
  const result = await rest.runMethod("get", endpoints.GUILD_REGIONS(guildId));

  return result;
}
