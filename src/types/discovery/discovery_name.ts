export interface DiscoveryName {
  /** The name in English */
  default: string;
  /** The name in other languages */
  localizations?: Record<string, string>;
}

export type DiscordDiscoveryName = DiscoveryName;
