import { GuildMemberWithUser } from "../guilds/guild_member.ts";
import { PresenceUpdate } from "../misc/presence_update.ts";

/** https://discord.com/developers/docs/topics/gateway#guild-members-chunk */
export interface GuildMembersChunk {
  /** The id of the guild */
  guildId: string;
  /** Set of guild members */
  members: GuildMemberWithUser[];
  /** The chunk index in the expected chunks for this response (0 <= chunk_index < chunk_count) */
  chunkIndex: number;
  /** The total number of expected chunks for this response */
  chunkCount: number;
  /** If passing an invalid id to `REQUEST_GUILD_MEMBERS`, it will be returned here */
  notFound?: string[];
  /** If passing true to `REQUEST_GUILD_MEMBERS`, presences of the returned members will be here */
  presences?: PresenceUpdate[];
  /** The nonce used in the Guild Members Request */
  nonce?: string;
}
