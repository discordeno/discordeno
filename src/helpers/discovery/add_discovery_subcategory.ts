import { rest } from "../../rest/rest.ts";
import {
  AddGuildDiscoverySubcategory,
  DiscordAddGuildDiscoverySubcategory,
} from "../../types/discovery/add_guild_discovery_subcategory.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Add a discovery subcategory to the guild. Requires the `MANAGE_GUILD` permission. */
export async function addDiscoverySubcategory(
  guildId: string,
  categoryId: number,
) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  const result = await rest.runMethod<DiscordAddGuildDiscoverySubcategory>(
    "post",
    endpoints.DISCOVERY_SUBCATEGORY(guildId, categoryId),
  );

  return snakeKeysToCamelCase<AddGuildDiscoverySubcategory>(result);
}
