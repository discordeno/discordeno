import type { Camelize, DiscordMember, DiscordUser } from '@discordeno/types'

export function s1nakelize1User (payload: Camelize<DiscordUser>): DiscordUser {
  return {
    id: payload.id,
    bot: payload.bot,
    email: payload.email,
    flags: payload.flags,
    avatar: payload.avatar,
    system: payload.system,
    banner: payload.banner,
    locale: payload.locale,
    username: payload.username,
    verified: payload.verified,
    discriminator: payload.discriminator,

    mfa_enabled: payload.mfaEnabled,
    accent_color: payload.accentColor,
    premium_type: payload.premiumType,
    public_flags: payload.publicFlags
  }
}

export function s1nakelize1Member (
  payload: Camelize<DiscordMember>
): DiscordMember {
  return {
    nick: payload.nick,
    deaf: payload.deaf,
    mute: payload.mute,
    roles: payload.roles,
    avatar: payload.avatar,
    pending: payload.pending,
    permissions: payload.permissions,

    joined_at: payload.joinedAt,
    premium_since: payload.premiumSince,
    communication_disabled_until: payload.communicationDisabledUntil,

    user: payload.user && s1nakelize1User(payload.user)
  }
}
