import { type BigString, type DiscordMember } from '@discordeno/types'
import { iconHashToBigInt } from '@discordeno/utils'
import type { Bot } from '../bot.js'
import { Permissions } from './toggles/Permissions.js'
import { MemberToggles } from './toggles/member.js'
import type { Member } from './types.js'

const baseMember = {
  get deaf() {
    return !!this.toggles?.has('deaf')
  },
  get mute() {
    return !!this.toggles?.has('mute')
  },
  get pending() {
    return !!this.toggles?.has('pending')
  },
  get flags() {
    return this.toggles?.flags ?? 0
  },
  get didRejoin() {
    return !!this.toggles?.didRejoin
  },
  get startedOnboarding() {
    return !!this.toggles?.startedOnboarding
  },
  get bypassesVerification() {
    return !!this.toggles?.bypassesVerification
  },
  get completedOnboarding() {
    return !!this.toggles?.completedOnboarding
  },
} as Member

export function transformMember(bot: Bot, payload: DiscordMember, guildId: BigString, userId: BigString): Member {
  const member: Member = Object.create(baseMember)
  const props = bot.transformers.desiredProperties.member

  if (props.id && userId) member.id = typeof userId === 'string' ? bot.transformers.snowflake(userId) : userId
  if (props.guildId && guildId) member.guildId = typeof guildId === 'string' ? bot.transformers.snowflake(guildId) : guildId
  if (props.user && payload.user) member.user = bot.transformers.user(bot, payload.user)
  if (props.nick && payload.nick) member.nick = payload.nick
  if (props.roles && payload.roles) member.roles = payload.roles.map((id) => bot.transformers.snowflake(id))
  if (props.joinedAt && payload.joined_at) member.joinedAt = Date.parse(payload.joined_at)
  if (props.premiumSince && payload.premium_since) member.premiumSince = Date.parse(payload.premium_since)
  if (props.communicationDisabledUntil && payload.communication_disabled_until)
    member.communicationDisabledUntil = Date.parse(payload.communication_disabled_until)
  if (props.avatar && payload.avatar) member.avatar = iconHashToBigInt(payload.avatar)
  if (props.permissions && payload.permissions) member.permissions = new Permissions(payload.permissions)
  if (props.toggles) member.toggles = new MemberToggles(payload)
  if (props.avatarDecorationData && payload.avatar_decoration_data)
    member.avatarDecorationData = bot.transformers.avatarDecorationData(bot, payload.avatar_decoration_data)

  return bot.transformers.customizers.member(bot, payload, member)
}
