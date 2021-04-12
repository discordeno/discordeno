import { CreateGuildBan } from "../../types/guilds/create_guild_ban.ts";
import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Ban a user from the guild and optionally delete previous messages sent by the user. Requires the BAN_MEMBERS permission. */
export async function ban(guildId: string, id: string, options: CreateGuildBan) {
  await requireBotGuildPermissions(guildId, ["BAN_MEMBERS"]);

  const result = await rest.runMethod("put", endpoints.GUILD_BAN(guildId, id), {
    ...options,
    delete_message_days: options.days,
  });

  return result;
}

// aliases
export { ban as banMember };
