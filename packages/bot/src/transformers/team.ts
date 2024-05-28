import type { DiscordTeam, DiscordTeamMemberRole, TeamMembershipStates } from '@discordeno/types'
import { type Bot, type User, iconHashToBigInt } from '../index.js'

export function transformTeam(bot: Bot, payload: DiscordTeam): Team {
  const id = bot.transformers.snowflake(payload.id)

  const team = {
    name: payload.name,
    id,
    icon: payload.icon ? iconHashToBigInt(payload.icon) : undefined,
    ownerUserId: bot.transformers.snowflake(payload.owner_user_id),
    members: payload.members.map((member) => ({
      membershipState: member.membership_state,
      teamId: id,
      user: bot.transformers.user(bot, member.user),
      role: member.role,
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
    teamId: bigint
    user: User
    role: DiscordTeamMemberRole
  }>
}
