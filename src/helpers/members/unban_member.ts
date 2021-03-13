import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Remove the ban for a user. Requires BAN_MEMBERS permission */
export async function unban(guildID: string, id: string) {
  await requireBotGuildPermissions(guildID, ["BAN_MEMBERS"]);

  const result = await RequestManager.delete(endpoints.GUILD_BAN(guildID, id));

  return result;
}

// aliases
export { unban as unbanMember };
