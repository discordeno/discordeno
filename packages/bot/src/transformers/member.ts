import { type BigString, type DiscordMember } from '@discordeno/types'
import { iconHashToBigInt } from '@discordeno/utils'
import type { Bot } from '../bot.js'
import type { AvatarDecorationData } from './avatarDecorationData.js'
import { Permissions } from './toggles/Permissions.js'
import { MemberToggles } from './toggles/member.js'
import type { User } from './user.js'

const baseMember: Partial<Member> & BaseMember = {
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
}

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
  if (props.deaf || props.mute || props.pending || props.flags) {
    member.toggles = new MemberToggles(payload)
  }
  if (props.avatarDecorationData && payload.avatar_decoration_data)
    member.avatarDecorationData = bot.transformers.avatarDecorationData(bot, payload.avatar_decoration_data)

  return bot.transformers.customizers.member(bot, payload, member)
}

export interface BaseMember {
  /** Whether the user is deafened in voice channels */
  deaf?: boolean
  /** Whether the user is muted in voice channels */
  mute?: boolean
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean
  /** Member has left and rejoined the guild */
  didRejoin?: boolean
  /** Member has completed onboarding */
  startedOnboarding?: boolean
  /** Member is exempt from guild verification requirements */
  bypassesVerification?: boolean
  /** Member has started onboarding */
  completedOnboarding?: boolean
  /** Guild member flags */
  flags: number
}

export interface Member extends BaseMember {
  /** The user id of the member. */
  id: bigint
  /** The compressed form of all the boolean values on this user. */
  toggles?: MemberToggles
  /** The guild id where this member is. */
  guildId: bigint
  /** The user this guild member represents */
  user?: User
  /** This users guild nickname */
  nick?: string
  /** The members custom avatar for this server. */
  avatar?: bigint
  /** Array of role object ids */
  roles: bigint[]
  /** When the user joined the guild */
  joinedAt: number
  /** When the user started boosting the guild */
  premiumSince?: number
  /** The permissions this member has in the guild. Only present on interaction events. */
  permissions?: Permissions
  /** when the user's timeout will expire and the user will be able to communicate in the guild again (set null to remove timeout), null or a time in the past if the user is not timed out */
  communicationDisabledUntil?: number
  /** data for the member's guild avatar decoration */
  avatarDecorationData: AvatarDecorationData
}
