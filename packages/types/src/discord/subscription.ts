/** Types for: https://docs.discord.com/developers/resources/subscription */

/** https://docs.discord.com/developers/resources/subscription#subscription-object */
export interface DiscordSubscription {
  /** ID of the subscription */
  id: string;
  /** ID of the user who is subscribed */
  user_id: string;
  /** List of SKUs subscribed to */
  sku_ids: string[];
  /** List of entitlements granted for this subscription */
  entitlement_ids: string[];
  /** List of SKUs that this user will be subscribed to at renewal */
  renewal_sku_ids: string[] | null;
  /** Start of the current subscription period */
  current_period_start: string;
  /** End of the current subscription period */
  current_period_end: string;
  /** Current status of the subscription */
  status: DiscordSubscriptionStatus;
  /** When the subscription was canceled */
  canceled_at: string | null;
  /** ISO3166-1 alpha-2 country code of the payment source used to purchase the subscription. Missing unless queried with a private OAuth scope. */
  country?: string;
}

/** https://docs.discord.com/developers/resources/subscription#subscription-statuses */
export enum DiscordSubscriptionStatus {
  /** Subscription is active and scheduled to renew. */
  Active,
  /** Subscription is active but will not renew. */
  Ending,
  /** Subscription is inactive and not being charged. */
  Inactive,
}
