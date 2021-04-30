/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-types */
export enum DiscordMessageActivityTypes {
  JOIN = 1,
  SPECTATE,
  LISTEN,
  JOIN_REQUEST,
}

export type MessageActivityTypes = DiscordMessageActivityTypes;
export const MessageActivityTypes = DiscordMessageActivityTypes;
