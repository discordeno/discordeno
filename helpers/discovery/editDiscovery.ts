import type { Bot } from "../../bot.ts";
import { DiscordDiscoveryMetadata } from "../../types/discord.ts";

/** Modify the discovery metadata for the guild. Requires the MANAGE_GUILD permission. Returns the updated discovery metadata object on success. */
export async function editDiscovery(bot: Bot, guildId: bigint, data: ModifyGuildDiscoveryMetadata) {
  const result = await bot.rest.runMethod<DiscordDiscoveryMetadata>(
    bot.rest,
    "PATCH",
    bot.constants.routes.DISCOVERY_METADATA(guildId),
    {
      primary_category_id: data.primaryCategoryId,
      keywords: data.keywords,
      emoji_discoverability_enabled: data.emojiDiscoverabilityEnabled,
    },
  );

  return bot.transformers.discoveryMetadata(bot, { ...result, guildId });
}

// TODO: add docs link
export interface ModifyGuildDiscoveryMetadata {
  /** The id of the primary discovery category. Default: 0 */
  primaryCategoryId?: number | null;
  /** Up to 10 discovery search keywords. Default: null */
  keywords?: string[] | null;
  /** Whether guild info is shown when custom emojis are clicked. Default: true */
  emojiDiscoverabilityEnabled?: boolean | null;
}
