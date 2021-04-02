import { rest } from "../../rest/rest.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
export async function getBans(guildId: string) {
  await requireBotGuildPermissions(guildId, ["BAN_MEMBERS"]);

  const results =
    (await rest.runMethod(
      "get",
      endpoints.GUILD_BANS(guildId),
    )) as BannedUser[];

  return new Collection<string, BannedUser>(
    results.map((res) => [res.user.id, res]),
  );
}
