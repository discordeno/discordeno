export interface DiscordVoiceRegion {
  /** unique ID for the region */
  id: string;
  /** name of the region */
  name: string;
  /** true if this is a vip-only server */
  vip: boolean;
  /** true for a single server that is closet to the current user's client */
  optimal: boolean;
  /** whether this is a deprecated voice region (avoid switching to these) */
  deprecated: boolean;
  /** whether this is a custom voice region (used for events/etc) */
  custom: boolean;
}
