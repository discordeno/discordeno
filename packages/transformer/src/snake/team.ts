import type { Camelize, DiscordTeam } from '@discordeno/types'
import { s1nakelize1User } from './member.js'

export function s1nakelize1Team (payload: Camelize<DiscordTeam>): DiscordTeam {
  return {
    id: payload.id,
    icon: payload.icon,
    name: payload.name,

    owner_user_id: payload.ownerUserId,

    members: payload.members.map((member) => ({
      team_id: payload.id,
      permissions: member.permissions,

      membership_state: member.membershipState,

      user: s1nakelize1User(member.user)
    }))
  }
}
