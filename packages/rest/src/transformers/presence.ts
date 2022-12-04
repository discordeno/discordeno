import {
  DiscordPresenceUpdate,
  Optionalize,
  PresenceStatus
} from '@discordeno/types'
import { iconHashToBigInt } from '@discordeno/utils'
import type { RestManager } from '../restManager.js'
import { UserToggles } from './toggles/user.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformPresence (
  rest: RestManager,
  payload: DiscordPresenceUpdate
) {
  const presence = {
    user: {
      id: rest.transformers.snowflake(payload.user.id || ''),
      username: payload.user.username ?? undefined,
      discriminator: payload.user.discriminator ?? undefined,
      avatar: payload.user.avatar
        ? iconHashToBigInt(payload.user.avatar)
        : undefined,
      locale: payload.user.locale ?? undefined,
      email: payload.user.email ?? undefined,
      flags: payload.user.flags ?? undefined,
      premiumType: payload.user.premium_type ?? undefined,
      publicFlags: payload.user.public_flags ?? undefined,
      toggles: new UserToggles(payload.user)
    },
    guildId: rest.transformers.snowflake(payload.guild_id),
    status: PresenceStatus[payload.status],
    activities: payload.activities.map((activity) =>
      rest.transformers.activity(rest, activity)
    ),
    desktop: payload.client_status.desktop,
    mobile: payload.client_status.mobile,
    web: payload.client_status.web
  }

  return presence as Optionalize<typeof presence>
}

export interface PresenceUpdate extends ReturnType<typeof transformPresence> {}
