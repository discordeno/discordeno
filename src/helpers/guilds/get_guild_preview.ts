import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns the guild preview object for the given id. If the bot is not in the guild, then the guild must be Discoverable. */
export async function getGuildPreview(guildID: string) {
  const result = await RequestManager.get(endpoints.GUILD_PREVIEW(guildID));

  return result;
}
