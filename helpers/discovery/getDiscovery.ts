import type { Bot } from "../../bot.ts";
import { DiscordDiscoveryMetadata } from "../../types/discord.ts";

export type DiscoveryMetadata = {
  guildId: bigint;
  primaryCategoryId: number;
  keywords?: string[];
  emojiDiscoverabilityEnabled: boolean;
  partnerActionedTimestamp?: number;
  partnerApplicationTimestamp?: number;
  categoryIds: number[];
};

/**
 * Gets the discovery settings of a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the discovery settings of.
 *
 * @privateRemarks
 * This endpoint is not formally documented.
 */
export async function getDiscovery(bot: Bot, guildId: bigint): Promise<DiscoveryMetadata> {
  const result = await bot.rest.runMethod<DiscordDiscoveryMetadata>(
    bot.rest,
    "GET",
    bot.constants.routes.DISCOVERY_METADATA(guildId),
  );

  return {
    guildId,
    primaryCategoryId: result.primary_category_id,
    keywords: result.keywords ?? undefined,
    emojiDiscoverabilityEnabled: result.emoji_discoverability_enabled,
    partnerActionedTimestamp: result.partner_actioned_timestamp
      ? Date.parse(result.partner_actioned_timestamp)
      : undefined,
    partnerApplicationTimestamp: result.partner_application_timestamp
      ? Date.parse(result.partner_application_timestamp)
      : undefined,
    categoryIds: result.category_ids,
  };
}
