import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { GuildBanAddRemove } from "../../types/guilds/guild_ban_add_remove.ts";

export async function handleGuildBanRemove(data: DiscordGatewayPayload) {
  const payload = data.d as GuildBanAddRemove;
  const guild = await cacheHandlers.get("guilds", payload.guildId);
  if (!guild) return;

  const member = await cacheHandlers.get("members", payload.user.id);
  eventHandlers.guildBanRemove?.(guild, payload.user, member);
}
