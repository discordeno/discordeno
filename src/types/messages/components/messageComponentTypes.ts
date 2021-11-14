/** https://discord.com/developers/docs/interactions/message-components#component-types */
export enum DiscordMessageComponentTypes {
  /** A row of components at the bottom of a message */
  ActionRow = 1,
  /** A button! */
  Button,
  /** A select menu. */
  SelectMenu,
}

export type MessageComponentTypes = DiscordMessageComponentTypes;
export const MessageComponentTypes = DiscordMessageComponentTypes;
