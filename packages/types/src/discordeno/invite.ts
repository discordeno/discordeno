/** Types for: https://docs.discord.com/developers/resources/invite */

import type { BigString } from '../shared.js';

/** https://docs.discord.com/developers/resources/invite#get-invite */
export interface GetInvite {
  /** Whether the invite should contain approximate member counts */
  withCounts?: boolean;
  /** the guild scheduled event to include with the invite */
  scheduledEventId?: BigString;
}

/** https://docs.discord.com/developers/resources/invite#bulk-add-target-users-json-params */
export interface BulkAddInviteTargetUsers {
  /** The IDs of users to add, max of 1000 users */
  userIds: BigString[];
}

/** https://docs.discord.com/developers/resources/invite#bulk-delete-target-users-json-params */
export interface BulkDeleteInviteTargetUsers {
  /** The IDs of users to remove, max of 1000 users */
  userIds: BigString[];
}
