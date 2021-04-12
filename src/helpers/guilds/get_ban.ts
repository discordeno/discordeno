import { rest } from "../../rest/rest.ts";
import { Ban } from "../../types/guilds/ban.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the BAN_MEMBERS permission. */
export async function getBan(guildId: string, memberId: string) {
  await requireBotGuildPermissions(guildId, ["BAN_MEMBERS"]);

  const result = await rest.runMethod(
    "get",
    endpoints.GUILD_BAN(guildId, memberId),
  );

  return snakeKeysToCamelCase<Ban>(result);
}
