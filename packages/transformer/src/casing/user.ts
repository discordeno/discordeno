import type { Camelize, DiscordUser } from '@discordeno/types'

export function c1amelize1User (payload: DiscordUser): Camelize<DiscordUser> {
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

    mfaEnabled: payload.mfa_enabled,
    accentColor: payload.accent_color,
    premiumType: payload.premium_type,
    publicFlags: payload.public_flags
  }
}

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
