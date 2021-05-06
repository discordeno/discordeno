/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-flags */
export enum DiscordActivityFlags {
  Instance = 1 << 0,
  Join = 1 << 1,
  Spectate = 1 << 2,
  JoinRequest = 1 << 3,
  Sync = 1 << 4,
  Play = 1 << 5,
}

export type ActivityFlags = DiscordActivityFlags;
export const ActivityFlags = DiscordActivityFlags;
