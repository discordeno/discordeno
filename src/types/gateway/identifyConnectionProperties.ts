/** https://discord.com/developers/docs/topics/gateway#identify-identify-connection-properties */
export interface IdentifyConnectionProperties {
  /** Operating system */
  $os: string;
  /** Library name */
  $browser: string;
  /** Library name */
  $device: string;
}
