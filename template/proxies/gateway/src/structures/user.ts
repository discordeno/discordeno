import { DiscordUser } from "../../../../../types/discord.ts";

export function proxyUser(payload: DiscordUser) {
  return {
    id: payload.id,
    username: payload.username,
    discriminator: payload.discriminator,
    avatar: payload.avatar,
    locale: payload.locale,
    flags: payload.flags,
    banner: payload.banner,
    email: payload.email,
    bot: payload.bot ?? false,
    system: payload.system ?? false,
    verified: payload.verified ?? false,

    premiumType: payload.premium_type,
    publicFlags: payload.public_flags,
    accentColor: payload.accent_color,
    mfaEnabled: payload.mfa_enabled ?? false,
  };
}
