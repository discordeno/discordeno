import { eventHandlers } from "../../bot.ts";
import { DiscordPayload, GuildBanPayload } from "../../types/mod.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInternalGuildBanAdd(data: DiscordPayload) {
  if (data.t !== "GUILD_BAN_ADD") return;

  const payload = data.d as GuildBanPayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const member = await cacheHandlers.get("members", payload.user.id);
  eventHandlers.guildBanAdd?.(guild, payload.user, member);
}

export async function handleInternalGuildBanRemove(data: DiscordPayload) {
  if (data.t !== "GUILD_BAN_REMOVE") return;

  const payload = data.d as GuildBanPayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const member = await cacheHandlers.get("members", payload.user.id);
  eventHandlers.guildBanRemove?.(guild, payload.user, member);
}
