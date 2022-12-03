import { DiscordTeam } from '@discordeno/types'
import { Client } from '../../client.js'
import { Team } from '../team.js'

export function transformTeamToDiscordTeam (
  client: Client,
  payload: Team
): DiscordTeam {
  const id = client.utils.bigintToSnowflake(payload.id)

  return {
    name: payload.name,

    id,
    icon: payload.icon ? client.utils.iconBigintToHash(payload.icon) : null,
    owner_user_id: client.utils.bigintToSnowflake(payload.ownerUserId),
    members: payload.members.map((member) => ({
      membership_state: member.membershipState,
      permissions: member.permissions,
      team_id: id,
      user: client.transformers.reverse.user(client, member.user)
    }))
  }
}
