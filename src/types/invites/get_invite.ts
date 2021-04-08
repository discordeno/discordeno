import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface GetInvite {
  /** Whether the invite should contain approximate member counts */
  withCounts?: boolean;
}

/** https://discord.com/developers/docs/resources/invite#get-invite */
export type DiscordGetInvite = SnakeCasedPropertiesDeep<GetInvite>;
