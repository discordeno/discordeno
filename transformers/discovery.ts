import { DiscordDiscoveryMetadata } from "../types/discord.ts";
import { Bot } from "../bot.ts";
import { Optionalize } from "../types/shared.ts";

export function transformDiscoveryMetadata(bot: Bot, payload: DiscordDiscoveryMetadata & { guildId: bigint }) {
  const discoveryMetadata = {
    guildId: payload.guildId,
    primaryCategoryId: payload.primary_category_id,
    keywords: payload.keywords ?? undefined,
    emojiDiscoverabilityEnabled: payload.emoji_discoverability_enabled,
    partnerActionedTimestamp: payload.partner_actioned_timestamp
      ? Date.parse(payload.partner_actioned_timestamp)
      : undefined,
    partnerApplicationTimestamp: payload.partner_application_timestamp
      ? Date.parse(payload.partner_application_timestamp)
      : undefined,
    categoryIds: payload.category_ids,
  };
  return discoveryMetadata as Optionalize<typeof discoveryMetadata>;
}

export interface DiscoveryMetadata extends ReturnType<typeof transformDiscoveryMetadata> {}
