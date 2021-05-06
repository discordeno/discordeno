/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-types */
export enum DiscordActivityTypes {
  Game,
  Streaming,
  Listening,
  Watching,
  Custom = 4,
  Competing,
}

export type ActivityTypes = DiscordActivityTypes;
export const ActivityTypes = DiscordActivityTypes;
