export interface GuildUpdateChange {
  key: string;
  oldValue?: unknown;
  value?: unknown;
}

export interface FetchMembersOptions {
  /** Used to specify if you want the presences of the matched members. Default = false. */
  presences?: boolean;
  /** Only returns members whose username or nickname starts with this string. DO NOT INCLUDE discriminators. If a string is provided, the max amount of members that can be fetched is 100. Default = return all members. */
  query?: string;
  /** Used to specify which users to fetch specifically. */
  userIDs?: string[];
  /** Maximum number of members to return that match the query. Default = 0 which will return all members. */
  limit?: number;
}
