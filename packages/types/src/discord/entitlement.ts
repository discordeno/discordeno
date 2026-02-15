/** Types for: https://docs.discord.com/developers/resources/entitlement */

/** https://docs.discord.com/developers/resources/entitlement#entitlement-object-entitlement-structure */
export interface DiscordEntitlement {
  /** ID of the entitlement */
  id: string;
  /** ID of the SKU */
  sku_id: string;
  /** ID of the parent application */
  application_id: string;
  /** ID of the user that is granted access to the entitlement's sku */
  user_id?: string;
  /** Type of entitlement */
  type: DiscordEntitlementType;
  /** Entitlement was deleted */
  deleted: boolean;
  /** Start date at which the entitlement is valid. */
  starts_at: string | null;
  /** Date at which the entitlement is no longer valid. */
  ends_at: string | null;
  /** ID of the guild that is granted access to the entitlement's sku */
  guild_id?: string;
  /** For consumable items, whether or not the entitlement has been consumed */
  consumed?: boolean;
}

/** https://docs.discord.com/developers/resources/entitlement#entitlement-object-entitlement-types */
export enum DiscordEntitlementType {
  /** Entitlement was purchased by user */
  Purchase = 1,
  /** Entitlement for Discord Nitro subscription */
  PremiumSubscription = 2,
  /** Entitlement was gifted by developer */
  DeveloperGift = 3,
  /** Entitlement was purchased by a dev in application test mode */
  TestModePurchase = 4,
  /** Entitlement was granted when the SKU was free */
  FreePurchase = 5,
  /** Entitlement was gifted by another user */
  UserGift = 6,
  /** Entitlement was claimed by user for free as a Nitro Subscriber */
  PremiumPurchase = 7,
  /** Entitlement was purchased as an app subscription */
  ApplicationSubscription = 8,
}
