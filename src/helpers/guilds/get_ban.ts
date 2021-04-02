import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the BAN_MEMBERS permission. */
export async function getBan(guildId: string, memberId: string) {
  await requireBotGuildPermissions(guildId, ["BAN_MEMBERS"]);

  const result = await rest.runMethod(
    "get",
    endpoints.GUILD_BAN(guildId, memberId),
  );

  return result as BannedUser;
}
