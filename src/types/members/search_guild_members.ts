export interface SearchGuildMembers {
  /** Query string to match username(s) and nickname(s) against */
  query: string;
  /** Max number of members to return (1-1000). Default: 1 */
  limit?: number;
}

/** https://discord.com/developers/docs/resources/guild#search-guild-members-query-string-params */
export type DiscordSearchGuildMembers = SearchGuildMembers;
