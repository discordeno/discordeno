import { DiscordMember, DiscordUser } from '@discordeno/types'
import type { Client } from '../../client.js'
import { Member, User } from '../member.js'

export function transformUserToDiscordUser (
  client: Client,
  payload: User
): DiscordUser {
  return {
    id: client.utils.bigintToSnowflake(payload.id),
    username: payload.username,
    discriminator: payload.discriminator,
    avatar: payload.avatar
      ? client.utils.iconBigintToHash(payload.avatar)
      : null,
    locale: payload.locale,
    email: payload.email ?? undefined,
    flags: payload.flags,
    premium_type: payload.premiumType,
    public_flags: payload.publicFlags,
    bot: payload.toggles.bot,
    system: payload.toggles.system,
    mfa_enabled: payload.toggles.mfaEnabled,
    verified: payload.toggles.verified
  }
}

export function transformMemberToDiscordMember (
  client: Client,
  payload: Member
): DiscordMember {
  return {
    nick: payload.nick ?? undefined,
    roles: payload.roles.map((id) => client.utils.bigintToSnowflake(id)),
    joined_at: new Date(payload.joinedAt).toISOString(),
    premium_since: payload.premiumSince
      ? new Date(payload.premiumSince).toISOString()
      : undefined,
    avatar: payload.avatar
      ? client.utils.iconBigintToHash(payload.avatar)
      : undefined,
    permissions: payload.permissions
      ? client.utils.bigintToSnowflake(payload.permissions)
      : undefined,
    communication_disabled_until: payload.communicationDisabledUntil
      ? new Date(payload.communicationDisabledUntil).toISOString()
      : undefined,
    deaf: payload.toggles.deaf,
    mute: payload.toggles.mute,
    pending: payload.toggles.pending
  }
}
