export interface GetReactions {
  /** Get users after this user Id */
  after?: string;
  /** Max number of users to return (1-100) */
  limit?: number;
}

/** https://discord.com/developers/docs/resources/channel#get-reactions-query-string-params */
export type DiscordGetReactions = GetReactions;
