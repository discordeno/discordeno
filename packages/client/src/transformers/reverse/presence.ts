import { DiscordPresenceUpdate, PresenceStatus } from '@discordeno/types'
import { Client } from '../../client.js'
import { PresenceUpdate } from '../presence.js'

export const reverseStatusTypes = Object.freeze({
  0: 'online',
  1: 'dnd',
  2: 'idle',
  4: 'offline'
} as const)

export function transformPresenceToDiscordPresence (
  client: Client,
  payload: PresenceUpdate
): DiscordPresenceUpdate {
  return {
    user: client.transformers.reverse.user(client, payload.user),
    guild_id: client.transformers.reverse.snowflake(payload.guildId),
    // TODO: find better way
    status: (PresenceStatus[payload.status] ?? 'offline') as 'offline',
    activities: payload.activities.map((activity) =>
      client.transformers.reverse.activity(client, activity)
    ),
    client_status: {
      desktop: payload.desktop,
      mobile: payload.mobile,
      web: payload.web
    }
  }
}
