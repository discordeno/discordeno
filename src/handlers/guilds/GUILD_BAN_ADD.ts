import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordGuildBanAddRemove } from "../../types/guilds/guild_ban_add_remove.ts";

export async function handleGuildBanAdd(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildBanAddRemove;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const member = await cacheHandlers.get("members", payload.user.id);
  eventHandlers.guildBanAdd?.(guild, payload.user, member);
}
