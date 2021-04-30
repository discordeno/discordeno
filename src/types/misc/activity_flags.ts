/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-flags */
export enum DiscordActivityFlags {
  INSTANCE = 1 << 0,
  JOIN = 1 << 1,
  SPECTATE = 1 << 2,
  JOIN_REQUEST = 1 << 3,
  SYNC = 1 << 4,
  PLAY = 1 << 5,
}

export type ActivityFlags = DiscordActivityFlags;
export const ActivityFlags = DiscordActivityFlags;
