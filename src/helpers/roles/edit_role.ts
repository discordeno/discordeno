import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { CreateGuildRole, Role } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import {
  calculateBits,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";

/** Edit a guild role. Requires the MANAGE_ROLES permission. */
export async function editRole(
  guildId: string,
  id: string,
  options: CreateGuildRole,
) {
  await requireBotGuildPermissions(guildId, ["MANAGE_ROLES"]);

  const result = await rest.runMethod<Role>(
    "patch",
    endpoints.GUILD_ROLE(guildId, id),
    {
      ...options,
      permissions: options.permissions
        ? calculateBits(options.permissions)
        : undefined,
    },
  );

  return await structures.createDiscordenoRole(result);
}
