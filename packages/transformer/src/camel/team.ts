import type { Camelize, DiscordTeam } from '@discordeno/types'
import { c1amelize1User } from './member.js'

export function c1amelize1Team (payload: DiscordTeam): Camelize<DiscordTeam> {
  return {
    icon: payload.icon,
    id: payload.id,
    members: payload.members.map((member) => ({
      membershipState: member.membership_state,
      permissions: member.permissions,
      teamId: payload.id,
      user: c1amelize1User(member.user)
    })),
    name: payload.name,
    ownerUserId: payload.owner_user_id
  }
}
