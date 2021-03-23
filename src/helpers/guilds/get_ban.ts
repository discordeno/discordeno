import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the BAN_MEMBERS permission. */
export async function getBan(guildID: string, memberID: string) {
  await requireBotGuildPermissions(guildID, ["BAN_MEMBERS"]);

  const result = await RequestManager.get(
    endpoints.GUILD_BAN(guildID, memberID),
  );

  return result as BannedUser;
}
