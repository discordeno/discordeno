import type { Bot } from "../../bot.ts";
import { DiscordMember, DiscordUser } from "../../types/discord.ts";
import { Member, User } from "../member.ts";

export function transformUserToDiscordUser(bot: Bot, payload: User): DiscordUser {
  return {
    id: bot.utils.bigintToSnowflake(payload.id),
    username: payload.username,
    discriminator: payload.discriminator,
    avatar: payload.avatar ? bot.utils.iconBigintToHash(payload.avatar) : null,
    locale: payload.locale,
    email: payload.email ?? undefined,
    flags: payload.flags,
    premium_type: payload.premiumType,
    public_flags: payload.publicFlags,
    bot: payload.toggles.bot,
    system: payload.toggles.system,
    mfa_enabled: payload.toggles.mfaEnabled,
    verified: payload.toggles.verified,
  };
}

export function transformMemberToDiscordMember(bot: Bot, payload: Member): DiscordMember {
  return {
    nick: payload.nick ?? undefined,
    roles: payload.roles.map((id) => bot.utils.bigintToSnowflake(id)),
    joined_at: new Date(payload.joinedAt).toISOString(),
    premium_since: payload.premiumSince ? new Date(payload.premiumSince).toISOString() : undefined,
    avatar: payload.avatar ? bot.utils.iconBigintToHash(payload.avatar) : undefined,
    permissions: payload.permissions ? bot.utils.bigintToSnowflake(payload.permissions) : undefined,
    communication_disabled_until: payload.communicationDisabledUntil
      ? new Date(payload.communicationDisabledUntil).toISOString()
      : undefined,
    deaf: payload.toggles.deaf,
    mute: payload.toggles.mute,
    pending: payload.toggles.pending,
  };
}
