import { rest } from "../../rest/rest.ts";
import {
  DiscordDiscoveryMetadata,
  DiscoveryMetadata,
} from "../../types/discovery/discovery_metadata.ts";
import { ModifyGuildDiscoveryMetadata } from "../../types/discovery/modify_guild_discovery_metadata.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import {
  camelKeysToSnakeCase,
  snakeKeysToCamelCase,
} from "../../util/utils.ts";

/** Modify the discovery metadata for the guild. Requires the MANAGE_GUILD permission. Returns the updated discovery metadata object on success. */
export async function editDiscovery(
  guildId: string,
  data: ModifyGuildDiscoveryMetadata,
) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  const result = await rest.runMethod<DiscordDiscoveryMetadata>(
    "patch",
    endpoints.DISCOVERY_MODIFY(guildId),
    camelKeysToSnakeCase(data),
  );

  return snakeKeysToCamelCase<DiscoveryMetadata>(result);
}
