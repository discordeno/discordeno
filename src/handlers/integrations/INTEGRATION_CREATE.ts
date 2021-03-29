import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway.ts";

export function handleIntegrationCreate(
  data: DiscordGatewayPayload,
) {
  const {
    guild_id: guildId,
    enable_emoticons: enableEmoticons,
    expire_behavior: expireBehavior,
    expire_grace_period: expireGracePeriod,
    subscriber_count: subscriberCount,
    role_id: roleId,
    synced_at: syncedAt,
    ...rest
  } = data.d as IntegrationCreateUpdateEvent;

  eventHandlers.integrationCreate?.({
    ...rest,
    guildId,
    enableEmoticons,
    expireBehavior,
    expireGracePeriod,
    syncedAt,
    subscriberCount,
    roleId,
  });
}
