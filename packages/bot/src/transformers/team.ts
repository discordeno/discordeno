import type { DiscordTeam, TeamMembershipStates } from '@discordeno/types'
import { iconHashToBigInt, type Bot, type User } from '../index.js'

export function transformTeam(bot: Bot, payload: DiscordTeam): Team {
  const id = bot.transformers.snowflake(payload.id)

  const team = {
    name: payload.name,
    id,
    icon: payload.icon ? iconHashToBigInt(payload.icon) : undefined,
    ownerUserId: bot.transformers.snowflake(payload.owner_user_id),
    members: payload.members.map((member) => ({
      membershipState: member.membership_state,
      permissions: member.permissions,
      teamId: id,
      user: bot.transformers.user(bot, member.user),
    })),
  } as Team

  return bot.transformers.customizers.team(bot, payload, team)
}

export interface Team {
  icon?: bigint | undefined
  id: bigint
  name: string
  ownerUserId: bigint
  members: Array<{
    membershipState: TeamMembershipStates
    permissions: Array<'*'>
    teamId: bigint
    user: User
  }>
}
