import { DiscordMember, DiscordUser } from '@discordeno/types'
import { bigintToSnowflake, iconBigintToHash } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import { Member, User } from '../member.js'

export function transformUserToDiscordUser (
  rest: RestManager,
  payload: User
): DiscordUser {
  return {
    id: bigintToSnowflake(payload.id),
    username: payload.username,
    discriminator: payload.discriminator,
    avatar: payload.avatar ? iconBigintToHash(payload.avatar) : null,
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
  rest: RestManager,
  payload: Member
): DiscordMember {
  return {
    nick: payload.nick ?? undefined,
    roles: payload.roles.map((id) => bigintToSnowflake(id)),
    joined_at: new Date(payload.joinedAt).toISOString(),
    premium_since: payload.premiumSince
      ? new Date(payload.premiumSince).toISOString()
      : undefined,
    avatar: payload.avatar ? iconBigintToHash(payload.avatar) : undefined,
    permissions: payload.permissions
      ? bigintToSnowflake(payload.permissions)
      : undefined,
    communication_disabled_until: payload.communicationDisabledUntil
      ? new Date(payload.communicationDisabledUntil).toISOString()
      : undefined,
    deaf: payload.toggles.deaf,
    mute: payload.toggles.mute,
    pending: payload.toggles.pending
  }
}
