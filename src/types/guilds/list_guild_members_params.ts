import { SnakeCaseProps } from "../util.ts";

export interface ListGuildMembersParams {
  /** Max number of members to return (1-1000), default 1 */
  limit: number;
  /** The highest user id in the previous page, default 0 */
  after: string;
}

/** https://discord.com/developers/docs/resources/guild#list-guild-members */
export type DiscordListGuildMembersParams = SnakeCaseProps<
  ListGuildMembersParams
>;
