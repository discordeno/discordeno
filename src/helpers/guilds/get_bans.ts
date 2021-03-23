import { RequestManager } from "../../rest/request_manager.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
export async function getBans(guildID: string) {
  await requireBotGuildPermissions(guildID, ["BAN_MEMBERS"]);

  const results = (await RequestManager.get(
    endpoints.GUILD_BANS(guildID),
  )) as BannedUser[];

  return new Collection<string, BannedUser>(
    results.map((res) => [res.user.id, res]),
  );
}
