import type { DiscordTeam } from '@discordeno/types'
import { iconHashToBigInt, type Bot } from '../index.js'
import type { Optionalize } from '../optionalize.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformTeam(bot: Bot, payload: DiscordTeam) {
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
  }

  return bot.transformers.customizers.team(bot, payload, team as Team) as Optionalize<typeof team>
}

export interface Team extends ReturnType<typeof transformTeam> {}
