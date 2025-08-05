/** Types for: https://discord.com/developers/docs/resources/invite */

import type { BigString } from '../shared.js'

/** https://discord.com/developers/docs/resources/invite#get-invite */
export interface GetInvite {
  /** Whether the invite should contain approximate member counts */
  withCounts?: boolean
  /** Whether the invite should contain the expiration date */
  withExpiration?: boolean
  /** the guild scheduled event to include with the invite */
  scheduledEventId?: BigString
}
