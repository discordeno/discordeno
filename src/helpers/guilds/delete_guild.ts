import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event. */
export async function deleteGuild(guildId: bigint) {
  return await rest.runMethod<undefined>("delete", endpoints.GUILDS_BASE(guildId));
}
