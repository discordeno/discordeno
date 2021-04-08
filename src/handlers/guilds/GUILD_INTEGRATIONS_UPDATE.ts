import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordGuildIntegrationsUpdate } from "../../types/integration/guild_integrations_update.ts";

export async function handleGuildIntegrationsUpdate(
  data: DiscordGatewayPayload,
) {
  const payload = data.d as DiscordGuildIntegrationsUpdate;

  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  eventHandlers.guildIntegrationsUpdate?.(guild);
}
