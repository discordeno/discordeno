import { eventHandlers } from "../../../bot.ts";
import {
  DiscordPayload,
  IntegrationCreateUpdateEvent,
} from "../../../types/mod.ts";

export function handleIntegrationUpdate(data: DiscordPayload) {
  const {
    enable_emoticons: enableEmoticons,
    expire_behavior: expireBehavior,
    expire_grace_period: expireGracePeriod,
    role_id: roleID,
    subscriber_count: subscriberCount,
    synced_at: syncedAt,
    guild_id: guildID,
    ...rest
  } = data.d as IntegrationCreateUpdateEvent;

  eventHandlers.integrationUpdate?.({
    ...rest,
    guildID,
    subscriberCount,
    enableEmoticons,
    expireGracePeriod,
    roleID,
    expireBehavior,
    syncedAt,
  });
}
