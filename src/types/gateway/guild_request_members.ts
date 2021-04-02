import { SnakeCaseProps } from "../util.ts";

export interface GuildRequestMembers {
  /** Id of the guild to get members for */
  guildId: string;
  /** String that username starts with, or an empty string to return all members */
  query?: string;
  /** True when specifing query */
  limit?: number;
  /** Used to specify if we wnt the presences of the matched members */
  presences?: boolean;
  /** Used to specify which users you wish to fetch */
  userIds?: string | string[];
  /** Nonce to identify the Guild Members Chunk response */
  nonce?: string;
}

/** https://discord.com/developers/docs/topics/gateway#request-guild-members-guild-request-members-structure */
export type DiscordGuildRequestMembers = SnakeCaseProps<GuildRequestMembers>;
