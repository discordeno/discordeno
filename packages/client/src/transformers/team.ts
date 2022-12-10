import type { DiscordTeam, Optionalize } from '@discordeno/types'
import type { Client } from '../client.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformTeam (client: Client, payload: DiscordTeam) {
  const id = client.transformers.snowflake(payload.id)

  const team = {
    name: payload.name,

    id,
    icon: payload.icon
      ? client.utils.iconHashToBigInt(payload.icon)
      : undefined,
    ownerUserId: client.transformers.snowflake(payload.owner_user_id),
    members: payload.members.map((member) => ({
      membershipState: member.membership_state,
      permissions: member.permissions,
      teamId: id,
      user: client.transformers.user(client, member.user)
    }))
  }

  return team as Optionalize<typeof team>
}

export interface Team extends ReturnType<typeof transformTeam> {}
