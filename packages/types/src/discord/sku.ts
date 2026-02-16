/** Types for: https://docs.discord.com/developers/resources/sku */

/** https://docs.discord.com/developers/resources/sku#sku-object-sku-structure */
export interface DiscordSku {
  /** ID of SKU */
  id: string;
  /** Type of SKU */
  type: DiscordSkuType;
  /** ID of the parent application */
  application_id: string;
  /** Customer-facing name of your premium offering */
  name: string;
  /** System-generated URL slug based on the SKU's name */
  slug: string;
  /** SKU flags combined as a bitfield */
  flags: SkuFlags;
}

/** https://docs.discord.com/developers/resources/sku#sku-object-sku-types */
export enum DiscordSkuType {
  /** Durable one-time purchase */
  Durable = 2,
  /** Consumable one-time purchase */
  Consumable = 3,
  /** Represents a recurring subscription */
  Subscription = 5,
  /** System-generated group for each SUBSCRIPTION SKU created */
  SubscriptionGroup = 6,
}

/** https://docs.discord.com/developers/resources/sku#sku-object-sku-flags */
export enum SkuFlags {
  /** SKU is available for purchase */
  Available = 1 << 2,
  /** Recurring SKU that can be purchased by a user and applied to a single server. Grants access to every user in that server. */
  GuildSubscription = 1 << 7,
  /** Recurring SKU purchased by a user for themselves. Grants access to the purchasing user in every server. */
  UserSubscription = 1 << 8,
}
