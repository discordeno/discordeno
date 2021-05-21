import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Delete a guild role. Requires the MANAGE_ROLES permission. */
export async function deleteRole(guildId: bigint, id: bigint) {
  await requireBotGuildPermissions(guildId, ["MANAGE_ROLES"]);

  return await rest.runMethod<undefined>("delete", endpoints.GUILD_ROLE(guildId, id));
}
