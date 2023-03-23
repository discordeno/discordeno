import type { DiscordTeam } from '@discordeno/types'
import { Bot, iconBigintToHash } from '../../index.js'
import type { Team } from '../team.js'

export function transformTeamToDiscordTeam(bot: Bot, payload: Team): DiscordTeam {
  const id = bot.utils.bigintToSnowflake(payload.id)

  return {
    name: payload.name,

    id,
    icon: payload.icon ? iconBigintToHash(payload.icon) : null,
    owner_user_id: bot.utils.bigintToSnowflake(payload.ownerUserId),
    members: payload.members.map((member) => ({
      membership_state: member.membershipState,
      permissions: member.permissions,
      team_id: id,
      user: bot.transformers.reverse.user(bot, member.user),
    })),
  }
}
