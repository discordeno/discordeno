import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns an array of voice regions that can be used when creating servers. */
export async function getAvailableVoiceRegions() {
  const result = await rest.runMethod("get", endpoints.VOICE_REGIONS);

  return result;
}
