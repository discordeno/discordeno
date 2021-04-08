import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface GetGuildQuery {
  /** When true, will return approximate member and presence counts for the guild */
  withCounts?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#get-guild */
export type DiscordGetGuildQuery = SnakeCasedPropertiesDeep<GetGuildQuery>;
