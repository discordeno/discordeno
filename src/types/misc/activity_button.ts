export interface ActivityButton {
  /** The text shown on the button (1-32 characters) */
  label: string;
  /** The url opened when clicking the button (1-512 characters) */
  url: string;
}

// https://github.com/discord/discord-api-docs/pull/2219
// TODO: add documentation link
export type DiscordActivityButton = ActivityButton;
