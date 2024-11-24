import type { DiscordTeam } from '@discordeno/types'
import { type InternalBot, type Team, iconHashToBigInt } from '../index.js'

export function transformTeam(bot: InternalBot, payload: DiscordTeam): Team {
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
