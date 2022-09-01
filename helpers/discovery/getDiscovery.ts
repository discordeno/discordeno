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

/** Returns the discovery metadata object for the guild. Requires the `MANAGE_GUILD` permission. */
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
