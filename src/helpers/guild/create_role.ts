import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { Errors } from "../../types/errors.ts";
import { endpoints } from "../../util/constants.ts";
import { botHasPermission,calculateBits } from "../../util/permissions.ts";
import { DiscordRole } from "../../types/discord/role/role.ts";
import { CreateRoleOptions } from "../../types/lib/structures/role/create.ts";

/** Create a new role for the guild. Requires the MANAGE_ROLES permission. */
export async function createRole(
  guildID: string,
  options: CreateRoleOptions,
  reason?: string,
) {
  const hasPerm = await botHasPermission(guildID, ["MANAGE_ROLES"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }

  const result = await RequestManager.post(
    endpoints.GUILD_ROLES(guildID),
    {
      ...options,
      permissions: calculateBits(options?.permissions || []),
      reason,
    },
  );

  const roleData = result as DiscordRole;
  const role = await structures.createRoleStruct(roleData);
  const guild = await cacheHandlers.get("guilds", guildID);
  guild?.roles.set(role.id, role);

  return role;
}
