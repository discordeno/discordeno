/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types */
export enum DiscordAllowedMentionsTypes {
  /** Controls role mentions */
  RoleMentions = "roles",
  /** Controls user mentions */
  UserMentions = "users",
  /** Controls @everyone and @here mentions */
  EveryoneMentions = "everyone",
}

export type AllowedMentionsTypes = DiscordAllowedMentionsTypes;
export const AllowedMentionsTypes = DiscordAllowedMentionsTypes;
