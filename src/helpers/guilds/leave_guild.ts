import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/** Leave a guild */
export async function leaveGuild(guildId: string) {
  const result = await RequestManager.delete(endpoints.GUILD_LEAVE(guildId));

  return result;
}
