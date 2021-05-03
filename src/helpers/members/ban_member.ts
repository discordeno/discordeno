import { rest } from "../../rest/rest.ts";
import { CreateGuildBan } from "../../types/guilds/create_guild_ban.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import { camelKeysToSnakeCase } from "../../util/utils.ts";

/** Ban a user from the guild and optionally delete previous messages sent by the user. Requires the BAN_MEMBERS permission. */
export async function ban(
  guildId: bigint,
  id: bigint,
  options: CreateGuildBan,
) {
  await requireBotGuildPermissions(guildId, ["BAN_MEMBERS"]);

  return await rest.runMethod<undefined>(
    "put",
    endpoints.GUILD_BAN(guildId, id),
    camelKeysToSnakeCase(options),
  );
}

// aliases
export { ban as banMember };
