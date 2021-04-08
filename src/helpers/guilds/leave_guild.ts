import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Leave a guild */
export async function leaveGuild(guildId: string): Promise<undefined> {
  const result = await rest.runMethod("delete", endpoints.GUILD_LEAVE(guildId));

  return result;
}
