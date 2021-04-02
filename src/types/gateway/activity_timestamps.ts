export interface ActivityTimestamps {
  /** Unix time (in milliseconds) of when the activity started */
  start?: number;
  /** Unix time (in milliseconds) of when the activity ends */
  end?: number;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-timestamps */
export type DiscordactivityTimestamps = ActivityTimestamps;
