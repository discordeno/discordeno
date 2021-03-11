import { eventHandlers } from "../../../bot.ts";
import { DiscordPayload, GuildBanPayload } from "../../../types/mod.ts";
import { cacheHandlers } from "../cache.ts";

export async function handleGuildBanAdd(data: DiscordPayload) {
  const payload = data.d as GuildBanPayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const member = await cacheHandlers.get("members", payload.user.id);
  eventHandlers.guildBanAdd?.(guild, payload.user, member);
}
