/** Types for: https://docs.discord.com/developers/resources/entitlement */

import type { BigString } from '../shared.js';

/** https://docs.discord.com/developers/resources/entitlement#list-entitlements-query-string-params */
export interface GetEntitlements {
  /** User ID to look up entitlements for */
  userId?: BigString;
  /** Optional list of SKU IDs to check entitlements for */
  skuIds?: BigString[];
  /** Retrieve entitlements before this entitlement ID */
  before?: BigString;
  /** Retrieve entitlements after this entitlement ID */
  after?: BigString;
  /** Number of entitlements to return, 1-100, default 100 */
  limit?: number;
  /** Guild ID to look up entitlements for */
  guildId?: BigString;
  /** Whether or not ended entitlements should be omitted. Defaults to false, ended entitlements are included by default. */
  excludeEnded?: boolean;
  /** Whether or not deleted entitlements should be omitted. Defaults to true, deleted entitlements are not included by default. */
  excludeDeleted?: boolean;
}

/** https://docs.discord.com/developers/monetization/entitlements#create-test-entitlement-json-params */
export interface CreateTestEntitlement {
  /** ID of the SKU to grant the entitlement to */
  skuId: BigString;
  /** ID of the guild or user to grant the entitlement to */
  ownerId: BigString;
  /** The type of entitlement, guild subscription or user subscription */
  ownerType: CreateEntitlementOwnerType;
}

/** https://docs.discord.com/developers/monetization/entitlements#create-test-entitlement-json-params - Description of ownerType */
export enum CreateEntitlementOwnerType {
  /** Guild subscription */
  GuildSubscription = 1,
  /** User subscription */
  UserSubscription = 2,
}
