import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Leave a guild */
export async function leaveGuild(guildId: bigint) {
  return await rest.runMethod<undefined>("delete", endpoints.GUILD_LEAVE(guildId));
}
