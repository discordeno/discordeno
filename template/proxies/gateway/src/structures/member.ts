import { DiscordMember } from "../../../../../types/discord.ts";
import { proxyUser } from "./user.ts";

export function proxyMember(payload: DiscordMember) {
  return {
    nick: payload.nick,
    avatar: payload.avatar,
    roles: payload.roles,
    permissions: payload.permissions,
    mute: payload.mute ?? false,
    deaf: payload.deaf ?? false,
    pending: payload.pending ?? false,

    joinedAt: payload.joined_at,
    premiumSince: payload.premium_since,
    communicationDisabledUntil: payload.communication_disabled_until,

    user: payload.user ? proxyUser(payload.user) : undefined,
  };
}
