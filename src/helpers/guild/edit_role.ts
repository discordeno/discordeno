import { RequestManager } from "../../rest/request_manager.ts";
import { CreateRoleOptions } from "../../types/lib/structures/role/create.ts";
import { endpoints } from "../../util/constants.ts";
import {
  calculateBits,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";

/** Edit a guild role. Requires the MANAGE_ROLES permission. */
export async function editRole(
  guildID: string,
  id: string,
  options: CreateRoleOptions,
) {
  await requireBotGuildPermissions(guildID, ["MANAGE_ROLES"]);

  const result = await RequestManager.patch(endpoints.GUILD_ROLE(guildID, id), {
    ...options,
    permissions: options.permissions
      ? calculateBits(options.permissions)
      : undefined,
  });

  return result;
}
