import type { DiscordMember } from '@discordeno/types'
import { iconHashToBigInt } from '@discordeno/utils'
import type { Bot } from '../bot.js'
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
}

export function transformMember(bot: Bot, payload: DiscordMember, guildId: bigint, userId: bigint): Member {
  const member: Member = Object.create(baseMember)
  const props = bot.transformers.desiredProperties.member

  if (userId && props.id) member.id = userId
  if (guildId && props.guildId) member.guildId = guildId
  if (payload.user && props.user) member.user = bot.transformers.user(bot, payload.user)
  if (payload.nick && props.nick) member.nick = payload.nick
  if (payload.roles && props.roles) member.roles = payload.roles.map((id) => bot.transformers.snowflake(id))
  if (payload.joined_at && props.joinedAt) member.joinedAt = Date.parse(payload.joined_at)
  if (payload.premium_since && props.premiumSince) member.premiumSince = Date.parse(payload.premium_since)
  if (payload.communication_disabled_until && props.communicationDisabledUntil)
    member.communicationDisabledUntil = Date.parse(payload.communication_disabled_until)
  if (payload.avatar && props.avatar) member.avatar = iconHashToBigInt(payload.avatar)
  if (payload.permissions && props.permissions) member.permissions = new Permissions(payload.permissions)
  if (props.deaf || props.mute || props.pending) {
    member.toggles = new MemberToggles(payload)
  }

  return member
}

export interface BaseMember {
  /** Whether the user is deafened in voice channels */
  deaf?: boolean
  /** Whether the user is muted in voice channels */
  mute?: boolean
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean
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
}
