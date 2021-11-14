import type { DiscoveryMetadata } from "../../types/discovery/discoveryMetadata.ts";
import type { ModifyGuildDiscoveryMetadata } from "../../types/discovery/modifyGuildDiscoveryMetadata.ts";
import type { Bot } from "../../bot.ts";

/** Modify the discovery metadata for the guild. Requires the MANAGE_GUILD permission. Returns the updated discovery metadata object on success. */
export async function editDiscovery(bot: Bot, guildId: bigint, data: ModifyGuildDiscoveryMetadata) {
  return await bot.rest.runMethod<DiscoveryMetadata>(
    bot.rest,
    "patch",
    bot.constants.endpoints.DISCOVERY_METADATA(guildId),
    {
      primary_category_id: data.primaryCategoryId,
      keywords: data.keywords,
      emoji_discoverability_enabled: data.emojiDiscoverabilityEnabled,
    }
  );
}
