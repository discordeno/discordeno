import type { DiscordTeam } from '@discordeno/types'
import { iconBigintToHash, type Bot } from '../../index.js'
import type { Team } from '../team.js'

export function transformTeamToDiscordTeam(bot: Bot, payload: Team): DiscordTeam {
  const id = payload.id.toString()

  return {
    name: payload.name,

    id,
    icon: payload.icon ? iconBigintToHash(payload.icon) : null,
    owner_user_id: payload.ownerUserId.toString(),
    members: payload.members.map((member) => ({
      membership_state: member.membershipState,
      team_id: id,
      user: bot.transformers.reverse.user(bot, member.user),
      role: member.role,
    })),
  }
}
