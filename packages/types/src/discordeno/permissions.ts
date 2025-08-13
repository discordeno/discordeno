/** Types for: https://discord.com/developers/docs/topics/permissions */

/** https://discord.com/developers/docs/topics/permissions#role-object-role-colors-object */
export interface GuildRoleColors {
  /** The primary color for the role */
  primaryColor: number
  /** The secondary color for the role, this will make the role a gradient between the other provided colors */
  secondaryColor?: number
  /**
   * The tertiary color for the role, this will turn the gradient into a holographic style
   *
   * @remarks
   * When sending tertiaryColor, the API enforces the role color to be a holographic style with values of: primaryColor = 11127295, secondaryColor = 16759788, and tertiaryColor = 16761760
   */
  tertiaryColor?: number
}
