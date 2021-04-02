import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Delete a guild role. Requires the MANAGE_ROLES permission. */
export async function deleteRole(guildId: string, id: string) {
  await requireBotGuildPermissions(guildId, ["MANAGE_ROLES"]);

  const result = await rest.runMethod(
    "delete",
    endpoints.GUILD_ROLE(guildId, id),
  );

  return result;
}
