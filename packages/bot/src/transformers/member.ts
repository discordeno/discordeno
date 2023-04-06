import type { DiscordMember } from '@discordeno/types'
import { iconHashToBigInt } from '@discordeno/utils'
import type { Bot } from '../bot.js'
import type { Optionalize } from '../optionalize.js'
import { MemberToggles } from './toggles/member.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformMember(bot: Bot, payload: DiscordMember, guildId: bigint, userId: bigint) {
  const member = {
    id: userId,
    guildId,
    user: payload.user ? bot.transformers.user(bot, payload.user) : undefined,
    nick: payload.nick ?? undefined,
    roles: payload.roles.map((id) => bot.transformers.snowflake(id)),
    joinedAt: Date.parse(payload.joined_at),
    premiumSince: payload.premium_since ? Date.parse(payload.premium_since) : undefined,
    avatar: payload.avatar ? iconHashToBigInt(payload.avatar) : undefined,
    permissions: payload.permissions ? bot.transformers.snowflake(payload.permissions) : undefined,
    communicationDisabledUntil: payload.communication_disabled_until ? Date.parse(payload.communication_disabled_until) : undefined,
    toggles: new MemberToggles(payload),
  }

  return member as Optionalize<typeof member>
}

export interface Member extends ReturnType<typeof transformMember> {}
