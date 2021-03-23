import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";
import {
  calculateBits,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";

/** Create a new role for the guild. Requires the MANAGE_ROLES permission. */
export async function createRole(
  guildID: string,
  options: CreateRoleOptions,
  reason?: string,
) {
  await requireBotGuildPermissions(guildID, ["MANAGE_ROLES"]);

  const result = await RequestManager.post(endpoints.GUILD_ROLES(guildID), {
    ...options,
    permissions: calculateBits(options?.permissions || []),
    reason,
  });

  const roleData = result as RoleData;
  const role = await structures.createRoleStruct(roleData);
  const guild = await cacheHandlers.get("guilds", guildID);
  guild?.roles.set(role.id, role);

  return role;
}
