import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import {
  calculateBits,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";

/** Edit a guild role. Requires the MANAGE_ROLES permission. */
export async function editRole(
  guildId: string,
  id: string,
  options: CreateRoleOptions,
) {
  await requireBotGuildPermissions(guildId, ["MANAGE_ROLES"]);

  const result = await rest.runMethod(
    "patch",
    endpoints.GUILD_ROLE(guildId, id),
    {
      ...options,
      permissions: options.permissions
        ? calculateBits(options.permissions)
        : undefined,
    },
  );

  return result;
}
