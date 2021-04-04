export interface IdentifyConnectionProperties {
  /** Operating system */
  $os: string;
  /** Library name */
  $browser: string;
  /** Library name */
  $device: string;
}

/** https://discord.com/developers/docs/topics/gateway#identify-identify-connection-properties */
export type DiscordIdentifyConnectionProperties = IdentifyConnectionProperties;
