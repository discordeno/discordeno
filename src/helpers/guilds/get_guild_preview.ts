import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns the guild preview object for the given id. If the bot is not in the guild, then the guild must be Discoverable. */
export async function getGuildPreview(guildId: string) {
  const result = await rest.runMethod("get", endpoints.GUILD_PREVIEW(guildId));

  return result;
}
