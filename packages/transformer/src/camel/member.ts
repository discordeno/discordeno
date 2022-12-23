import type { Camelize, DiscordMember, DiscordUser } from '@discordeno/types'

export function c1amelize1User (payload: DiscordUser): Camelize<DiscordUser> {
  return {
    id: payload.id,
    username: payload.username,
    discriminator: payload.discriminator,
    avatar: payload.avatar,
    bot: payload.bot,
    system: payload.system,
    mfaEnabled: payload.mfa_enabled,
    banner: payload.banner,
    accentColor: payload.accent_color,
    locale: payload.locale,
    verified: payload.verified,
    email: payload.email,
    flags: payload.flags,
    premiumType: payload.premium_type,
    publicFlags: payload.public_flags
  }
}

export function c1amelize1Member (
  payload: DiscordMember
): Camelize<DiscordMember> {
  return {
    user: payload.user && c1amelize1User(payload.user),
    nick: payload.nick ?? undefined,
    avatar: payload.avatar,
    roles: payload.roles,
    joinedAt: payload.joined_at,
    premiumSince: payload.premium_since,
    deaf: payload.deaf,
    mute: payload.mute,
    pending: payload.pending,
    permissions: payload.permissions,
    communicationDisabledUntil: payload.communication_disabled_until
  }
}
