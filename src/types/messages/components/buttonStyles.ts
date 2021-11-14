/** https://discord.com/developers/docs/interactions/message-components#buttons-button-styles */
export enum DiscordButtonStyles {
  /** A blurple button */
  Primary = 1,
  /** A grey button */
  Secondary,
  /** A green button */
  Success,
  /** A red button */
  Danger,
  /** A button that navigates to a URL */
  Link,
}

export type ButtonStyles = DiscordButtonStyles;
export const ButtonStyles = DiscordButtonStyles;
