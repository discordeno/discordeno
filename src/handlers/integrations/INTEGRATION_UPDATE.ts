import { eventHandlers } from "../../bot.ts";

export function handleIntegrationUpdate(data: DiscordPayload) {
  const {
    enable_emoticons: enableEmoticons,
    expire_behavior: expireBehavior,
    expire_grace_period: expireGracePeriod,
    role_id: roleId,
    subscriber_count: subscriberCount,
    synced_at: syncedAt,
    guild_id: guildId,
    ...rest
  } = data.d as IntegrationCreateUpdateEvent;

  eventHandlers.integrationUpdate?.({
    ...rest,
    guildId,
    subscriberCount,
    enableEmoticons,
    expireGracePeriod,
    roleId,
    expireBehavior,
    syncedAt,
  });
}
