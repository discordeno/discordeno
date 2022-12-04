import { DiscordTeam } from '@discordeno/types'
import { bigintToSnowflake, iconBigintToHash } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import { Team } from '../team.js'

export function transformTeamToDiscordTeam (
  rest: RestManager,
  payload: Team
): DiscordTeam {
  const id = bigintToSnowflake(payload.id)

  return {
    name: payload.name,

    id,
    icon: payload.icon ? iconBigintToHash(payload.icon) : null,
    owner_user_id: bigintToSnowflake(payload.ownerUserId),
    members: payload.members.map((member) => ({
      membership_state: member.membershipState,
      permissions: member.permissions,
      team_id: id,
      user: rest.transformers.reverse.user(rest, member.user)
    }))
  }
}
