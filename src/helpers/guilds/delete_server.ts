import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/** Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event.
 */
export async function deleteServer(guildID: string) {
  const result = await RequestManager.delete(endpoints.GUILDS_BASE(guildID));

  return result;
}
