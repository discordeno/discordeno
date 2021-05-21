import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { GuildIntegrationsUpdate } from "../../types/integrations/guild_integrations_update.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleGuildIntegrationsUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as GuildIntegrationsUpdate;

  const guild = await cacheHandlers.get("guilds", snowflakeToBigint(payload.guildId));
  if (!guild) return;

  eventHandlers.guildIntegrationsUpdate?.(guild);
}
