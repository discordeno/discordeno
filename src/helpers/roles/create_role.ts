import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";
import {
  calculateBits,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";

/** Create a new role for the guild. Requires the MANAGE_ROLES permission. */
export async function createRole(
  guildId: string,
  options: CreateRoleOptions,
  reason?: string,
) {
  await requireBotGuildPermissions(guildId, ["MANAGE_ROLES"]);

  const result = await rest.runMethod("post", endpoints.GUILD_ROLES(guildId), {
    ...options,
    permissions: calculateBits(options?.permissions || []),
    reason,
  });

  const roleData = result as RoleData;
  const role = await structures.createRoleStruct(roleData);
  const guild = await cacheHandlers.get("guilds", guildId);
  guild?.roles.set(role.id, role);

  return role;
}
