import { DiscordPresenceUpdate, PresenceStatus } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import { PresenceUpdate } from '../presence.js'

export const reverseStatusTypes = Object.freeze({
  0: 'online',
  1: 'dnd',
  2: 'idle',
  4: 'offline'
} as const)

export function transformPresenceToDiscordPresence (
  rest: RestManager,
  payload: PresenceUpdate
): DiscordPresenceUpdate {
  return {
    user: rest.transformers.reverse.user(rest, payload.user),
    guild_id: rest.transformers.reverse.snowflake(payload.guildId),
    // TODO: find better way
    status: (PresenceStatus[payload.status] ?? 'offline') as 'offline',
    activities: payload.activities.map((activity) =>
      rest.transformers.reverse.activity(rest, activity)
    ),
    client_status: {
      desktop: payload.desktop,
      mobile: payload.mobile,
      web: payload.web
    }
  }
}
