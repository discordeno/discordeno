import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Ban a user from the guild and optionally delete previous messages sent by the user. Requires the BAN_MEMBERS permission. */
export async function ban(guildId: string, id: string, options: BanOptions) {
  await requireBotGuildPermissions(guildId, ["BAN_MEMBERS"]);

  const result = await RequestManager.put(endpoints.GUILD_BAN(guildId, id), {
    ...options,
    delete_message_days: options.days,
  });

  return result;
}

// aliases
export { ban as banMember };
