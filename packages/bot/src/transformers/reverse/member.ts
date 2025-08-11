import type { DiscordMember, DiscordUser } from '@discordeno/types'
import { iconBigintToHash } from '@discordeno/utils'
import type { Bot } from '../../bot.js'
import type { Member, User } from '../types.js'

export function transformUserToDiscordUser(bot: Bot, payload: typeof bot.transformers.$inferredTypes.user): DiscordUser {
  const _payload = payload as Partial<User>

  return {
    id: _payload.id!.toString(),
    username: _payload.username!,
    global_name: _payload.globalName ?? null,
    discriminator: _payload.discriminator!,
    avatar: _payload.avatar ? iconBigintToHash(_payload.avatar) : null,
    locale: _payload.locale,
    email: _payload.email ?? undefined,
    flags: _payload.flags?.toJSON(),
    premium_type: _payload.premiumType,
    public_flags: _payload.publicFlags?.toJSON(),
    bot: _payload.toggles?.bot,
    system: _payload.toggles?.system,
    mfa_enabled: _payload.toggles?.mfaEnabled,
    verified: _payload.toggles?.verified,
  }
}

export function transformMemberToDiscordMember(bot: Bot, payload: typeof bot.transformers.$inferredTypes.member): DiscordMember {
  const _payload = payload as Partial<Member>

  return {
    nick: _payload.nick ?? undefined,
    roles: _payload.roles?.map((id) => id.toString()) ?? [],
    joined_at: _payload.joinedAt ? new Date(_payload.joinedAt).toISOString() : null,
    premium_since: _payload.premiumSince ? new Date(_payload.premiumSince).toISOString() : undefined,
    avatar: _payload.avatar ? iconBigintToHash(_payload.avatar) : undefined,
    permissions: _payload.permissions?.toString(),
    communication_disabled_until: _payload.communicationDisabledUntil ? new Date(_payload.communicationDisabledUntil).toISOString() : undefined,
    deaf: _payload.toggles?.deaf ?? false,
    mute: _payload.toggles?.mute ?? false,
    pending: _payload.toggles?.pending,
    flags: _payload.flags ?? 0,
    avatar_decoration_data: _payload.avatarDecorationData
      ? {
          asset: iconBigintToHash(_payload.avatarDecorationData.asset),
          sku_id: bot.transformers.reverse.snowflake(_payload.avatarDecorationData.skuId),
        }
      : undefined,
    user: _payload.user ? bot.transformers.reverse.user(bot, _payload.user) : undefined,
  }
}
