import { SnakeCaseProps } from "../util.ts";

export interface GetGuildQuery {
  /** When true, will return approximate member and presence counts for the guild */
  withCounts?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#get-guild */
export type DiscordGetGuild = SnakeCaseProps<GetGuild>;
