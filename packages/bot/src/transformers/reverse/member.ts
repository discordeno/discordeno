import type { DiscordMember, DiscordUser } from '@discordeno/types'
import { iconBigintToHash } from '@discordeno/utils'
import type { Bot } from '../../bot.js'
import type { Member } from '../member.js'
import type { User } from '../user.js'

export function transformUserToDiscordUser(bot: Bot, payload: User): DiscordUser {
  return {
    id: payload.id.toString(),
    username: payload.username,
    global_name: payload.globalName ?? null,
    discriminator: payload.discriminator,
    avatar: payload.avatar ? iconBigintToHash(payload.avatar) : null,
    locale: payload.locale,
    email: payload.email ?? undefined,
    flags: payload.flags?.toJSON(),
    premium_type: payload.premiumType,
    public_flags: payload.publicFlags?.toJSON(),
    bot: payload.toggles?.bot,
    system: payload.toggles?.system,
    mfa_enabled: payload.toggles?.mfaEnabled,
    verified: payload.toggles?.verified,
  }
}

export function transformMemberToDiscordMember(bot: Bot, payload: Member): DiscordMember {
  return {
    nick: payload.nick ?? undefined,
    roles: payload.roles.map((id) => id.toString()),
    joined_at: new Date(payload.joinedAt).toISOString(),
    premium_since: payload.premiumSince ? new Date(payload.premiumSince).toISOString() : undefined,
    avatar: payload.avatar ? iconBigintToHash(payload.avatar) : undefined,
    permissions: payload.permissions?.toString(),
    communication_disabled_until: payload.communicationDisabledUntil ? new Date(payload.communicationDisabledUntil).toISOString() : undefined,
    deaf: payload.toggles?.deaf,
    mute: payload.toggles?.mute,
    pending: payload.toggles?.pending,
    flags: payload.flags,
    user: payload.user ? bot.transformers.reverse.user(bot, payload.user) : undefined,
  }
}
