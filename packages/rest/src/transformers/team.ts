import { DiscordTeam, Optionalize } from '@discordeno/types'
import { iconHashToBigInt } from '@discordeno/utils'
import type { RestManager } from '../restManager.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformTeam (rest: RestManager, payload: DiscordTeam) {
  const id = rest.transformers.snowflake(payload.id)

  const team = {
    name: payload.name,

    id,
    icon: payload.icon ? iconHashToBigInt(payload.icon) : undefined,
    ownerUserId: rest.transformers.snowflake(payload.owner_user_id),
    members: payload.members.map((member) => ({
      membershipState: member.membership_state,
      permissions: member.permissions,
      teamId: id,
      user: rest.transformers.user(rest, member.user)
    }))
  }

  return team as Optionalize<typeof team>
}

export interface Team extends ReturnType<typeof transformTeam> {}
