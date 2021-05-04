/** https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags */
export enum DiscordSystemChannelFlags {
  /** Suppress member join notifications */
  SuppressJoinNotifications = 1 << 0,
  /** Suppress server boost notifications */
  SuppressPremiumSubscriptions = 1 << 1,
  /** Suppress server setup tips */
  SuppressGuildReminderNotifications = 1 << 2,
}

export type SystemChannelFlags = DiscordSystemChannelFlags;
export const SystemChannelFlags = DiscordSystemChannelFlags;
