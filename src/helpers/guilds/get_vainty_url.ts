import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns the code and uses of the vanity url for this server if it is enabled. Requires the MANAGE_GUILD permission. */
export async function getVanityURL(guildID: string) {
  const result = await RequestManager.get(endpoints.GUILD_VANITY_URL(guildID));

  return result;
}
