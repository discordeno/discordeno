export interface VoiceRegion {
  /** Unique ID for the region */
  id: string;
  /** Name of the region */
  name: string;
  /** True if this is a vip-only server */
  vip: boolean;
  /** True for a single server that is closest to the current user's client */
  optimal: boolean;
  /** Whether this is a deprecated voice region (avoid swithing to these) */
  deprecated: boolean;
  /** Whether this is a custom voice region (used for events/etc) */
  custom: boolean;
}

/** https://discord.com/developers/docs/resources/voice#voice-region-object-voice-region-structure */
export type DiscordVoiceRegion = VoiceRegion;
