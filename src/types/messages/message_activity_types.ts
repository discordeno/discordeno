/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-types */
export enum DiscordMessageActivityTypes {
  Join = 1,
  Spectate,
  Listen,
  JoinRequest,
}

export type MessageActivityTypes = DiscordMessageActivityTypes;
export const MessageActivityTypes = DiscordMessageActivityTypes;
