import { rest } from "../../rest/rest.ts";
import { Role } from "../../types/permissions/role.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Returns a list of role objects for the guild.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your roles will be cached in your guild.**
 */
export async function getRoles(guildId: bigint) {
  await requireBotGuildPermissions(guildId, ["MANAGE_ROLES"]);

  const result = await rest.runMethod<Role[]>(
    "get",
    endpoints.GUILD_ROLES(guildId),
  );

  // TODO: addToCache

  return new Collection(
    result.map((role) => [role.id, role]),
  );
}
