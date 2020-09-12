import { eventHandlers } from "../module/client.ts";
import { DiscordPayload } from "../types/discord.ts";
import { GuildBanPayload } from "../types/guild.ts";
import { cache } from "../utils/cache.ts";

export function handleInternalGuildBanAdd(data: DiscordPayload) {
  if (data.t !== "GUILD_BAN_ADD") return;

  const payload = data.d as GuildBanPayload;
  const guild = cache.guilds.get(payload.guild_id);
  if (!guild) return;

  const member = guild.members.get(payload.user.id);
  eventHandlers.guildBanAdd?.(guild, member || payload.user);
}

export function handleInternalGuildBanRemove(data: DiscordPayload) {
  if (data.t !== "GUILD_BAN_ADD") return;

  const payload = data.d as GuildBanPayload;
  const guild = cache.guilds.get(payload.guild_id);
  if (!guild) return;

  const member = guild.members.get(payload.user.id);
  eventHandlers.guildBanRemove?.(guild, member || payload.user);
}
