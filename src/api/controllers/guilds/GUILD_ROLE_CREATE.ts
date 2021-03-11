import { eventHandlers } from "../../../bot.ts";
import {
  DiscordPayload,
  GuildRoleDeletePayload,
  GuildRolePayload,
} from "../../../types/mod.ts";
import { structures } from "../../structures/mod.ts";
import { cacheHandlers } from "../cache.ts";

export async function handleGuildRoleCreate(data: DiscordPayload) {
  const payload = data.d as GuildRolePayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const role = await structures.createRoleStruct(payload.role);
  guild.roles = guild.roles.set(payload.role.id, role);
  await cacheHandlers.set("guilds", payload.guild_id, guild);

  eventHandlers.roleCreate?.(guild, role);
}
