/** https://discord.com/developers/docs/resources/guild#list-guild-members */
export interface ListGuildMembers {
  /** Max number of members to return (1-1000). Default: 1 */
  limit?: number;
  /** The highest user id in the previous page. Default: 0 */
  after?: string;
}
