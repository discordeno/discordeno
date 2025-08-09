/** Types for: https://discord.com/developers/docs/resources/subscription */

import type { BigString } from '../shared.js'

/** https://discord.com/developers/docs/resources/subscription#query-string-params */
export interface ListSkuSubscriptionsOptions {
  /** List subscriptions before this ID */
  before?: BigString
  /** List subscriptions after this ID */
  after?: BigString
  /** Number of results to return (1-100) */
  limit?: number
  /** User ID for which to return subscriptions. Required except for OAuth queries. */
  userId?: BigString
}
