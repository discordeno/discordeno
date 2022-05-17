import { DiscordEmoji } from "../../../../../types/discord.ts";
import { proxyUser } from "./user.ts";

export function proxyEmoji(payload: DiscordEmoji) {
  return {
    id: payload.id,
    name: payload.name,
    roles: payload.roles,
    managed: payload.managed ?? false,
    animated: payload.animated ?? false,
    available: payload.available ?? false,

    user: payload.user ? proxyUser(payload.user) : undefined,
    
    requireColons: payload.require_colons,

  };
}
