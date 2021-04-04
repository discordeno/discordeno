import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export async function handleGuildBanRemove(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildBanAddRemove;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const member = await cacheHandlers.get("members", payload.user.id);
  eventHandlers.guildBanRemove?.(guild, payload.user, member);
}
