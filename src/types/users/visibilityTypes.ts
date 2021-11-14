/** https://discord.com/developers/docs/resources/user#connection-object-visibility-types */
export enum DiscordVisibilityTypes {
  /** Invisible to everyone except the user themselves */
  None,
  /** Visible to everyone */
  Everyone,
}

export type VisibilityTypes = DiscordVisibilityTypes;
export const VisibilityTypes = DiscordVisibilityTypes;
