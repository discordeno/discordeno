import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event.
 */
export async function deleteServer(guildId: string) {
  const result = await rest.runMethod("delete", endpoints.GUILDS_BASE(guildId));

  return result;
}
