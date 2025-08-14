/** Types for: https://discord.com/developers/docs/topics/permissions */

/** https://discord.com/developers/docs/topics/permissions#role-object-role-colors-object */
export interface GuildRoleColors {
  /** The primary color for the role */
  primaryColor: number
  /** The secondary color for the role, this will make the role a gradient between the other provided colors */
  secondaryColor?: number
  /** The tertiary color for the role, this will turn the gradient into a holographic style */
  tertiaryColor?: number
}
