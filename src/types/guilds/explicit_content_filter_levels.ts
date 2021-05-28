/** https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level */
export enum DiscordExplicitContentFilterLevels {
  /** Media content will not be scanned */
  Disabled,
  /** Media content sent by members without roles will be scanned */
  MembersWithoutRoles,
  /** Media content sent by all members will be scanned */
  AllMembers,
}

export type ExplicitContentFilterLevels = DiscordExplicitContentFilterLevels;
export const ExplicitContentFilterLevels = DiscordExplicitContentFilterLevels;
