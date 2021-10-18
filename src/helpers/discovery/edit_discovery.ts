import type { DiscoveryMetadata } from "../../types/discovery/discovery_metadata.ts";
import type { ModifyGuildDiscoveryMetadata } from "../../types/discovery/modify_guild_discovery_metadata.ts";
import {SnakeCasedPropertiesDeep} from "../../types/util.ts";
import {Bot} from "../../bot.ts";

/** Modify the discovery metadata for the guild. Requires the MANAGE_GUILD permission. Returns the updated discovery metadata object on success. */
export async function editDiscovery(bot: Bot, guildId: bigint, data: ModifyGuildDiscoveryMetadata) {
  await bot.utils.requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  return await bot.rest.runMethod<SnakeCasedPropertiesDeep<DiscoveryMetadata>>(bot.rest,"patch", bot.constants.endpoints.DISCOVERY_METADATA(guildId), {
    primary_category_id: data.primaryCategoryId,
    keywords: data.keywords,
    emoji_discoverability_enabled: data.emojiDiscoverabilityEnabled,
  });
}
