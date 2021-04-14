/** https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level */
export enum DiscordExplicitContentFilterLevels {
  /** Media content will not be scanned */
  DISABLED,
  /** Media content sent by members without roles will be scanned */
  MEMBERS_WITHOUT_ROLES,
  /** Media content sent by all members will be scanned */
  ALL_MEMBERS,
}
