import { eventHandlers } from "../../bot.ts";
import {
  DiscordPayload,
  IntegrationCreateUpdateEvent,
} from "../../types/mod.ts";

export function handleIntegrationCreate(
  data: DiscordPayload,
) {
  const {
    guild_id: guildID,
    enable_emoticons: enableEmoticons,
    expire_behavior: expireBehavior,
    expire_grace_period: expireGracePeriod,
    subscriber_count: subscriberCount,
    role_id: roleID,
    synced_at: syncedAt,
    ...rest
  } = data.d as IntegrationCreateUpdateEvent;

  eventHandlers.integrationCreate?.({
    ...rest,
    guildID,
    enableEmoticons,
    expireBehavior,
    expireGracePeriod,
    syncedAt,
    subscriberCount,
    roleID,
  });
}
