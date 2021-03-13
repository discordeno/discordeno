import { eventHandlers } from "../../bot.ts";
import { DiscordPayload, GuildRoleDeletePayload } from "../../types/mod.ts";
import { cacheHandlers } from "../../cache.ts";

export async function handleGuildRoleDelete(data: DiscordPayload) {
  const payload = data.d as GuildRoleDeletePayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const cachedRole = guild.roles.get(payload.role_id)!;
  guild.roles.delete(payload.role_id);

  if (cachedRole) eventHandlers.roleDelete?.(guild, cachedRole);

  // For bots without GUILD_MEMBERS member.roles is never updated breaking permissions checking.
  cacheHandlers.forEach("members", (member) => {
    // Not in the relevant guild so just skip.
    if (!member.guilds.has(guild.id)) return;

    member.guilds.forEach((g) => {
      // Member does not have this role
      if (!g.roles.includes(payload.role_id)) return;
      // Remove this role from the members cache
      g.roles = g.roles.filter((id) => id !== payload.role_id);
      cacheHandlers.set("members", member.id, member);
    });
  });
}
