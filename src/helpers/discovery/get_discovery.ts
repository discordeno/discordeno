import { rest } from "../../rest/rest.ts";
import type { DiscoveryMetadata } from "../../types/discovery/discovery_metadata.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns the discovery metadata object for the guild. Requires the `MANAGE_GUILD` permission. */
export async function getDiscovery(guildId: bigint) {
<<<<<<< HEAD
	return await rest.runMethod<DiscoveryMetadata>("get", endpoints.DISCOVERY_METADATA(guildId));
=======
  return rest.runMethod<DiscoveryMetadata>(endpoints.DISCOVERY_METADATA(guildId));
>>>>>>> c0209c8bb02657a57d087530c97e981704a4b4e3
}
