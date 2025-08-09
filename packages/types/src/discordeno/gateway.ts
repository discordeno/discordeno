/**
 * Types for:
 *  - https://discord.com/developers/docs/events/gateway
 *  - https://discord.com/developers/docs/events/gateway-events
 */

import type { BigString } from '../shared.js'

/** https://discord.com/developers/docs/events/gateway-events#request-guild-members */
export interface RequestGuildMembers {
  /** id of the guild to get members for */
  guildId: BigString
  /** String that username starts with, or an empty string to return all members */
  query?: string
  /** Maximum number of members to send matching the query; a limit of 0 can be used with an empty string query to return all members */
  limit: number
  /** Used to specify if we want the presences of the matched members */
  presences?: boolean
  /** Used to specify which users you wish to fetch */
  userIds?: BigString[]
  /** Nonce to identify the Guild Members Chunk response */
  nonce?: string
}
