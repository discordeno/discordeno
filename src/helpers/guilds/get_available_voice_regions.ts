import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns an array of voice regions that can be used when creating servers. */
export async function getAvailableVoiceRegions() {
  const result = await RequestManager.get(endpoints.VOICE_REGIONS);

  return result;
}
