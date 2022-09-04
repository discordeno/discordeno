import type { Bot } from "../../bot.ts";
import { DiscordDiscoveryMetadata } from "../../types/discord.ts";
import { DiscoveryMetadata } from "./getDiscovery.ts";

/**
 * Edits the discovery settings of a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to edit the discovery settings of.
 * @param options - The parameters for the edit of the discovery settings.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * @privateRemarks
 * This endpoint is not formally documented.
 */
export async function editDiscovery(
  bot: Bot,
  guildId: bigint,
  options: ModifyGuildDiscoveryMetadata,
): Promise<DiscoveryMetadata> {
  const result = await bot.rest.runMethod<DiscordDiscoveryMetadata>(
    bot.rest,
    "PATCH",
    bot.constants.routes.DISCOVERY_METADATA(guildId),
    {
      primary_category_id: options.primaryCategoryId,
      keywords: options.keywords,
      emoji_discoverability_enabled: options.emojiDiscoverabilityEnabled,
    },
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

// TODO: add docs link
export interface ModifyGuildDiscoveryMetadata {
  /** The id of the primary discovery category. Default: 0 */
  primaryCategoryId?: number | null;
  /** Up to 10 discovery search keywords. Default: null */
  keywords?: string[] | null;
  /** Whether guild info is shown when custom emojis are clicked. Default: true */
  emojiDiscoverabilityEnabled?: boolean | null;
}
