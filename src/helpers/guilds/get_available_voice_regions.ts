import { rest } from "../../rest/rest.ts";
import type { VoiceRegion } from "../../types/voice/voice_region.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns an array of voice regions that can be used when creating servers. */
export async function getAvailableVoiceRegions() {
  return await rest.runMethod<VoiceRegion>("get", endpoints.VOICE_REGIONS);
}
